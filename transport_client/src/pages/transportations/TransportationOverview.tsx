import BackgroundCard from "../../components/layout/BackgroundCard";
import DataCard from "../../components/layout/DataCard";
import Headline from "../../components/text/Headline";
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
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import SelectInput from "../../components/inputField/SelectInput";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import TextFieldInput from "../../components/inputField/TextFieldInput";
//import DatePickerInput from "../../components/inputField/DatePickerInput";
import {TransportationSteps} from "./enums/transportation-steps";
import {useTransportationStore} from "./stores/useTransportationStore";
import useTransportationOverview from "./hooks/useTransportationOverview";
import React, {useEffect, useState} from "react";
import moment from "moment";
import DatePicker from "react-datepicker";

interface Props {
    setCurrentStep: (step: number) => void;
}


const TransportationOverview = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const thisStep = TransportationSteps.OVERVIEW;
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

    const { control, isValid, preValidationError, onSubmit} = useTransportationOverview();

    const handleCancelClicked = () => {
        setCurrentStep(0);
        navigate(-1);
    };

    const handleNextClicked  = () => {
        onSubmit(); // Calls the `onSubmit` from the hook
        //setCurrentStep(1); // Move to the next step
    };

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
        <form autoComplete='off' noValidate onSubmit={(e) => e.preventDefault()}>
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

                        {!isStepDone && (
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                <CancelButton text={t('TEXT.BACK')} disabled={!isActiveStep} onClick={handleCancelClicked}/>
                                <SaveButton text={t('TEXT.SAVE')}  disabled={!isValid || !isActiveStep} onClick={handleNextClicked}/>
                            </Box>
                        )}
                    </BackgroundCard>
                </Box>
            )}
        </form>
    );
};

export default TransportationOverview;