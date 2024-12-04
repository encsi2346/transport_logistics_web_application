import BackgroundCard from "../../components/layout/BackgroundCard";
import DataCard from "../../components/layout/DataCard";
import Headline from "../../components/text/Headline";
import {Box, FormControl, Grid, TextField} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import TextFieldInput from "../../components/inputField/TextFieldInput";
//import DatePickerInput from "../../components/inputField/DatePickerInput";
import {TransportationSteps} from "./enums/transportation-steps";
import {useTransportationStore} from "./stores/useTransportationStore";
import useTransportationDetails from "./hooks/useTransportationDetails";
import DatePicker from "react-datepicker";
import React, {useState} from "react";
import moment from "moment";

interface Props {
    setCurrentStep: (step: number) => void;
}


const TransportationDetails = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const thisStep = TransportationSteps.DETAILS;
    const currentStep = useTransportationStore((state) => state.currentStep);
    const isStepDone = currentStep > thisStep;
    const isActiveStep = thisStep === currentStep;
    const [values, setValues] = useState({
        selectedTypeOfTransportationId: '',
        selectedCarTypeId: '',
        selectedCarId: '',
    });

    //const setCurrentStep = useTransportationStore((state) => state.setCurrentStep);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const { control, isValid, preValidationError, onSubmit} = useTransportationDetails();

    const handleCancelClicked = () => {
        setCurrentStep(0);
        navigate(-1);
    };

    const handleNextClicked  = () => {
        onSubmit(); // Calls the `onSubmit` from the hook
        setCurrentStep(2); // Move to the next step
    };

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
        console.log('values', values);
    };


    const handleDateChange = (prop: any) => (date: any) => {
        const value = date ? moment(date).toISOString() : null;
        setValues({ ...values, [prop]: value as string });
    };

    return (
        <form autoComplete='off' noValidate onSubmit={(e) => e.preventDefault()}>
            {isActiveStep && (
                <Box>
                    <BackgroundCard>
                        <DataCard>
                            <Headline text={t('TRANSPORTATIONS.DEPARTURE_DATA')} />
                            <Grid item container direction="column" spacing={2}>
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.COUNTRY')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="country"
                                                    placeholder={t('TRANSPORTATIONS.COUNTRY')}
                                                    name='country'
                                                    label={t('TRANSPORTATIONS.COUNTRY')}
                                                    value={values.country}
                                                    onChange={handleChange('country')}
                                                    data-testid='country-input'
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
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.POSTCODE')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="postcode"
                                                    placeholder={t('TRANSPORTATIONS.POSTCODE')}
                                                    name='postcode'
                                                    label={t('TRANSPORTATIONS.POSTCODE')}
                                                    value={values.postcode}
                                                    onChange={handleChange('postcode')}
                                                    data-testid='postcode-input'
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
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.CITY')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="city"
                                                    placeholder={t('TRANSPORTATIONS.CITY')}
                                                    name='city'
                                                    label={t('TRANSPORTATIONS.CITY')}
                                                    value={values.city}
                                                    onChange={handleChange('city')}
                                                    data-testid='city-input'
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
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="nameOfPublicArea"
                                                    placeholder={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}
                                                    name='nameOfPublicArea'
                                                    label={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}
                                                    value={values.nameOfPublicArea}
                                                    onChange={handleChange('nameOfPublicArea')}
                                                    data-testid='name-of-public-area-input'
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
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="typeOfPublicArea"
                                                    placeholder={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}
                                                    name='typeOfPublicArea'
                                                    label={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}
                                                    value={values.typeOfPublicArea}
                                                    onChange={handleChange('typeOfPublicArea')}
                                                    data-testid='type-of-public-area-input'
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
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.HOUSE_NUMBER')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="houseNumber"
                                                    placeholder={t('TRANSPORTATIONS.HOUSE_NUMBER')}
                                                    name='houseNumber'
                                                    label={t('TRANSPORTATIONS.HOUSE_NUMBER')}
                                                    value={values.houseNumber}
                                                    onChange={handleChange('houseNumber')}
                                                    data-testid='house-number-input'
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
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.START_DATE')} required={false}/>
                                            <FormControl required>
                                                <DatePicker
                                                    name='startDate'
                                                    data-testid='start-date-input'
                                                    //disabled={inputDisabled}
                                                    value={values.startDate}
                                                    onChange={handleDateChange('startDate')}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.START_TIME')} required={false}/>
                                            <FormControl required>
                                                <DatePicker
                                                    name='startTime'
                                                    data-testid='start-time-input'
                                                    //disabled={inputDisabled}
                                                    value={values.startTime}
                                                    onChange={handleDateChange('startTime')}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DataCard>

                        <DataCard>
                            <Headline text={t('TRANSPORTATIONS.ARRIVAL_DATA')} />
                            <Grid item container direction="column" spacing={2}>
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.COUNTRY')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="arrivalCountry"
                                                    placeholder={t('TRANSPORTATIONS.COUNTRY')}
                                                    name='arrivalCountry'
                                                    label={t('TRANSPORTATIONS.COUNTRY')}
                                                    value={values.arrivalCountry}
                                                    onChange={handleChange('arrivalCountry')}
                                                    data-testid='country-input'
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
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.POSTCODE')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="arrivalPostcode"
                                                    placeholder={t('TRANSPORTATIONS.POSTCODE')}
                                                    name='arrivalPostcode'
                                                    label={t('TRANSPORTATIONS.POSTCODE')}
                                                    value={values.arrivalPostcode}
                                                    onChange={handleChange('arrivalPostcode')}
                                                    data-testid='postcode-input'
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
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.CITY')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="city"
                                                    placeholder={t('TRANSPORTATIONS.CITY')}
                                                    name='city'
                                                    label={t('TRANSPORTATIONS.CITY')}
                                                    value={values.city}
                                                    onChange={handleChange('city')}
                                                    data-testid='city-input'
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
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="arrivalNameOfPublicArea"
                                                    placeholder={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}
                                                    name='arrivalNameOfPublicArea'
                                                    label={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}
                                                    value={values.arrivalNameOfPublicArea}
                                                    onChange={handleChange('arrivalNameOfPublicArea')}
                                                    data-testid='name-of-public-area-input'
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
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="arrivalTypeOfPublicArea"
                                                    placeholder={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}
                                                    name='arrivalTypeOfPublicArea'
                                                    label={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}
                                                    value={values.arrivalTypeOfPublicArea}
                                                    onChange={handleChange('arrivalTypeOfPublicArea')}
                                                    data-testid='type-of-public-area-input'
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
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.HOUSE_NUMBER')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="arrivalHouseNumber"
                                                    placeholder={t('TRANSPORTATIONS.HOUSE_NUMBER')}
                                                    name='arrivalHouseNumber'
                                                    label={t('TRANSPORTATIONS.HOUSE_NUMBER')}
                                                    value={values.arrivalHouseNumber}
                                                    onChange={handleChange('arrivalHouseNumber')}
                                                    data-testid='house-number-input'
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
                                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.END_DATE')} required={false}/>
                                            <FormControl required>
                                                <DatePicker
                                                    name='endDate'
                                                    data-testid='end-date-input'
                                                    //disabled={inputDisabled}
                                                    value={values.endDate}
                                                    onChange={handleDateChange('endDate')}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('TRANSPORTATIONS.END_TIME')} required={false}/>
                                            <FormControl required>
                                                <DatePicker
                                                    name='endTime'
                                                    data-testid='end-time-input'
                                                    //disabled={inputDisabled}
                                                    value={values.endTime}
                                                    onChange={handleDateChange('endTime')}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DataCard>

                        <DataCard>
                            <Headline text={t('TRANSPORTATIONS.ADD_LOADING_POINT')} />
                        </DataCard>

                        {!isStepDone && (
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                <CancelButton text={t('TEXT.BACK')} disabled={!isActiveStep} onClick={handleCancelClicked}/>
                                <SaveButton text={t('TEXT.NEXT')}  /*disabled={!isValid || !isActiveStep}*/ onClick={handleNextClicked}/>
                            </Box>
                        )}

                    </BackgroundCard>
                </Box>
            )}
        </form>
    );
};

export default TransportationDetails;