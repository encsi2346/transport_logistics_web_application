import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Grid,
    IconButton,
    InputAdornment, InputLabel, Select, TextField
} from '@mui/material';
import type {SxProps, Theme} from '@mui/material';
import type { GridSelectionModel } from '@mui/x-data-grid';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate, useParams} from "react-router-dom";
import BackgroundCard from "../../components/layout/BackgroundCard";
import { useTypeSafeTranslation } from '../../components/inputField/hooks/useTypeSafeTranslation';
import TextFieldInput from '../../components/inputField/TextFieldInput';
//import DatePickerInput from "../../components/inputField/DatePickerInput";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SelectInput from "../../components/inputField/SelectInput";
import {RequestEditFormSchema, requestEditFormSchema} from "./schemas/request-edit-form-schema";
import DataCard from "@/components/layout/DataCard";
import NormalText from "../../components/text/NormalText";
import React, {useEffect, useState} from "react";
import ClearIcon from "@mui/icons-material/Clear";

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

const NewProductItemAddDialog = NiceModal.create(
    (props: { title: string; acceptText: string; defaultSelected: GridSelectionModel; handleEmployeeAdded: () => void }) => {
        const modal = useModal();
        const { t } = useTypeSafeTranslation();
        const { id } = useParams();
        const navigate = useNavigate();
        const [inputDisabled, setInputDisabled] = useState(false); //isInputDisabled
        const [isEditing, setIsEditing] = useState(true);
        const [productStatusList, setProductStatusList] = useState([]);
        const [values, setValues] = useState({
            productId: '',
            name: '',
            description: '',
            category: '',
            articleNumber: '',
            barcode: '',
            selfWeight: '',
            maxNumberOfItems: '',
            currentNumberOfItems: '',
            szazalek: '',
            status: '',
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

        const updateProductItem = async (id: string, data: any) => {
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


        const handleSubmit = async (e: any) => {
            e.preventDefault();

            let submitData = data as any;
            console.log('isEditing', isEditing);
            console.log('submitData', submitData);
            if (isEditing) {
                setInputDisabled(true);
                updateProductItem(id, submitData);
            } else {
                setInputDisabled(true);
                createProductItem(submitData);
            }
        };

        const handleChange = (prop: any) => (event: any) => {
            setValues({...values, [prop]: event.target.value });
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
                            maxWidth: "1200px",
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
                            <form
                                autoComplete='off'
                                onSubmit={(e) => handleSubmit(e)}
                            >
                                <DataCard>
                                    <Grid item container direction="column" spacing={2} ml={5} mr={5}>
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('PRODUCTS.NAME')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="name"
                                                            placeholder='Példa Éva'
                                                            name='name'
                                                            label={t('PRODUCTS.NAME')}
                                                            value={values.name}
                                                            onChange={handleChange('name')}
                                                            data-testid='name-input'
                                                            required
                                                            sx={{
                                                                backgroundColor: `#ffffff`,
                                                                borderRadius: '18px',
                                                                color: `#000000`,
                                                                textDecoration: 'none',
                                                                height: 40,
                                                                width: 250,
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                fontSize: "15px",
                                                                "& fieldset": {border: 'none'},
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('PRODUCTS.DESCRIPTION')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="description"
                                                            placeholder='Példa Éva'
                                                            name='description'
                                                            label={t('PRODUCTS.DESCRIPTION')}
                                                            value={values.description}
                                                            onChange={handleChange('description')}
                                                            data-testid='description-input'
                                                            required
                                                            sx={{
                                                                backgroundColor: `#ffffff`,
                                                                borderRadius: '18px',
                                                                color: `#000000`,
                                                                textDecoration: 'none',
                                                                height: 40,
                                                                width: 250,
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                fontSize: "15px",
                                                                "& fieldset": {border: 'none'},
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('PRODUCTS.CATEGORY')} required={true}/>
                                                    <FormControl>
                                                        <InputLabel>{t('PRODUCTS.CATEGORY')}</InputLabel>
                                                        <Select
                                                            id="category"
                                                            placeholder={t('PRODUCTS.CATEGORY')}
                                                            name='category'
                                                            label={t('PRODUCTS.CATEGORY')}
                                                            data-testid='category'
                                                            disabled={inputDisabled}
                                                            required
                                                            value={values.category ?? ''}
                                                            onChange={handleChange('category')}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <ClearIcon
                                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                                            onClick={() => setValues({...values, category: '' })}
                                                                        />
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                            sx={{
                                                                backgroundColor: `#ffffff`,
                                                                borderRadius: '8px',
                                                                color: `#000000`,
                                                                textDecoration: 'none',
                                                                height: 40,
                                                                width: 250,
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                fontSize: "15px",
                                                                "& fieldset": {border: 'none'},
                                                            }}
                                                        >
                                                            {/*Object.values(genderList).map((gender) => (
                                                                    <MenuItem key={gender.value} value={gender.value}>
                                                                        {gender.label}
                                                                    </MenuItem>
                                                                ))*/}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('PRODUCTS.ARTICLE_NUMBER')} required={true}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="articleNumber"
                                                            placeholder='Példa Éva'
                                                            name='articleNumber'
                                                            label={t('PRODUCTS.ARTICLE_NUMBER')}
                                                            value={values.articleNumber}
                                                            onChange={handleChange('articleNumber')}
                                                            data-testid='article-number-input'
                                                            required
                                                            sx={{
                                                                backgroundColor: `#ffffff`,
                                                                borderRadius: '18px',
                                                                color: `#000000`,
                                                                textDecoration: 'none',
                                                                height: 40,
                                                                width: 250,
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                fontSize: "15px",
                                                                "& fieldset": {border: 'none'},
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('PRODUCTS.BARCODE')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="barcode"
                                                            placeholder='Példa Éva'
                                                            name='barcode'
                                                            label={t('PRODUCTS.BARCODE')}
                                                            value={values.barcode}
                                                            onChange={handleChange('barcode')}
                                                            data-testid='barcode-input'
                                                            required
                                                            sx={{
                                                                backgroundColor: `#ffffff`,
                                                                borderRadius: '18px',
                                                                color: `#000000`,
                                                                textDecoration: 'none',
                                                                height: 40,
                                                                width: 250,
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                fontSize: "15px",
                                                                "& fieldset": {border: 'none'},
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('PRODUCTS.SELF_WEIGHT')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="selfWeight"
                                                            placeholder='Példa Éva'
                                                            name='selfWeight'
                                                            label={t('PRODUCTS.SELF_WEIGHT')}
                                                            value={values.selfWeight}
                                                            onChange={handleChange('selfWeight')}
                                                            data-testid='self-weight-input'
                                                            required
                                                            sx={{
                                                                backgroundColor: `#ffffff`,
                                                                borderRadius: '18px',
                                                                color: `#000000`,
                                                                textDecoration: 'none',
                                                                height: 40,
                                                                width: 250,
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                fontSize: "15px",
                                                                "& fieldset": {border: 'none'},
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('PRODUCTS.CURRENT_NUMBER_OF_ITEMS')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="currentNumberOfItems"
                                                            placeholder='Példa Éva'
                                                            name='currentNumberOfItems'
                                                            label={t('PRODUCTS.CURRENT_NUMBER_OF_ITEMS')}
                                                            value={values.currentNumberOfItems}
                                                            onChange={handleChange('currentNumberOfItems')}
                                                            data-testid='current-number-of-items-input'
                                                            required
                                                            sx={{
                                                                backgroundColor: `#ffffff`,
                                                                borderRadius: '18px',
                                                                color: `#000000`,
                                                                textDecoration: 'none',
                                                                height: 40,
                                                                width: 250,
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                fontSize: "15px",
                                                                "& fieldset": {border: 'none'},
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('PRODUCTS.SZAZALEK')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="szazalek"
                                                            placeholder='Példa Éva'
                                                            name='szazalek'
                                                            label={t('PRODUCTS.SZAZALEK')}
                                                            value={values.szazalek}
                                                            onChange={handleChange('szazalek')}
                                                            data-testid='szazalek-input'
                                                            required
                                                            sx={{
                                                                backgroundColor: `#ffffff`,
                                                                borderRadius: '18px',
                                                                color: `#000000`,
                                                                textDecoration: 'none',
                                                                height: 40,
                                                                width: 250,
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                fontSize: "15px",
                                                                "& fieldset": {border: 'none'},
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('PRODUCTS.STATUS')} required={true}/>
                                                    <FormControl>
                                                        <InputLabel>{t('PRODUCTS.STATUS')}</InputLabel>
                                                        <Select
                                                            id="status"
                                                            placeholder={t('PRODUCTS.STATUS')}
                                                            name='status'
                                                            label={t('PRODUCTS.STATUS')}
                                                            data-testid='status'
                                                            disabled={inputDisabled}
                                                            required
                                                            value={values.status ?? ''}
                                                            onChange={handleChange('status')}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <ClearIcon
                                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                                            onClick={() => setValues({...values, status: '' })}
                                                                        />
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                            sx={{
                                                                backgroundColor: `#ffffff`,
                                                                borderRadius: '8px',
                                                                color: `#000000`,
                                                                textDecoration: 'none',
                                                                height: 40,
                                                                width: 250,
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                fontSize: "15px",
                                                                "& fieldset": {border: 'none'},
                                                            }}
                                                        >
                                                            {/*Object.values(genderList).map((gender) => (
                                                                    <MenuItem key={gender.value} value={gender.value}>
                                                                        {gender.label}
                                                                    </MenuItem>
                                                                ))*/}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </DataCard>
                            </form>
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
                            //onSubmit();
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

export default NewProductItemAddDialog;
