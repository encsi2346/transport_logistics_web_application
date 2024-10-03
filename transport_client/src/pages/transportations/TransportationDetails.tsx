import BackgroundCard from "../../components/layout/BackgroundCard";
import DataCard from "../../components/layout/DataCard";
import Headline from "../../components/text/Headline";
import {Box, Grid} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import TextFieldInput from "../../components/inputField/TextFieldInput";
import DatePickerInput from "../../components/inputField/DatePickerInput";
import {TransportationSteps} from "./enums/transportation-steps";
import {useTransportationStore} from "./stores/useTransportationStore";
import useTransportationDetails from "./hooks/useTransportationDetails";

const TransportationDetails = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const thisStep = TransportationSteps.DETAILS;
    const currentStep = useTransportationStore((state) => state.currentStep);
    const isStepDone = currentStep > thisStep;
    const isActiveStep = thisStep === currentStep;

    const setCurrentStep = useTransportationStore((state) => state.setCurrentStep);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const { control, isValid, preValidationError, onSubmit} = useTransportationDetails();

    const handleCancelClicked = () => {
        navigate('..');
    };

    return (
        <form autoComplete='off' noValidate onSubmit={(e) => e.preventDefault()}>
            {isActiveStep && (
                <Box>
                    <BackgroundCard>
                        <DataCard>
                            <Headline text={t('TEXT.DEPARTURE_DATA')} />
                            <Grid item container direction="column" spacing={2}>
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.COUNTRY')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.COUNTRY')}
                                                control={control}
                                                name='country'
                                                type='text'
                                                data-testid='country-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.POSTCODE')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.POSTCODE')}
                                                control={control}
                                                name='postcode'
                                                type='number'
                                                data-testid='postcode-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.CITY')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.CITY')}
                                                control={control}
                                                name='city'
                                                type='text'
                                                data-testid='city-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.NAME_OF_PUBLIC_AREA')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.NAME_OF_PUBLIC_AREA')}
                                                control={control}
                                                name='nameOfPublicArea'
                                                type='text'
                                                data-testid='name-of-public-area-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.TYPE_OF_PUBLIC_AREA')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.TYPE_OF_PUBLIC_AREA')}
                                                control={control}
                                                name='typeOfPublicArea'
                                                type='text'
                                                data-testid='type-of-public-area-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.HOUSE_NUMBER')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.HOUSE_NUMBER')}
                                                control={control}
                                                name='houseNumber'
                                                type='number'
                                                data-testid='house-number-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.START_DATE')} />
                                            <DatePickerInput
                                                placeholder={t('TEXT.START_DATE')}
                                                control={control}
                                                name='startDate'
                                                data-testid='start-date-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.START_TIME')} />
                                            <DatePickerInput
                                                placeholder={t('TEXT.START_TIME')}
                                                control={control}
                                                name='startTime'
                                                data-testid='start-time-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DataCard>

                        <DataCard>
                            <Headline text={t('TEXT.ARRIVAL_DATA')} />
                            <Grid item container direction="column" spacing={2}>
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.COUNTRY')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.COUNTRY')}
                                                control={control}
                                                name='arrivalCountry'
                                                type='text'
                                                data-testid='country-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.POSTCODE')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.POSTCODE')}
                                                control={control}
                                                name='arrivalPostcode'
                                                type='number'
                                                data-testid='postcode-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.CITY')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.CITY')}
                                                control={control}
                                                name='arrivalCity'
                                                type='text'
                                                data-testid='city-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.NAME_OF_PUBLIC_AREA')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.NAME_OF_PUBLIC_AREA')}
                                                control={control}
                                                name='arrivalNameOfPublicArea'
                                                type='text'
                                                data-testid='name-of-public-area-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.TYPE_OF_PUBLIC_AREA')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.TYPE_OF_PUBLIC_AREA')}
                                                control={control}
                                                name='arrivalTypeOfPublicArea'
                                                type='text'
                                                data-testid='type-of-public-area-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.HOUSE_NUMBER')}/>
                                            <TextFieldInput
                                                placeholder={t('TEXT.HOUSE_NUMBER')}
                                                control={control}
                                                name='arrivalHouseNumber'
                                                type='number'
                                                data-testid='house-number-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.END_DATE')} />
                                            <DatePickerInput
                                                placeholder={t('TEXT.END_DATE')}
                                                control={control}
                                                name='endDate'
                                                data-testid='end-date-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.END_TIME')} />
                                            <DatePickerInput
                                                placeholder={t('TEXT.END_TIME')}
                                                control={control}
                                                name='endTime'
                                                data-testid='end-Time-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DataCard>

                        <DataCard>
                            <Headline text={t('TEXT.ADD_LOADING_POINT')} />
                        </DataCard>

                        {!isStepDone && (
                            <Box sx={{ display: 'inline', paddingLeft: 130}}>
                                <CancelButton text={t('TEXT.BACK')} disabled={!isActiveStep} onClick={handleCancelClicked}/>
                                <SaveButton text={t('TEXT.NEXT')}  disabled={!isValid || !isActiveStep} onClick={onSubmit}/>
                            </Box>
                        )}

                    </BackgroundCard>
                </Box>
            )}
        </form>
    );
};

export default TransportationDetails;