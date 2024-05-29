import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import DataCard from "../../components/layout/DataCard.tsx";
import Headline from "../../components/text/Headline.tsx";
import {Box, Grid, IconButton, InputAdornment} from "@mui/material";
import NormalText from "../../components/text/NormalText.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useNavigate} from "react-router-dom";
import SelectInput from "../../components/inputField/SelectInput.tsx";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import TextFieldInput from "../../components/inputField/TextFieldInput.tsx";
import DatePickerInput from "../../components/inputField/DatePickerInput.tsx";
import {TransportationSteps} from "./enums/transportation-steps.ts";
import {useTransportationStore} from "./stores/useTransportationStore.tsx";
import useTransportationOverview from "./hooks/useTransportationOverview.tsx";

const TransportationOverview = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const thisStep = TransportationSteps.OVERVIEW;
    const currentStep = useTransportationStore((state) => state.currentStep);
    const isStepDone = currentStep > thisStep;
    const isActiveStep = thisStep === currentStep;

    const setCurrentStep = useTransportationStore((state) => state.setCurrentStep);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const { control, isValid, preValidationError, onSubmit} = useTransportationOverview();

    const handleCancelClicked = () => {
        navigate('..');
    };

    return (
        <form autoComplete='off' noValidate onSubmit={(e) => e.preventDefault()}>
            {isActiveStep && (
                <Box>
                    <BackgroundCard>
                        <Grid item container direction="column" spacing={2}>
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.SELECTED_CAR_TYPE')} />
                                        <SelectInput
                                            placeholder={t('TEXT.SELECTED_CAR_TYPE')}
                                            control={control}
                                            name='selectedCarType'
                                            data-testid='selected-car-type-input'
                                            disabled={!isActiveStep}
                                            //options={enumToOptions(userRoles)} //TODO
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton onClick={() => setValue('selectedCarType', undefined)} edge="end" >
                                                            <ClearRoundedIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                                sx: {
                                                    '.MuiSelect-icon': {
                                                        display: 'none',
                                                    },
                                                },
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <DataCard>
                            <Headline text={t('TEXT.CAR_TYPE_DATA')} />
                            <Grid item container direction="column" spacing={2}>
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.CAR_FUNCTIONAL_DESIGN')} />
                                            <SelectInput
                                                placeholder={t('TEXT.CAR_FUNCTIONAL_DESIGN')}
                                                control={control}
                                                name='carFunctionalDesign'
                                                data-testid='car-functional-design-input'
                                                disabled={!isActiveStep}
                                                //options={enumToOptions(userRoles)} //TODO
                                                required
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton onClick={() => setValue('carFunctionalDesign', undefined)} edge="end" >
                                                                <ClearRoundedIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    sx: {
                                                        '.MuiSelect-icon': {
                                                            display: 'none',
                                                        },
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.PERFORMANCE')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.PERFORMANCE')}
                                                control={control}
                                                name='performance'
                                                type='number'
                                                data-testid='performance-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.OWN_WEIGHT')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.OWN_WEIGHT')}
                                                control={control}
                                                name='ownWeight'
                                                type='number'
                                                data-testid='own-weight-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.NUMBER_OF_SEATS')} />
                                            <SelectInput
                                                placeholder={t('TEXT.NUMBER_OF_SEATS')}
                                                control={control}
                                                name='numberOfSeats'
                                                data-testid='number-of-seats-input'
                                                disabled={!isActiveStep}
                                                //options={enumToOptions(userRoles)} //TODO
                                                required
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton onClick={() => setValue('numberOfSeats', undefined)} edge="end" >
                                                                <ClearRoundedIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    sx: {
                                                        '.MuiSelect-icon': {
                                                            display: 'none',
                                                        },
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.FUEL')} />
                                            <SelectInput
                                                placeholder={t('TEXT.FUEL')}
                                                control={control}
                                                name='fuel'
                                                data-testid='fuel-input'
                                                disabled={!isActiveStep}
                                                //options={enumToOptions(userRoles)} //TODO
                                                required
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton onClick={() => setValue('fuel', undefined)} edge="end" >
                                                                <ClearRoundedIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    sx: {
                                                        '.MuiSelect-icon': {
                                                            display: 'none',
                                                        },
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.USEFUL_WEIGHT')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.USEFUL_WEIGHT')}
                                                control={control}
                                                name='usefulWeight'
                                                type='number'
                                                data-testid='useful-weight-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DataCard>

                        <Grid item container direction="column" spacing={2}>
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.SELECTED_CAR')} />
                                        <SelectInput
                                            placeholder={t('TEXT.SELECTED_CAR')}
                                            control={control}
                                            name='selectedCar'
                                            data-testid='selected-car-input'
                                            disabled={!isActiveStep}
                                            //options={enumToOptions(userRoles)} //TODO
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton onClick={() => setValue('selectedCar', undefined)} edge="end" >
                                                            <ClearRoundedIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                                sx: {
                                                    '.MuiSelect-icon': {
                                                        display: 'none',
                                                    },
                                                },
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <DataCard>
                            <Headline text={t('TEXT.UNIQUE_DATA')} />
                            <Grid item container direction="column" spacing={2}>
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.LICENCE_PLATE')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.LICENCE_PLATE')}
                                                control={control}
                                                name='licencePlate'
                                                type='text'
                                                data-testid='licence-plate-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.REGISTRATION_CERTIFICATION_NUMBER')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.REGISTRATION_CERTIFICATION_NUMBER')}
                                                control={control}
                                                name='registrationCertificationNumber'
                                                type='text'
                                                data-testid='registration-certification-number-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.CHASSIS_NUMBER')} />
                                            <TextFieldInput
                                                placeholder={t('TEXT.CHASSIS_NUMBER')}
                                                control={control}
                                                name='chassisNumber'
                                                type='text'
                                                data-testid='chassis-number-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.YEAR_OF_PRODUCTION')} />
                                            <DatePickerInput
                                                placeholder={t('TEXT.YEAR_OF_PRODUCTION')}
                                                control={control}
                                                name='yearOfProduction'
                                                data-testid='year-of-production-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('TEXT.DATE_OF_FIRST_REGISTRATION')} />
                                            <DatePickerInput
                                                placeholder={t('TEXT.DATE_OF_FIRST_REGISTRATION')}
                                                control={control}
                                                name='dateOfFirstRegistration'
                                                data-testid='date-of-registration-input'
                                                disabled={!isActiveStep}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DataCard>

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
                                            <NormalText text={t('TEXT.HOUSE_NUMBER')}/>
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

                        {!isStepDone && (
                            <Box sx={{ display: 'inline', paddingLeft: 130}}>
                                <CancelButton text={t('TEXT.BACK')} disabled={!isActiveStep} onClick={handleCancelClicked}/>
                                <SaveButton text={t('TEXT.SAVE')}  disabled={!isValid || !isActiveStep} onClick={onSubmit}/>
                            </Box>
                        )}
                    </BackgroundCard>
                </Box>
            )}
        </form>
    );
};

export default TransportationOverview;