import BackgroundCard from "../../components/layout/BackgroundCard";
import {
    Box,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import DataCard from "../../components/layout/DataCard";
import Headline from "../../components/text/Headline";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SelectInput from "../../components/inputField/SelectInput";
import TextFieldInput from "../../components/inputField/TextFieldInput";
//import DatePickerInput from "../../components/inputField/DatePickerInput";
import {TransportationSteps} from "./enums/transportation-steps";
import {useTransportationStore} from "./stores/useTransportationStore";
import useTransportationCar from "./hooks/useTransportationCar";
import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import moment from "moment/moment";

interface Props {
    setCurrentStep: (step: number) => void;
}


const TransportationCarSelector = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const thisStep = TransportationSteps.CAR;
    const currentStep = useTransportationStore((state) => state.currentStep);
    const isStepDone = currentStep > thisStep;
    const isActiveStep = thisStep === currentStep;
    const [typeOfTransportationList, setTypeOfTransportationList] = useState([]);
    const [carTypes, setCartTypes] = useState([]);
    const [values, setValues] = useState({
        selectedTypeOfTransportationId: '',
        selectedCarTypeId: '',
        selectedCarId: '',
    });

    //const setCurrentStep = useTransportationStore((state) => state.setCurrentStep);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const { control, isValid, preValidationError, onSubmit} = useTransportationCar();

    const handleCancelClicked = () => {
        setCurrentStep(0);
        navigate(-1);
    };

    const handleNextClicked  = () => {
        console.log("Before submit, currentStep:", currentStep);
        onSubmit(); // Calls the `onSubmit` from the hook
        setCurrentStep(1); // Move to the next step
        console.log("Next step triggered, currentStep:", currentStep);
    };

    useEffect(() => {
        console.log('currentStep-car', currentStep);
    }, [currentStep]);

    useEffect(() => {
        console.log('isActiveStep', isActiveStep);
    }, [isActiveStep]);

    const handleLoadTypeOfTransportation = async () => {
        const getResponse = await fetch(
            `http://localhost:3001/api/type-of-transportation`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getTypeOfTransportationData = await getResponse.json();
        const getStatus = getResponse.status;
        console.log('getTypeOfTransportationData', getTypeOfTransportationData);
        console.log('getUserStatus', getStatus);
        setTypeOfTransportationList(getTypeOfTransportationData);
    }

    useEffect(() => {
        handleLoadTypeOfTransportation();
    }, []);

    const handleLoadCarTypes = async () => {
        const getResponse = await fetch(
            `http://localhost:3001/api/type-of-transportation/${values.selectedTypeOfTransportationId}/car-types`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getCarTypesData = await getResponse.json();
        const getStatus = getResponse.status;
        console.log('getCarTypesData', getCarTypesData);
        console.log('getUserStatus', getStatus);
        setCartTypes(getCarTypesData);
    }

    useEffect(() => {
        handleLoadCarTypes();
    }, [values.selectedTypeOfTransportationId]);

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
        console.log('values', values);
    };

    const handleDateChange = (prop: any) => (date: any) => {
        const value = date ? moment(date).toISOString() : null;
        setValues({ ...values, [prop]: value as string });
    };

    return (
        <form autoComplete='off' noValidate onSubmit={(e) => {
            console.log('Form submission attempted');
            e.preventDefault(); // Check if this prevents the event from propagating.
        }}>
            {isActiveStep && (
                <Box>
                    <BackgroundCard>
                        <Grid item container direction="column" spacing={2}>
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <NormalText text={t('TRANSPORTATIONS.SELECTED_TRANSPORTATION_TYPE')}/>
                                        <FormControl>
                                            <InputLabel>{t('TRANSPORTATIONS.SELECTED_TRANSPORTATION_TYPE')}</InputLabel>
                                            <Select
                                                id="selectedTypeOfTransportationId"
                                                placeholder={t('TRANSPORTATIONS.SELECTED_TRANSPORTATION_TYPE')}
                                                label={t('TRANSPORTATIONS.SELECTED_TRANSPORTATION_TYPE')}
                                                name='selectedTypeOfTransportationId'
                                                data-testid='selected-type-of-transportation-id-input'
                                                value={values.selectedTypeOfTransportationId ?? ''}
                                                onChange={handleChange('selectedTypeOfTransportationId')}
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
                                            >
                                                {Object.values(typeOfTransportationList).map((type) => (
                                                    <MenuItem key={type._id} value={type._id}>
                                                        {type.type}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <NormalText text={t('TRANSPORTATIONS.SELECTED_CAR_TYPE')}/>
                                        <FormControl>
                                            <InputLabel>{t('TRANSPORTATIONS.SELECTED_CAR_TYPE')}</InputLabel>
                                            <Select
                                                id="selectedCarTypeId"
                                                placeholder={t('TRANSPORTATIONS.SELECTED_CAR_TYPE')}
                                                label={t('TRANSPORTATIONS.SELECTED_CAR_TYPE')}
                                                name='selectedCarTypeId'
                                                data-testid='selected-car-type-id-input'
                                                value={values.selectedCarTypeId ?? ''}
                                                onChange={handleChange('selectedCarTypeId')}
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
                                            >
                                                {Object.values(carTypes).map((type) => (
                                                    <MenuItem key={type._id} value={type._id}>
                                                        {type.brand} + {type.typeName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <DataCard>
                            <Headline text={t('TRANSPORTATIONS.CAR_TYPE_DATA')} />
                            <Grid container direction="row" spacing={2}>
                                    <Grid item container direction="column" spacing={2} xs={4}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('CAR_TYPES.DESIGN')}/>
                                                <FormControl>
                                                    <InputLabel>{t('CAR_TYPES.DESIGN')}</InputLabel>
                                                    <Select
                                                        id="design"
                                                        placeholder={t('CAR_TYPES.DESIGN')}
                                                        label={t('CAR_TYPES.DESIGN')}
                                                        name='design'
                                                        data-testid='design-input'
                                                        value={values.design ?? ''}
                                                        onChange={handleChange('design')}
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
                                                    >
                                                        {Object.values(carTypes).map((type) => (
                                                            <MenuItem key={type._id} value={type._id}>
                                                                {type.brand} + {type.typeName}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        <Grid item >
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('CAR_TYPES.PERFORMANCE')}/>
                                                <FormControl required fullWidth>
                                                    <TextField
                                                        id="performance"
                                                        placeholder={t('CAR_TYPES.PERFORMANCE')}
                                                        name='performance'
                                                        label={t('CAR_TYPES.PERFORMANCE')}
                                                        value={values.performance}
                                                        onChange={handleChange('performance')}
                                                        data-testid='performance-input'
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
                                    <Grid item container direction="column" spacing={2} xs={4}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('CAR_TYPES.OWN_WEIGHT')}/>
                                                <FormControl required fullWidth>
                                                    <TextField
                                                        id="ownWeight"
                                                        placeholder={t('CAR_TYPES.OWN_WEIGHT')}
                                                        name='ownWeight'
                                                        label={t('CAR_TYPES.OWN_WEIGHT')}
                                                        value={values.ownWeight}
                                                        onChange={handleChange('ownWeight')}
                                                        data-testid='own-weight-input'
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
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('CAR_TYPES.NUMBER_OF_SEATS')}/>
                                                <FormControl>
                                                    <InputLabel>{t('CAR_TYPES.NUMBER_OF_SEATS')}</InputLabel>
                                                    <Select
                                                        id="numberOfSeats"
                                                        placeholder={t('CAR_TYPES.CAR_FUNCTIONAL_DESIGN')}
                                                        label={t('CAR_TYPES.CAR_FUNCTIONAL_DESIGN')}
                                                        name='numberOfSeats'
                                                        data-testid='number-of-seats-input'
                                                        value={values.numberOfSeats ?? ''}
                                                        onChange={handleChange('numberOfSeats')}
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
                                                    >
                                                        {Object.values(carTypes).map((type) => (
                                                            <MenuItem key={type._id} value={type._id}>
                                                                {type.brand} + {type.typeName}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={4}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('CAR_TYPES.FUEL')}/>
                                                <FormControl>
                                                    <InputLabel>{t('CAR_TYPES.FUEL')}</InputLabel>
                                                    <Select
                                                        id="fuel"
                                                        placeholder={t('CAR_TYPES.FUEL')}
                                                        label={t('CAR_TYPES.FUEL')}
                                                        name='fuel'
                                                        data-testid='fuel-input'
                                                        value={values.fuel ?? ''}
                                                        onChange={handleChange('fuel')}
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
                                                    >
                                                        {Object.values(carTypes).map((type) => (
                                                            <MenuItem key={type._id} value={type._id}>
                                                                {type.brand} + {type.typeName}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('CAR_TYPES.USEFUL_WEIGHT')}/>
                                                <FormControl required fullWidth>
                                                    <TextField
                                                        id="usefulWeight"
                                                        placeholder={t('CAR_TYPES.USEFUL_WEIGHT')}
                                                        name='usefulWeight'
                                                        label={t('CAR_TYPES.USEFUL_WEIGHT')}
                                                        value={values.usefulWeight}
                                                        onChange={handleChange('usefulWeight')}
                                                        data-testid='useful-weight-input'
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
                            </Grid>
                        </DataCard>

                        <Grid item container direction="column" spacing={2}>
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <NormalText text={t('TRANSPORTATIONS.SELECTED_CAR')}/>
                                        <FormControl>
                                            <InputLabel>{t('TRANSPORTATIONS.SELECTED_CAR')}</InputLabel>
                                            <Select
                                                id="selectedCar"
                                                placeholder={t('TRANSPORTATIONS.SELECTED_CAR')}
                                                label={t('TRANSPORTATIONS.SELECTED_CAR')}
                                                name='selectedCar'
                                                data-testid='selected-car-input'
                                                value={values.selectedCar ?? ''}
                                                onChange={handleChange('selectedCar')}
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
                                            >
                                                {Object.values(carTypes).map((type) => (
                                                    <MenuItem key={type._id} value={type._id}>
                                                        {type.brand} + {type.typeName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <DataCard>
                            <Headline text={t('TRANSPORTATIONS.CAR_DATA')} />
                            <Grid container direction="row" spacing={2}>
                                <Grid item container direction="column" spacing={2} xs={4}>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('CAR.LICENCE_PLATE')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="licencePlate"
                                                    placeholder={t('CAR.LICENCE_PLATE')}
                                                    name='licencePlate'
                                                    label={t('CAR.LICENCE_PLATE')}
                                                    value={values.licencePlate}
                                                    onChange={handleChange('licencePlate')}
                                                    data-testid='licence-plate-input'
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
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('CAR.REGISTRATION_CERTIFICATION_NUMBER')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="registrationCertificationNumber"
                                                    placeholder={t('CAR.REGISTRATION_CERTIFICATION_NUMBER')}
                                                    name='registrationCertificationNumber'
                                                    label={t('CAR.REGISTRATION_CERTIFICATION_NUMBER')}
                                                    value={values.registrationCertificationNumber}
                                                    onChange={handleChange('registrationCertificationNumber')}
                                                    data-testid='registration-certification-number-input'
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
                                <Grid item container direction="column" spacing={2} xs={4}>
                                    <Grid>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('CAR.CHASSIS_NUMBER')}/>
                                            <FormControl required fullWidth>
                                                <TextField
                                                    id="chassisNumber"
                                                    placeholder={t('CAR.CHASSIS_NUMBER')}
                                                    name='chassisNumber'
                                                    label={t('CAR.CHASSIS_NUMBER')}
                                                    value={values.chassisNumber}
                                                    onChange={handleChange('chassisNumber')}
                                                    data-testid='chassis-number-input'
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
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('CAR.YEAR_OF_PRODUCTION')} required={false}/>
                                            <FormControl required>
                                                <DatePicker
                                                    name='yearOfProduction'
                                                    data-testid='year-of-production-input'
                                                    //disabled={inputDisabled}
                                                    value={values.yearOfProduction}
                                                    onChange={handleDateChange('yearOfProduction')}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="column" spacing={2} xs={4}>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('CAR.DATE_OF_FIRST_REGISTRATION')} required={false}/>
                                            <FormControl required>
                                                <DatePicker
                                                    name='dateOfFirstRegistration'
                                                    data-testid='date-of-first-registration-input'
                                                    //disabled={inputDisabled}
                                                    value={values.dateOfFirstRegistration}
                                                    onChange={handleDateChange('dateOfFirstRegistration')}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DataCard>

                        {/*!isStepDone && (*/}
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                <CancelButton text={t('TEXT.CANCEL')} disabled={!isActiveStep} onClick={handleCancelClicked}/>
                                <SaveButton text={t('TEXT.NEXT')}  /*disabled={!isValid || !isActiveStep}*/ onClick={handleNextClicked}/>
                            </Box>
                        {/*})*/}
                    </BackgroundCard>
                </Box>
            )}
        </form>
    );
};

export default TransportationCarSelector;