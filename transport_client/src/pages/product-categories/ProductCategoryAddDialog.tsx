import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid,
} from '@mui/material';
import type {SxProps, Theme} from '@mui/material';
import type { GridSelectionModel } from '@mui/x-data-grid';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate, useParams} from "react-router-dom";
import BackgroundCard from "../../components/layout/BackgroundCard";
import { useTypeSafeTranslation } from '../../components/inputfield/hooks/useTypeSafeTranslation';
import TextFieldInput from '../../components/inputfield/TextFieldInput';
import {
    productCategoryEditFormSchema,
    ProductCategoryEditFormSchema
} from "./schemas/product-category-edit-form-schema";
import DataCard from "@/components/layout/DataCard";
import {useEffect, useState} from "react";

const titleStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '20px',
    color: '#000000',
    marginTop: '60px',
    marginBottom: '30px',
    marginLeft: '10px',
    marginRight: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const saveTitleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: '#DD1C13',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

const cancelTitleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#DD1C13',
    backgroundColor: 'rgba(41, 0, 92, 0.12)',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

const ProductCategoryAddDialog = NiceModal.create(
    (props: { title: string; acceptText: string; defaultSelected: GridSelectionModel; handleEmployeeAdded: () => void }) => {
        const modal = useModal();
        const { t } = useTypeSafeTranslation();
        const { id } = useParams();
        const navigate = useNavigate();
        const [productStatusList, setProductStatusList] = useState([]);

        const {
            control,
            reset,
            handleSubmit,
            formState: { isValid },
        } = useForm<ProductCategoryEditFormSchema>({
            defaultValues: {
                productCategoryId: '',
                name: '',
                description: '',
                status: '',
            },
            resolver: zodResolver(productCategoryEditFormSchema()),
            mode: 'all',
        });

        const handleProductStatusList = async () => {
            const getResponse = await fetch(
                "http://localhost:3001/api/productStatus",
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getProductStatusList = await getResponse.json();
            //const getStatus = getResponse.status;
            console.log('ProductStatus', getProductStatusList);

            const formattedProductStatusList = getProductStatusList.map(productStatus => ({
                value: productStatus,
                label: productStatus.charAt(0).toUpperCase() + productStatus.slice(1)
            }));
            console.log('formattedProductStatusList', formattedProductStatusList);
            setProductStatusList(formattedProductStatusList);
        }

        useEffect(() => {
            handleProductStatusList();
        }, [])

        const onSubmit = handleSubmit((data) => {
            let submitData = data as any;
        });

        const getProductCategory = async (id: string) => {
            try {
                const getProductCategoryResponse = await fetch(
                    `http://localhost:3001/api/product-categories/${id}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json"},
                    }
                );
                const getProductCategoryData = await getProductCategoryResponse.json();
                const getStatus = getProductCategoryResponse.status;
                console.log('getProductCategoryData', getProductCategoryData);
                console.log('getUserStatus', getStatus);
                //setCar(getCarData);
            } catch (error) {
                console.error('Error get product category:', error);
            }
        }

        const createProductCategory = async (data: any) => {
            try {
                const createProductCategoryResponse = await fetch(
                    `http://localhost:3001/api/product-categories/addProductCategory`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify(data),
                    }
                );
                const getProductCategoryData = await createProductCategoryResponse.json();
                const getStatus = createProductCategoryResponse.status;
                console.log('getProductCategoryData', getProductCategoryData);
                console.log('getUserStatus', getStatus);
                //setCar(getCarData);
                return getProductCategoryData;
            } catch (error) {
                console.error('Error creating product category:', error);
            }
        };

        const updateProductCategory = async (id: string, data: any) => {
            try {
                const updatedProductCategoryResponse = await fetch(
                    `http://localhost:3001/api/product-categories/${id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify(data),
                    }
                );
                const getProductCategoryData = await updatedProductCategoryResponse.json();
                const getStatus = updatedProductCategoryResponse.status;
                console.log('getProductCategoryData', getProductCategoryData);
                console.log('getUserStatus', getStatus);
                //setCar(getCarData);
                return getProductCategoryData;
            } catch (error) {
                console.error(`Error updating product category with ID ${id}:`, error);
            }
        };

        const deleteProductCategory = async (id: string) => {
            //TODO
            try {
                const deleteProductCategoryResponse = await fetch(
                    `http://localhost:3001/api/product-categories/${id}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json"},
                    }
                );
                const getProductCategoryData = await deleteProductCategoryResponse.json();
                const getStatus = deleteProductCategoryResponse.status;
                console.log('getProductCategoryData', getProductCategoryData);
                console.log('getUserStatus', getStatus);
                //setCartTypes(getCarTypesData);
                return getProductCategoryData;
            } catch (error) {
                console.error(`Error deleting product category with ID ${id}:`, error);
            }
        };

        return (
            <Dialog
                {...muiDialogV5(modal)}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",
                            borderRadius: '19px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                    },
                }}
            >
                <DialogTitle id="confirm-dialog-title" sx={titleStyle}>
                    {props.title}
                </DialogTitle>

                <DialogContent>
                    <Box>
                        <BackgroundCard>
                            <DataCard>
                                <Grid item container direction="column" spacing={2}>
                                    <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                        <Grid item xs={4} md={5}>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                                <TextFieldInput
                                                    label={t('PRODUCT_CATEGORIES.PRODUCT_CATEGORY_NAME')}
                                                    control={control}
                                                    name='productCategoryName'
                                                    type='text'
                                                    data-testid='product-category-name-input'
                                                    required
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                        <Grid item xs={4} md={5}>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                                <TextFieldInput
                                                    label={t('PRODUCT_CATEGORIES.PRODUCT_CATEGORY_DESCRIPTION')}
                                                    control={control}
                                                    name='productDescription'
                                                    type='text'
                                                    data-testid='product-description-input'
                                                    required
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </DataCard>
                        </BackgroundCard>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        color="error"
                        onClick={() => {
                            modal.reject();
                            modal.remove();
                        }}
                        data-testid="cancel-button"
                        sx={cancelTitleStyle}
                    >
                        {t('TEXT.CANCEL')}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            onSubmit();
                            modal.remove();
                        }}
                        data-testid="confirm-button"
                        sx={saveTitleStyle}
                    >
                        {props.acceptText}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
);

export default ProductCategoryAddDialog;
