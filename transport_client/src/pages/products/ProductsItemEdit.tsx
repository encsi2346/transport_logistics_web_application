import {Box, Grid, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import BackgroundCard from "../../components/layout/BackgroundCard";
import DataCard from "../../components/layout/DataCard";
import Headline from "../../components/text/Headline";
import NormalText from "../../components/text/NormalText";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import TextFieldInput from "../../components/inputField/TextFieldInput";
import {ProductEditFormSchema, productEditFormSchema} from "./schemas/product-edit-form-schema";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const ProductsItemEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    const { t } = useTypeSafeTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<ProductEditFormSchema>({
        defaultValues: {
            productCategoryName: '',
            productName: '',
            productNumber: '',
            barcode: '',
            ownWeight: '',
            maxNumberOfItems: '',
            currentNumberOfItems: '',
        },
        resolver: zodResolver(productEditFormSchema(isEditing)),
        mode: 'all',
    });

    const onSubmit = handleSubmit((data) => {
        let submitData = data as any;

        if (isEditing) {
            setInputDisabled(true);
            updateProductItem(id, submitData);
        } else {
            setInputDisabled(true);
            createProductItem(submitData);
        }
    }, (errors) => {console.log(errors)});

    const getProductItem = async (id: string) => {
        try {
            const getProductItemResponse = await fetch(
                `http://localhost:3001/api/products/${id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getProductItemData = await getProductItemResponse.json();
            const getStatus = getProductItemResponse.status;
            console.log('getProductItemData', getProductItemData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
        } catch (error) {
            console.error('Error get product:', error);
        }
    }

    const createProductItem = async (data: any) => {
        try {
            const createProductItemResponse = await fetch(
                `http://localhost:3001/api/products/addProduct`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getProductItemData = await createProductItemResponse.json();
            const getStatus = createProductItemResponse.status;
            console.log('getProductItemData', getProductItemData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
            return getProductItemData;
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const updateProductItemType = async (id: string, data: any) => {
        try {
            const updatedProductItemResponse = await fetch(
                `http://localhost:3001/api/products/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getProductItemData = await updatedProductItemResponse.json();
            const getStatus = updatedProductItemResponse.status;
            console.log('getProductItemData', getProductItemData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
            return getProductItemData;
        } catch (error) {
            console.error(`Error updating product with ID ${id}:`, error);
        }
    };

    const deleteProductItem = async (id: string) => {
        //TODO
        try {
            const deleteProductItemResponse = await fetch(
                `http://localhost:3001/api/products/${id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getProductItemData = await deleteProductItemResponse.json();
            const getStatus = deleteProductItemResponse.status;
            console.log('getProductItemData', getProductItemData);
            console.log('getUserStatus', getStatus);
            //setCartTypes(getCarTypesData);
            return getProductItemData;
        } catch (error) {
            console.error(`Error deleting product with ID ${id}:`, error);
        }
    };

    return (
        <Box>
            <PageHeader text={t('PRODUCTS.NEW_PRODUCT')}/>
            <BackgroundCard>
                <DataCard>
                    <Headline text={t('PRODUCTS.PRODUCT_DATA')} />
                    <Grid container spacing={12}>
                        {/* First Column */}
                        <Grid item xs={12} md={4}>
                            <Grid container direction="column" spacing={3}>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('PRODUCTS.PRODUCT_CATEGORY_NAME')} />
                                        <TextFieldInput
                                            placeholder={t('PRODUCTS.PRODUCT_CATEGORY_NAME')}
                                            control={control}
                                            name='productCategoryName'
                                            type='text'
                                            data-testid='product-category-name-input'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('PRODUCTS.PRODUCT_NAME')} />
                                        <TextFieldInput
                                            placeholder={t('PRODUCTS.PRODUCT_NAME')}
                                            control={control}
                                            name='productName'
                                            type='text'
                                            data-testid='product-name-input'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('PRODUCTS.PRODUCT_NUMBER')} />
                                        <TextFieldInput
                                            placeholder={t('PRODUCTS.PRODUCT_NUMBER')}
                                            control={control}
                                            name='productNumber'
                                            type='number'
                                            data-testid='product-number-input'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('PRODUCTS.BARCODE')} />
                                        <TextFieldInput
                                            placeholder={t('PRODUCTS.BARCODE')}
                                            control={control}
                                            name='barcode'
                                            type='number'
                                            data-testid='barcode-input'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Second Column */}
                        <Grid item xs={12} md={4}>
                            <Grid container direction="column" spacing={3}>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('PRODUCTS.OWN_WEIGHT')} />
                                        <TextFieldInput
                                            placeholder={t('PRODUCTS.OWN_WEIGHT')}
                                            control={control}
                                            name='ownWeight'
                                            type='number'
                                            data-testid='own-weight-input'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('PRODUCTS.MAX_NUMBER_OF_ITEMS')} />
                                        <TextFieldInput
                                            placeholder={t('PRODUCTS.MAX_NUMBER_OF_ITEMS')}
                                            control={control}
                                            name='maxNumberOfItems'
                                            type='number'
                                            data-testid='max-number-of-items-input'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('PRODUCTS.CURRENT_NUMBER_OF_ITEMS')} />
                                        <TextFieldInput
                                            placeholder={t('PRODUCTS.CURRENT_NUMBER_OF_ITEMS')}
                                            control={control}
                                            name='currentNumberOfItems'
                                            type='number'
                                            data-testid='current-number-of-items-input'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DataCard>

                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <CancelButton text={t('TEXT.CANCEL')} onClick={() => navigate(-1)}/>
                    <SaveButton text={t('TEXT.SAVE')} onClick={onSubmit} />
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default ProductsItemEdit;