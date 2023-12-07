import {Box, Grid, Typography} from "@mui/material";
import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useNavigate} from "react-router-dom";
import {TransportationSteps} from "./enums/transportation-steps.ts";
import {useTransportationStore} from "./stores/useTransportationStore.tsx";
import useTransportationShipment from "./hooks/useTransportationShipment.tsx";
import SelectInput from "../../components/inputField/SelectInput.tsx";
import {useState} from "react";


const TransportationShipment = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const [productCategories, setProductCategories] = useState([
        {
            label: `${t('TEXT.CATEGORY1')}`,
            value: 1
        },
        {
            label: `${t('TEXT.CATEGORY2')}`,
            value: 2
        },
        {
            label: `${t('TEXT.CATEGORY3')}`,
            value: 2
        }
    ]);
    const [users, setUsers]=useState([
        {
            id: 1,
            productName: 'alma',
            categoryName: 'Category1'
        },
        {
            id: 2,
            productName: 'körte',
            categoryName: 'Category3'
        },
        {
            id: 3,
            productName: 'barack',
            categoryName: 'Category2'
        },
        {
            id: 4,
            productName: 'szilva',
            categoryName: 'Category1'
        },
    ])
    const thisStep = TransportationSteps.SHIPMENT;
    const currentStep = useTransportationStore((state) => state.currentStep);
    const isStepDone = currentStep > thisStep;
    const isActiveStep = thisStep === currentStep;

    const setCurrentStep = useTransportationStore((state) => state.setCurrentStep);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const { control, isValid, preValidationError, onSubmit} = useTransportationShipment();

    return (
        <form autoComplete='off' noValidate onSubmit={(e) => e.preventDefault()}>
            {!isActiveStep && (
                <Box>
                    <Grid item container direction="row">
                        <Grid item xs={4} md={3}>
                            <Box sx={{ width: 300, height: 500}}>
                                <BackgroundCard>
                                    <SelectInput
                                        label={t('TEXT.PRODUCT_CATEGORY')}
                                        control={control}
                                        name='productCategory'
                                        data-testid='product-category-input'
                                        options={productCategories}
                                        required
                                        InputProps={{
                                            sx: {
                                                '.MuiSelect-icon': {
                                                    display: 'none',
                                                },
                                            },
                                        }}
                                    />
                                </BackgroundCard>
                                <Grid item container direction="column" sx={{ marginTop: -53, marginLeft: 7}}>
                                    <Grid item xs={4} md={3}>
                                        <Box sx={{ width: 190, height: 60, borderRadius: '17px', backgroundColor: '#c8c8c8'}}>
                                            <Box sx={{ width: 15, height: 15, backgroundColor: '#07ea00', borderRadius: '30px', marginLeft: 2}}/>
                                            <Typography sx={{ marginLeft: 7, marginTop: 0}}>Termék1</Typography>
                                            <Typography sx={{ marginLeft: 7, marginTop: 0, fontSize: 9}}>1200/836</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={9}>
                            <Box sx={{ width: 1140, height: 500, marginLeft: -7, display: 'grid'}}>
                                <BackgroundCard>
                                    <Grid item container direction="row" sx={{ marginTop: 5, marginLeft: 15}}>
                                        <Grid item xs={4} md={3} sx={{ marginRight: -8}}>
                                            <Box sx={{ width: 200, height: 350, backgroundColor: '#9e9e9e'}}>
                                                <Grid item container direction="column">
                                                    <Grid item xs={4} md={3}>
                                                        <Box sx={{ width: 170, height: 80, borderRadius: '17px', backgroundColor: '#4d4d4d', marginTop: 5, marginBottom: 1, marginLeft: 2}}>

                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={4} md={3}>
                                                        <Box sx={{ width: 170, height: 80, borderRadius: '17px', backgroundColor: '#4d4d4d', marginTop: 1, marginBottom: 1, marginLeft: 2}}>

                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={4} md={3}>
                                                        <Box sx={{ width: 170, height: 80, borderRadius: '17px', backgroundColor: '#4d4d4d', marginTop: 1, marginBottom: 1, marginLeft: 2}}>

                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4} md={6}>
                                            <Box sx={{ width: 600, height: 350, backgroundColor: '#9e9e9e', borderColor: '#ff0000', borderStyle: 'dashed', borderWidth: 3}}>
                                                <Grid item container direction="row">
                                                    <Grid item xs={4} md={3}>
                                                        <Box sx={{ width: 170, height: 120, borderRadius: '4px', backgroundColor: '#4d4d4d', marginTop: 5, marginBottom: 1, marginLeft: 2, display: 'flex'}}>
                                                            <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                            <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={4} md={3}>
                                                        <Box sx={{ width: 170, height: 120, borderRadius: '4px', backgroundColor: '#4d4d4d', marginTop: 5, marginBottom: 1, marginLeft: 6, display: 'flex'}}>
                                                            <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                            <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={4} md={3}>
                                                        <Box sx={{ width: 170, height: 120, borderRadius: '4px', backgroundColor: '#4d4d4d', marginTop: 5, marginBottom: 1, marginLeft: 10, display: 'flex'}}>
                                                            <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                            <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                                <Grid item container direction="row">
                                                    <Grid item xs={4} md={3}>
                                                        <Box sx={{ width: 170, height: 120, borderRadius: '4px', backgroundColor: '#4d4d4d', marginTop: 2, marginBottom: 1, marginLeft: 2, display: 'flex'}}>
                                                            <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                            <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={4} md={3}>
                                                        <Box sx={{ width: 170, height: 120, borderRadius: '4px', backgroundColor: '#4d4d4d', marginTop: 2, marginBottom: 1, marginLeft: 6, display: 'flex'}}>
                                                            <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                            <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={4} md={3}>
                                                        <Box sx={{ width: 170, height: 120, borderRadius: '4px', backgroundColor: '#4d4d4d', marginTop: 2, marginBottom: 1, marginLeft: 10, display: 'flex'}}>
                                                            <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                            <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    {!isStepDone && (
                                        <Box sx={{ display: 'block', paddingLeft: 95, marginTop: 3, marginBottom: -3}}>
                                            <CancelButton text={t('TEXT.BACK')} disabled={!isActiveStep} onClick={() => navigate(-1)}/>
                                            <SaveButton text={t('TEXT.NEXT')}  disabled={!isValid || !isActiveStep} onClick={onSubmit}/>
                                        </Box>
                                    )}
                                </BackgroundCard>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            )};
        </form>
    );
};

export default TransportationShipment;