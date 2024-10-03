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

    const createProductItem = (data) => {
        //TODO
        navigate(`/users/${parseInt(data, 10)}`);
    };

    const updateProductItem = (id, data) => {
        //TODO
    };

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

    return (
        <Box>
            <PageHeader text={t('PRODUCTS.NEW_PRODUCT')}/>
            <BackgroundCard>
                <DataCard>
                    <Headline text={t('TEXT.PRODUCT_DATA')} />
                    <Grid item container direction="column" spacing={2}>
                        <Grid item container direction="row" xs={4} md={8} spacing={6}>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.PRODUCT_CATEGORY_NAME')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.PRODUCT_CATEGORY_NAME')}
                                        control={control}
                                        name='productCategoryName'
                                        type='text'
                                        data-testid='product-category-name-input'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.PRODUCT_NAME')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.PRODUCT_NAME')}
                                        control={control}
                                        name='productName'
                                        type='text'
                                        data-testid='product-name-input'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={4} md={8} spacing={6}>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.PRODUCT_NUMBER')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.PRODUCT_NUMBER')}
                                        control={control}
                                        name='productNumber'
                                        type='number'
                                        data-testid='product-number-input'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.BARCODE')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.BARCODE')}
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
                        <Grid item container direction="row" xs={4} md={8} spacing={6}>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.OWN_WEIGHT')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.OWN_WEIGHT')}
                                        control={control}
                                        name='ownWeight'
                                        type='number'
                                        data-testid='own-weight-input'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.MAX_NUMBER_OF_ITEMS')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.MAX_NUMBER_OF_ITEMS')}
                                        control={control}
                                        name='maxNumberOfItems'
                                        type='number'
                                        data-testid='max-number-of-items-input'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={4} md={8} spacing={6}>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.CURRENT_NUMBER_OF_ITEMS')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.CURRENT_NUMBER_OF_ITEMS')}
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
                </DataCard>

                <Box sx={{ display: 'inline', paddingLeft: 130}}>
                    <CancelButton text={t('TEXT.CANCEL')} onClick={() => navigate(-1)} />
                    <SaveButton text={t('TEXT.SAVE')} onClick={onSubmit} />
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default ProductsItemEdit;