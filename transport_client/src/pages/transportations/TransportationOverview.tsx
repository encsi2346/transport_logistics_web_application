import BackgroundCard from "../../components/layout/BackgroundCard";
import DataCard from "../../components/layout/DataCard";
import Headline from "../../components/text/Headline";
import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField, Typography
} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import {TransportationSteps} from "./enums/transportation-steps";
import {useTransportationStore} from "./stores/useTransportationStore";
import useTransportationOverview from "./hooks/useTransportationOverview";
import React, {useEffect, useState} from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "./Transportations.css";

interface Props {
    setCurrentStep: (step: number) => void;
}

const TransportationOverview = ({ setCurrentStep }: Props) => {
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
    const [selectedCarTypeData, setSelectedCarTypeData] = useState({
        carTypeId: '',
        brand: '',
        typeName: '',
        design: '',
        performance: '',
        selfWeight: 0,
        usefulWeight: 0,
        numberOfSeats: 0,
        fuel: '',
        towing: 0,
        height: 0,
        width: 0,
        long: 0,
        carTypeOfTransportationId: '',
    });
    const [selectedCarData, setSelectedCarData] = useState({
        carId: '',
        name: '',
        type: '',
        licencePlate: '',
        numberOfRegistrationLicence: '',
        chassisNumber: '',
        yearOfProduction: '',
        dateOfFirstRegistration: '',
        dateOfDatabaseRegistration: '',
        dateOfLastTechnicalExamination: '',
        dateOfLastService: '',
        totalDrivenKm: 0,
        totalTransport: 0,
        image: '',
    });
    const [departureValues, setDepartureValues] = useState({
        dockingPointId: '',
        country: '',
        postcode: '',
        city: '',
        nameOfPublicArea: '',
        typeOfPublicArea: '',
        houseNumber: '',
        departureDate: '',
        departureTime: '',
        destinationDate: '',
        destinationTime: '',
        isItOwnLocation: '',
        driverId: '',
        driverName: '',
        passengers: '',
    });
    const [arrivalValues, setArrivalValues] = useState({
        dockingPointId: '',
        country: '',
        postcode: '',
        city: '',
        nameOfPublicArea: '',
        typeOfPublicArea: '',
        houseNumber: '',
        departureDate: '',
        departureTime: '',
        destinationDate: '',
        destinationTime: '',
        isItOwnLocation: '',
        driverId: '',
        driverName: '',
        passengers: '',
    });
    const [dockingPoints, setDockingPoints] = useState([]);

    //const setCurrentStep = useTransportationStore((state) => state.setCurrentStep);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const { control, isValid, preValidationError, onSubmit} = useTransportationOverview();

    const handleCancelClicked = () => {
        setCurrentStep(3);
        //navigate(-1);
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

    const handleDepartureChange = (prop: any) => (event: any) => {
        setDepartureValues({...departureValues, [prop]: event.target.value });
    };

    const handleArrivalChange = (prop: any) => (event: any) => {
        setArrivalValues({...arrivalValues, [prop]: event.target.value });
    };

    const handleDepartureDateChange = (prop: any) => (date: any) => {
        const value = date ? moment(date).toISOString() : null;
        setDepartureValues({ ...departureValues, [prop]: value as string });
    };

    const handleArrivalDateChange = (prop: any) => (date: any) => {
        const value = date ? moment(date).toISOString() : null;
        setArrivalValues({ ...arrivalValues, [prop]: value as string });
    };

    const handleDockingPointChange = (index: number, value: string) => {
        setDockingPoints((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    return (
        <form autoComplete='off' noValidate onSubmit={(e) => e.preventDefault()}>
            {isActiveStep && (
                <Box>
                    <BackgroundCard>
                        <Grid item container direction="column" spacing={2}>
                            <Grid item container direction="row" xs={4} md={8} spacing={3}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <NormalText text={t('TRANSPORTATIONS.SELECTED_TRANSPORTATION_TYPE')}/>
                                        <FormControl required>
                                            <InputLabel>{t('TRANSPORTATIONS.SELECTED_TRANSPORTATION_TYPE')}</InputLabel>
                                            <Select
                                                id="selectedTypeOfTransportationId"
                                                placeholder={t('TRANSPORTATIONS.SELECTED_TRANSPORTATION_TYPE')}
                                                //label={t('TRANSPORTATIONS.SELECTED_TRANSPORTATION_TYPE')}
                                                name='selectedTypeOfTransportationId'
                                                data-testid='selected-type-of-transportation-id-input'
                                                value={values.selectedTypeOfTransportationId ?? ''}
                                                onChange={handleChange('selectedTypeOfTransportationId')}
                                                required
                                                sx={{
                                                    backgroundColor: `rgba(232, 227, 227, 0.76)`,
                                                    borderRadius: '8px',
                                                    color: `#000000`,
                                                    textDecoration: 'none',
                                                    height: 50,
                                                    width: { xs: '100%', sm: '350px' },
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    fontSize: "14px",
                                                    //fontWeight: "600",
                                                    "& .MuiInputBase-input": {
                                                        fontSize: '14px',
                                                        //fontWeight: '600',
                                                    },
                                                    "& fieldset": {
                                                        border: '#ffffff',
                                                        borderWidth: '5px'
                                                    },
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
                                        <FormControl required>
                                            <InputLabel>{t('TRANSPORTATIONS.SELECTED_CAR_TYPE')}</InputLabel>
                                            <Select
                                                id="selectedCarTypeId"
                                                placeholder={t('TRANSPORTATIONS.SELECTED_CAR_TYPE')}
                                                //label={t('TRANSPORTATIONS.SELECTED_CAR_TYPE')}
                                                name='selectedCarTypeId'
                                                data-testid='selected-car-type-id-input'
                                                value={values.selectedCarTypeId ?? ''}
                                                onChange={handleChange('selectedCarTypeId')}
                                                required
                                                sx={{
                                                    backgroundColor: `rgba(232, 227, 227, 0.76)`,
                                                    borderRadius: '8px',
                                                    color: `#000000`,
                                                    textDecoration: 'none',
                                                    height: 50,
                                                    width: { xs: '100%', sm: '350px' },
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    fontSize: "14px",
                                                    //fontWeight: "600",
                                                    "& .MuiInputBase-input": {
                                                        fontSize: '14px',
                                                        //fontWeight: '600',
                                                    },
                                                    "& fieldset": {
                                                        border: '#ffffff',
                                                        borderWidth: '5px'
                                                    },
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
                            <Grid container>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('CAR_TYPES.DESIGN')}/>
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <InputLabel
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: '#8f8f8f',
                                                            transform: 'translate(14px, 12px) scale(1)', // Ensures proper placement when not focused
                                                            left: 0,
                                                            "&.Mui-focused, &.MuiFormLabel-filled": {
                                                                transform: 'translate(14px, -6px) scale(0.75)', // Scaled position when focused
                                                            },
                                                        }}
                                                    >
                                                        {t('CAR_TYPES.DESIGN')}
                                                    </InputLabel>
                                                    <Select
                                                        id="design"
                                                        placeholder={t('CAR_TYPES.DESIGN')}
                                                        //label={t('CAR_TYPES.DESIGN')}
                                                        name="design"
                                                        data-testid="design-input"
                                                        value={selectedCarTypeData?.design ?? ''}
                                                        disabled={true}
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
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
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <TextField
                                                        id="performance"
                                                        placeholder={t('CAR_TYPES.PERFORMANCE')}
                                                        name='performance'
                                                        //label={t('CAR_TYPES.PERFORMANCE')}
                                                        value={selectedCarTypeData?.performance}
                                                        disabled={true}
                                                        data-testid='performance-input'
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
                                                        }}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('CAR_TYPES.OWN_WEIGHT')}/>
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <TextField
                                                        id="selfWeight"
                                                        placeholder={t('CAR_TYPES.OWN_WEIGHT')}
                                                        name='selfWeight'
                                                        //label={t('CAR_TYPES.OWN_WEIGHT')}
                                                        value={selectedCarTypeData?.selfWeight}
                                                        disabled={true}
                                                        data-testid='self-weight-input'
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
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
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <InputLabel
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: '#8f8f8f',
                                                            transform: 'translate(14px, 12px) scale(1)', // Ensures proper placement when not focused
                                                            left: 0,
                                                            "&.Mui-focused, &.MuiFormLabel-filled": {
                                                                transform: 'translate(14px, -6px) scale(0.75)', // Scaled position when focused
                                                            },
                                                        }}
                                                    >{t('CAR_TYPES.NUMBER_OF_SEATS')}</InputLabel>
                                                    <Select
                                                        id="numberOfSeats"
                                                        placeholder={t('CAR_TYPES.CAR_FUNCTIONAL_DESIGN')}
                                                        //label={t('CAR_TYPES.CAR_FUNCTIONAL_DESIGN')}
                                                        name='numberOfSeats'
                                                        data-testid='number-of-seats-input'
                                                        value={selectedCarTypeData?.numberOfSeats ?? ''}
                                                        disabled={true}
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
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
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('CAR_TYPES.FUEL')}/>
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <InputLabel
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: '#8f8f8f',
                                                            transform: 'translate(14px, 12px) scale(1)', // Ensures proper placement when not focused
                                                            left: 0,
                                                            "&.Mui-focused, &.MuiFormLabel-filled": {
                                                                transform: 'translate(14px, -6px) scale(0.75)', // Scaled position when focused
                                                            },
                                                        }}
                                                    >{t('CAR_TYPES.FUEL')}</InputLabel>
                                                    <Select
                                                        id="fuel"
                                                        placeholder={t('CAR_TYPES.FUEL')}
                                                        //label={t('CAR_TYPES.FUEL')}
                                                        name='fuel'
                                                        data-testid='fuel-input'
                                                        value={selectedCarTypeData?.fuel ?? ''}
                                                        disabled={true}
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
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
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <TextField
                                                        id="usefulWeight"
                                                        placeholder={t('CAR_TYPES.USEFUL_WEIGHT')}
                                                        name='usefulWeight'
                                                        //label={t('CAR_TYPES.USEFUL_WEIGHT')}
                                                        value={selectedCarTypeData?.usefulWeight}
                                                        disabled={true}
                                                        data-testid='useful-weight-input'
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
                                                        }}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('CAR_TYPES.WIDTH')}/>
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <InputLabel
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: '#8f8f8f',
                                                            transform: 'translate(14px, 12px) scale(1)', // Ensures proper placement when not focused
                                                            left: 0,
                                                            "&.Mui-focused, &.MuiFormLabel-filled": {
                                                                transform: 'translate(14px, -6px) scale(0.75)', // Scaled position when focused
                                                            },
                                                        }}
                                                    >{t('CAR_TYPES.WIDTH')}</InputLabel>
                                                    <TextField
                                                        id="width"
                                                        placeholder={t('CAR_TYPES.WIDTH')}
                                                        name='width'
                                                        //label={t('CAR_TYPES.WIDTH')}
                                                        value={selectedCarTypeData?.width}
                                                        disabled={true}
                                                        data-testid='width-input'
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
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
                                                <NormalText text={t('CAR_TYPES.TYPE_NAME')}/>
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <TextField
                                                        id="typeName"
                                                        placeholder={t('CAR_TYPES.TYPE_NAME')}
                                                        name='typeName'
                                                        //label={t('CAR_TYPES.TYPE_NAME')}
                                                        value={selectedCarTypeData?.typeName}
                                                        disabled={true}
                                                        data-testid='type-name-input'
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
                                                        }}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={3}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('CAR_TYPES.TOWING')}/>
                                            <FormControl
                                                sx={{
                                                    width: { xs: '100%', sm: '250px' },
                                                    backgroundColor: 'rgb(255, 255, 255)',
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <TextField
                                                    id="towing"
                                                    placeholder={t('CAR_TYPES.TOWING')}
                                                    name='towing'
                                                    //label={t('CAR_TYPES.TOWING')}
                                                    value={selectedCarTypeData?.towing}
                                                    disabled={true}
                                                    data-testid='towing-input'
                                                    sx={{
                                                        backgroundColor: `rgb(255, 255, 255)`,
                                                        borderRadius: '8px',
                                                        color: `#000000`,
                                                        textDecoration: 'none',
                                                        height: 40,
                                                        fontSize: '14px',
                                                        //fontWeight: '600',
                                                        "& .MuiInputBase-input": {
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            padding: '10px 14px', // Controls padding inside the box
                                                        },
                                                        "& fieldset": {
                                                            border: '#ffffff',
                                                            borderWidth: '5px',
                                                        },
                                                    }}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('CAR_TYPES.HEIGHT')}/>
                                            <FormControl
                                                sx={{
                                                    width: { xs: '100%', sm: '250px' },
                                                    backgroundColor: 'rgb(255, 255, 255)',
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <TextField
                                                    id="height"
                                                    placeholder={t('CAR_TYPES.HEIGHT')}
                                                    name='height'
                                                    //label={t('CAR_TYPES.HEIGHT')}
                                                    value={selectedCarTypeData?.height}
                                                    disabled={true}
                                                    data-testid='height-input'
                                                    sx={{
                                                        backgroundColor: `rgb(255, 255, 255)`,
                                                        borderRadius: '8px',
                                                        color: `#000000`,
                                                        textDecoration: 'none',
                                                        height: 40,
                                                        fontSize: '14px',
                                                        //fontWeight: '600',
                                                        "& .MuiInputBase-input": {
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            padding: '10px 14px', // Controls padding inside the box
                                                        },
                                                        "& fieldset": {
                                                            border: '#ffffff',
                                                            borderWidth: '5px',
                                                        },
                                                    }}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('CAR_TYPES.LONG')}/>
                                            <FormControl
                                                sx={{
                                                    width: { xs: '100%', sm: '250px' },
                                                    backgroundColor: 'rgb(255, 255, 255)',
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <TextField
                                                    id="long"
                                                    placeholder={t('CAR_TYPES.LONG')}
                                                    name='long'
                                                    //label={t('CAR_TYPES.LONG')}
                                                    value={selectedCarTypeData?.long}
                                                    disabled={true}
                                                    data-testid='long-input'
                                                    sx={{
                                                        backgroundColor: `rgb(255, 255, 255)`,
                                                        borderRadius: '8px',
                                                        color: `#000000`,
                                                        textDecoration: 'none',
                                                        height: 40,
                                                        fontSize: '14px',
                                                        //fontWeight: '600',
                                                        "& .MuiInputBase-input": {
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            padding: '10px 14px', // Controls padding inside the box
                                                        },
                                                        "& fieldset": {
                                                            border: '#ffffff',
                                                            borderWidth: '5px',
                                                        },
                                                    }}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('CAR_TYPES.CAR_TYPE_OF_TRANSPORTATION')}/>
                                            <FormControl
                                                sx={{
                                                    width: { xs: '100%', sm: '250px' },
                                                    backgroundColor: 'rgb(255, 255, 255)',
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <TextField
                                                    id="carTypeOfTransportationId"
                                                    placeholder={t('CAR_TYPES.CAR_TYPE_OF_TRANSPORTATION')}
                                                    name='carTypeOfTransportationId'
                                                    //label={t('CAR_TYPES.CAR_TYPE_OF_TRANSPORTATION')}
                                                    value={selectedCarTypeData?.carTypeOfTransportationId}
                                                    disabled={true}
                                                    data-testid='car-type-of-transportation-id-input'
                                                    sx={{
                                                        backgroundColor: `rgb(255, 255, 255)`,
                                                        borderRadius: '8px',
                                                        color: `#000000`,
                                                        textDecoration: 'none',
                                                        height: 40,
                                                        fontSize: '14px',
                                                        //fontWeight: '600',
                                                        "& .MuiInputBase-input": {
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            padding: '10px 14px', // Controls padding inside the box
                                                        },
                                                        "& fieldset": {
                                                            border: '#ffffff',
                                                            borderWidth: '5px',
                                                        },
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
                                        <FormControl required>
                                            <InputLabel>{t('TRANSPORTATIONS.SELECTED_CAR')}</InputLabel>
                                            <Select
                                                id="selectedCarId"
                                                placeholder={t('TRANSPORTATIONS.SELECTED_CAR')}
                                                //label={t('TRANSPORTATIONS.SELECTED_CAR')}
                                                name='selectedCarId'
                                                data-testid='selected-car-id-input'
                                                value={values.selectedCarId ?? ''}
                                                onChange={handleChange('selectedCarId')}
                                                required
                                                sx={{
                                                    backgroundColor: `rgba(232, 227, 227, 0.76)`,
                                                    borderRadius: '8px',
                                                    color: `#000000`,
                                                    textDecoration: 'none',
                                                    height: 50,
                                                    width: { xs: '100%', sm: '350px' },
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    fontSize: "14px",
                                                    //fontWeight: "600",
                                                    "& .MuiInputBase-input": {
                                                        fontSize: '14px',
                                                        //fontWeight: '600',
                                                    },
                                                    "& fieldset": {
                                                        border: '#ffffff',
                                                        borderWidth: '5px'
                                                    },
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
                            <Grid container>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('CAR.LICENCE_PLATE')}/>
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <TextField
                                                        id="licencePlate"
                                                        placeholder={t('CAR.LICENCE_PLATE')}
                                                        name='licencePlate'
                                                        //label={t('CAR.LICENCE_PLATE')}
                                                        value={selectedCarData?.licencePlate}
                                                        disabled={true}
                                                        data-testid='licence-plate-input'
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
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
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <TextField
                                                        id="numberOfRegistrationLicence"
                                                        placeholder={t('CAR.REGISTRATION_CERTIFICATION_NUMBER')}
                                                        name='numberOfRegistrationLicence'
                                                        //label={t('CAR.REGISTRATION_CERTIFICATION_NUMBER')}
                                                        value={selectedCarData?.numberOfRegistrationLicence}
                                                        disabled={true}
                                                        data-testid='registration-certification-number-input'
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
                                                        }}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('CAR.CHASSIS_NUMBER')}/>
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <TextField
                                                        id="chassisNumber"
                                                        placeholder={t('CAR.CHASSIS_NUMBER')}
                                                        name='chassisNumber'
                                                        //label={t('CAR.CHASSIS_NUMBER')}
                                                        value={selectedCarData?.chassisNumber}
                                                        disabled={true}
                                                        data-testid='chassis-number-input'
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
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
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <DatePicker
                                                        name='yearOfProduction'
                                                        data-testid='year-of-production-input'
                                                        disabled={true}
                                                        value={selectedCarData?.yearOfProduction}
                                                        //dateFormat="dd/MM/yyyy"
                                                        className={'date-picker-class'}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('CAR.DATE_OF_FIRST_REGISTRATION')} required={false}/>
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <DatePicker
                                                        name='dateOfFirstRegistration'
                                                        data-testid='date-of-first-registration-input'
                                                        disabled={true}
                                                        value={selectedCarData?.dateOfFirstRegistration}
                                                        //dateFormat="dd/MM/yyyy"
                                                        className={'date-picker-class'}
                                                        //TODO: disabled format in css
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
                                                <NormalText text={t('CAR.NAME')} required={false}/>
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <TextField
                                                        id="name"
                                                        placeholder={t('CAR.NAME')}
                                                        name='name'
                                                        //label={t('CAR.NAME')}
                                                        value={selectedCarData?.name}
                                                        disabled={true}
                                                        data-testid='name-input'
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
                                                        }}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('CAR.TYPE')} required={false}/>
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <TextField
                                                        id="type"
                                                        placeholder={t('CAR.TYPE')}
                                                        name='type'
                                                        //label={t('CAR.TYPE')}
                                                        value={selectedCarData?.type}
                                                        disabled={true}
                                                        data-testid='type-input'
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
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
                                                <NormalText text={t('CAR.DATE_OF_DATABASE_REGISTRATION')} required={false}/>
                                                <FormControl
                                                    sx={{
                                                        width: { xs: '100%', sm: '250px' },
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <DatePicker
                                                        name='dateOfDatabaseRegistration'
                                                        data-testid='date-of-database-registration-input'
                                                        disabled={true}
                                                        value={selectedCarData?.dateOfDatabaseRegistration}
                                                        //dateFormat="dd/MM/yyyy"
                                                        className={'date-picker-class'}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={3}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('CAR.DATE_OF_LAST_TECHNICAL_EXAMINATION')}/>
                                            <FormControl
                                                sx={{
                                                    width: { xs: '100%', sm: '250px' },
                                                    backgroundColor: 'rgb(255, 255, 255)',
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <DatePicker
                                                    name='dateOfLastTechnicalExamination'
                                                    data-testid='date-of-last-technical-examination-input'
                                                    disabled={true}
                                                    value={selectedCarData?.dateOfLastTechnicalExamination}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('CAR.DATE_OF_LAST_SERVICE')}/>
                                            <FormControl
                                                sx={{
                                                    width: { xs: '100%', sm: '250px' },
                                                    backgroundColor: 'rgb(255, 255, 255)',
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <DatePicker
                                                    name='dateOfLastService'
                                                    data-testid='date-of-last-service-input'
                                                    disabled={true}
                                                    value={selectedCarData?.dateOfLastService}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid xs={3}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('CAR.TOTAL_DRIVEN_KM')}/>
                                            <FormControl
                                                sx={{
                                                    width: { xs: '100%', sm: '250px' },
                                                    backgroundColor: 'rgb(255, 255, 255)',
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <TextField
                                                    id="totalDrivenKm"
                                                    placeholder={t('CAR.TOTAL_DRIVEN_KM')}
                                                    name='totalDrivenKm'
                                                    //label={t('CAR.TOTAL_DRIVEN_KM')}
                                                    value={selectedCarData?.totalDrivenKm}
                                                    disabled={true}
                                                    data-testid='total-driven-km-input'
                                                    sx={{
                                                        backgroundColor: `rgb(255, 255, 255)`,
                                                        borderRadius: '8px',
                                                        color: `#000000`,
                                                        textDecoration: 'none',
                                                        height: 40,
                                                        fontSize: '14px',
                                                        //fontWeight: '600',
                                                        "& .MuiInputBase-input": {
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            padding: '10px 14px', // Controls padding inside the box
                                                        },
                                                        "& fieldset": {
                                                            border: '#ffffff',
                                                            borderWidth: '5px',
                                                        },
                                                    }}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <NormalText text={t('CAR.TOTAL_TRANSPORT')} required={false}/>
                                            <FormControl
                                                sx={{
                                                    width: { xs: '100%', sm: '250px' },
                                                    backgroundColor: 'rgb(255, 255, 255)',
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <TextField
                                                    id="totalTransport"
                                                    placeholder={t('CAR.TOTAL_TRANSPORT')}
                                                    name='totalTransport'
                                                    //label={t('CAR.TOTAL_TRANSPORT')}
                                                    value={selectedCarData?.totalTransport}
                                                    disabled={false}
                                                    data-testid='total-transport-input'
                                                    sx={{
                                                        backgroundColor: `rgb(255, 255, 255)`,
                                                        borderRadius: '8px',
                                                        color: `#000000`,
                                                        textDecoration: 'none',
                                                        height: 40,
                                                        fontSize: '14px',
                                                        //fontWeight: '600',
                                                        "& .MuiInputBase-input": {
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            padding: '10px 14px', // Controls padding inside the box
                                                        },
                                                        "& fieldset": {
                                                            border: '#ffffff',
                                                            borderWidth: '5px',
                                                        },
                                                    }}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DataCard>

                        <DataCard>
                            <Headline text={t('TRANSPORTATIONS.DEPARTURE_DATA')} />
                            <Grid container>
                                <Grid item container direction="row" spacing={2}>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.COUNTRY')}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <TextField
                                                        id="country"
                                                        placeholder={t('TRANSPORTATIONS.COUNTRY')}
                                                        name='country'
                                                        //label={t('TRANSPORTATIONS.COUNTRY')}
                                                        value={departureValues.country}
                                                        onChange={handleDepartureChange('country')}
                                                        data-testid='country-input'
                                                        required
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
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
                                                <NormalText text={t('TRANSPORTATIONS.POSTCODE')}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <TextField
                                                        id="postcode"
                                                        placeholder={t('TRANSPORTATIONS.POSTCODE')}
                                                        name='postcode'
                                                        //label={t('TRANSPORTATIONS.POSTCODE')}
                                                        value={departureValues.postcode}
                                                        onChange={handleDepartureChange('postcode')}
                                                        data-testid='postcode-input'
                                                        required
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
                                                        }}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.CITY')}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <TextField
                                                        id="city"
                                                        placeholder={t('TRANSPORTATIONS.CITY')}
                                                        name='city'
                                                        //label={t('TRANSPORTATIONS.CITY')}
                                                        value={departureValues.city}
                                                        onChange={handleDepartureChange('city')}
                                                        data-testid='city-input'
                                                        required
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
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
                                                <NormalText text={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <TextField
                                                        id="nameOfPublicArea"
                                                        placeholder={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}
                                                        name='nameOfPublicArea'
                                                        //label={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}
                                                        value={departureValues.nameOfPublicArea}
                                                        onChange={handleDepartureChange('nameOfPublicArea')}
                                                        data-testid='name-of-public-area-input'
                                                        required
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
                                                        }}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <TextField
                                                        id="typeOfPublicArea"
                                                        placeholder={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}
                                                        name='typeOfPublicArea'
                                                        //label={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}
                                                        value={departureValues.typeOfPublicArea}
                                                        onChange={handleDepartureChange('typeOfPublicArea')}
                                                        data-testid='type-of-public-area-input'
                                                        required
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
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
                                                <NormalText text={t('TRANSPORTATIONS.HOUSE_NUMBER')}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <TextField
                                                        id="houseNumber"
                                                        placeholder={t('TRANSPORTATIONS.HOUSE_NUMBER')}
                                                        name='houseNumber'
                                                        //label={t('TRANSPORTATIONS.HOUSE_NUMBER')}
                                                        value={departureValues.houseNumber}
                                                        onChange={handleDepartureChange('houseNumber')}
                                                        data-testid='house-number-input'
                                                        required
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
                                                        }}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.DESTINATION_DATE')} required={false}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <DatePicker
                                                        name='destinationDate'
                                                        data-testid='destination-date-input'
                                                        //disabled={inputDisabled}
                                                        value={departureValues.destinationDate}
                                                        onChange={handleDepartureChange('destinationDate')}
                                                        //dateFormat="dd/MM/yyyy"
                                                        className={'date-picker-class'}
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
                                                <NormalText text={t('TRANSPORTATIONS.PASSENGERS')} required={false}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <DatePicker
                                                        name='passengers'
                                                        data-testid='passengers-input'
                                                        //disabled={inputDisabled}
                                                        value={departureValues.passengers}
                                                        onChange={handleDepartureChange('passengers')}
                                                        //dateFormat="dd/MM/yyyy"
                                                        className={'date-picker-class'}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.DESTINATION_TIME')} required={false}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <DatePicker
                                                        name='destinationTime'
                                                        data-testid='destination-time-input'
                                                        //disabled={inputDisabled}
                                                        value={departureValues.destinationTime}
                                                        onChange={handleDepartureChange('destinationTime')}
                                                        //dateFormat="dd/MM/yyyy"
                                                        className={'date-picker-class'}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.IS_IT_OWN_LOCATION')} required={false}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <DatePicker
                                                        name='isItOwnLocation'
                                                        data-testid='is-it-own-location-input'
                                                        //disabled={inputDisabled}
                                                        value={departureValues.isItOwnLocation}
                                                        onChange={handleDepartureChange('isItOwnLocation')}
                                                        //dateFormat="dd/MM/yyyy"
                                                        className={'date-picker-class'}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.DRIVER_NAME')} required={false}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <DatePicker
                                                        name='driverName'
                                                        data-testid='driver-name-input'
                                                        //disabled={inputDisabled}
                                                        value={departureValues.driverName}
                                                        onChange={handleDepartureChange('driverName')}
                                                        //dateFormat="dd/MM/yyyy"
                                                        className={'date-picker-class'}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DataCard>

                        <DataCard>
                            <Headline text={t('TRANSPORTATIONS.ARRIVAL_DATA')} />
                            <Grid container>
                                <Grid item container direction="row" spacing={2}>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.COUNTRY')}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <TextField
                                                        id="country"
                                                        placeholder={t('TRANSPORTATIONS.COUNTRY')}
                                                        name='country'
                                                        //label={t('TRANSPORTATIONS.COUNTRY')}
                                                        value={arrivalValues.country}
                                                        onChange={handleArrivalChange('country')}
                                                        data-testid='country-input'
                                                        required
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
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
                                                <NormalText text={t('TRANSPORTATIONS.POSTCODE')}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <TextField
                                                        id="postcode"
                                                        placeholder={t('TRANSPORTATIONS.POSTCODE')}
                                                        name='postcode'
                                                        //label={t('TRANSPORTATIONS.POSTCODE')}
                                                        value={arrivalValues.postcode}
                                                        onChange={handleArrivalChange('postcode')}
                                                        data-testid='postcode-input'
                                                        required
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
                                                        }}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.CITY')}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <TextField
                                                        id="city"
                                                        placeholder={t('TRANSPORTATIONS.CITY')}
                                                        name='city'
                                                        //label={t('TRANSPORTATIONS.CITY')}
                                                        value={arrivalValues.city}
                                                        onChange={handleArrivalChange('city')}
                                                        data-testid='city-input'
                                                        required
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
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
                                                <NormalText text={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <TextField
                                                        id="nameOfPublicArea"
                                                        placeholder={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}
                                                        name='nameOfPublicArea'
                                                        //label={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}
                                                        value={arrivalValues.nameOfPublicArea}
                                                        onChange={handleArrivalChange('nameOfPublicArea')}
                                                        data-testid='name-of-public-area-input'
                                                        required
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
                                                        }}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <TextField
                                                        id="typeOfPublicArea"
                                                        placeholder={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}
                                                        name='typeOfPublicArea'
                                                        //label={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}
                                                        value={arrivalValues.typeOfPublicArea}
                                                        onChange={handleArrivalChange('typeOfPublicArea')}
                                                        data-testid='type-of-public-area-input'
                                                        required
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
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
                                                <NormalText text={t('TRANSPORTATIONS.HOUSE_NUMBER')}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <TextField
                                                        id="houseNumber"
                                                        placeholder={t('TRANSPORTATIONS.HOUSE_NUMBER')}
                                                        name='houseNumber'
                                                        //label={t('TRANSPORTATIONS.HOUSE_NUMBER')}
                                                        value={arrivalValues.houseNumber}
                                                        onChange={handleArrivalChange('houseNumber')}
                                                        data-testid='house-number-input'
                                                        required
                                                        sx={{
                                                            backgroundColor: `rgb(255, 255, 255)`,
                                                            borderRadius: '8px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            fontSize: '14px',
                                                            //fontWeight: '600',
                                                            "& .MuiInputBase-input": {
                                                                fontSize: '14px',
                                                                //fontWeight: '600',
                                                                padding: '10px 14px', // Controls padding inside the box
                                                            },
                                                            "& fieldset": {
                                                                border: '#ffffff',
                                                                borderWidth: '5px',
                                                            },
                                                        }}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.DESTINATION_DATE')} required={false}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <DatePicker
                                                        name='destinationDate'
                                                        data-testid='destination-date-input'
                                                        //disabled={inputDisabled}
                                                        value={arrivalValues.destinationDate}
                                                        onChange={handleArrivalChange('destinationDate')}
                                                        //dateFormat="dd/MM/yyyy"
                                                        className={'date-picker-class'}
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
                                                <NormalText text={t('TRANSPORTATIONS.PASSENGERS')} required={false}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <DatePicker
                                                        name='passengers'
                                                        data-testid='passengers-input'
                                                        //disabled={inputDisabled}
                                                        value={arrivalValues.passengers}
                                                        onChange={handleArrivalChange('passengers')}
                                                        //dateFormat="dd/MM/yyyy"
                                                        className={'date-picker-class'}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.DESTINATION_TIME')} required={false}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <DatePicker
                                                        name='destinationTime'
                                                        data-testid='destination-time-input'
                                                        //disabled={inputDisabled}
                                                        value={arrivalValues.destinationTime}
                                                        onChange={handleArrivalChange('destinationTime')}
                                                        //dateFormat="dd/MM/yyyy"
                                                        className={'date-picker-class'}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.IS_IT_OWN_LOCATION')} required={false}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <DatePicker
                                                        name='isItOwnLocation'
                                                        data-testid='is-it-own-location-input'
                                                        //disabled={inputDisabled}
                                                        value={arrivalValues.isItOwnLocation}
                                                        onChange={handleArrivalChange('isItOwnLocation')}
                                                        //dateFormat="dd/MM/yyyy"
                                                        className={'date-picker-class'}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.DRIVER_NAME')} required={false}/>
                                                <FormControl required
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                >
                                                    <DatePicker
                                                        name='driverName'
                                                        data-testid='driver-name-input'
                                                        //disabled={inputDisabled}
                                                        value={arrivalValues.driverName}
                                                        onChange={handleArrivalChange('driverName')}
                                                        //dateFormat="dd/MM/yyyy"
                                                        className={'date-picker-class'}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DataCard>

                        <DataCard>
                            <Headline text={t('TRANSPORTATIONS.LOADING_POINTS')} />
                            <Grid item>
                                {dockingPoints.map((point, index) => (
                                    <Grid key={index} container>
                                        <Grid container sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginLeft: '10px',
                                            marginRight: '10px',
                                            gap: 2
                                        }}>
                                            <Typography sx={{
                                                fontWeight: 700,
                                                fontSize: '26px',
                                                lineHeight: '20px',
                                                color: '#DD1C13',
                                            }}>
                                                {t('TRANSPORTATIONS.DOCKING_POINT')} {index + 1}.
                                            </Typography>
                                        </Grid>
                                        <Grid key={index} container>
                                            <Grid item container direction="row" spacing={2}>
                                                <Grid item container direction="column" spacing={2} xs={3}>
                                                    <Grid item>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'flex-start'
                                                        }}>
                                                            <NormalText text={t('TRANSPORTATIONS.COUNTRY')}/>
                                                            <FormControl required
                                                                         sx={{
                                                                             width: { xs: '100%', sm: '250px' },
                                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                                             borderRadius: '8px',
                                                                         }}
                                                            >
                                                                <TextField
                                                                    id="country"
                                                                    placeholder={t('TRANSPORTATIONS.COUNTRY')}
                                                                    name='country'
                                                                    //label={t('TRANSPORTATIONS.COUNTRY')}
                                                                    value={point.country || ''}
                                                                    onChange={(e) =>
                                                                        handleDockingPointChange(index, 'country')
                                                                    }
                                                                    data-testid='country-input'
                                                                    required
                                                                    sx={{
                                                                        backgroundColor: `rgb(255, 255, 255)`,
                                                                        borderRadius: '8px',
                                                                        color: `#000000`,
                                                                        textDecoration: 'none',
                                                                        height: 40,
                                                                        fontSize: '14px',
                                                                        //fontWeight: '600',
                                                                        "& .MuiInputBase-input": {
                                                                            fontSize: '14px',
                                                                            //fontWeight: '600',
                                                                            padding: '10px 14px', // Controls padding inside the box
                                                                        },
                                                                        "& fieldset": {
                                                                            border: '#ffffff',
                                                                            borderWidth: '5px',
                                                                        },
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
                                                            <NormalText text={t('TRANSPORTATIONS.POSTCODE')}/>
                                                            <FormControl required
                                                                         sx={{
                                                                             width: { xs: '100%', sm: '250px' },
                                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                                             borderRadius: '8px',
                                                                         }}
                                                            >
                                                                <TextField
                                                                    id="postcode"
                                                                    placeholder={t('TRANSPORTATIONS.POSTCODE')}
                                                                    name='postcode'
                                                                    //label={t('TRANSPORTATIONS.POSTCODE')}
                                                                    value={point.postcode || ''}
                                                                    onChange={(e) =>
                                                                        handleDockingPointChange(index, 'postcode')
                                                                    }
                                                                    data-testid='postcode-input'
                                                                    required
                                                                    sx={{
                                                                        backgroundColor: `rgb(255, 255, 255)`,
                                                                        borderRadius: '8px',
                                                                        color: `#000000`,
                                                                        textDecoration: 'none',
                                                                        height: 40,
                                                                        fontSize: '14px',
                                                                        //fontWeight: '600',
                                                                        "& .MuiInputBase-input": {
                                                                            fontSize: '14px',
                                                                            //fontWeight: '600',
                                                                            padding: '10px 14px', // Controls padding inside the box
                                                                        },
                                                                        "& fieldset": {
                                                                            border: '#ffffff',
                                                                            borderWidth: '5px',
                                                                        },
                                                                    }}
                                                                />
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                                <Grid item container direction="column" spacing={2} xs={3}>
                                                    <Grid item>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'flex-start'
                                                        }}>
                                                            <NormalText text={t('TRANSPORTATIONS.CITY')}/>
                                                            <FormControl required
                                                                         sx={{
                                                                             width: { xs: '100%', sm: '250px' },
                                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                                             borderRadius: '8px',
                                                                         }}
                                                            >
                                                                <TextField
                                                                    id="city"
                                                                    placeholder={t('TRANSPORTATIONS.CITY')}
                                                                    name='city'
                                                                    //label={t('TRANSPORTATIONS.CITY')}
                                                                    value={point.city || ''}
                                                                    onChange={(e) =>
                                                                        handleDockingPointChange(index, 'city')
                                                                    }
                                                                    data-testid='city-input'
                                                                    required
                                                                    sx={{
                                                                        backgroundColor: `rgb(255, 255, 255)`,
                                                                        borderRadius: '8px',
                                                                        color: `#000000`,
                                                                        textDecoration: 'none',
                                                                        height: 40,
                                                                        fontSize: '14px',
                                                                        //fontWeight: '600',
                                                                        "& .MuiInputBase-input": {
                                                                            fontSize: '14px',
                                                                            //fontWeight: '600',
                                                                            padding: '10px 14px', // Controls padding inside the box
                                                                        },
                                                                        "& fieldset": {
                                                                            border: '#ffffff',
                                                                            borderWidth: '5px',
                                                                        },
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
                                                            <NormalText text={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}/>
                                                            <FormControl required
                                                                         sx={{
                                                                             width: { xs: '100%', sm: '250px' },
                                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                                             borderRadius: '8px',
                                                                         }}
                                                            >
                                                                <TextField
                                                                    id="nameOfPublicArea"
                                                                    placeholder={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}
                                                                    name='nameOfPublicArea'
                                                                    //label={t('TRANSPORTATIONS.NAME_OF_PUBLIC_AREA')}
                                                                    value={point.nameOfPublicArea || ''}
                                                                    onChange={(e) =>
                                                                        handleDockingPointChange(index, 'nameOfPublicArea')
                                                                    }
                                                                    data-testid='name-of-public-area-input'
                                                                    required
                                                                    sx={{
                                                                        backgroundColor: `rgb(255, 255, 255)`,
                                                                        borderRadius: '8px',
                                                                        color: `#000000`,
                                                                        textDecoration: 'none',
                                                                        height: 40,
                                                                        fontSize: '14px',
                                                                        //fontWeight: '600',
                                                                        "& .MuiInputBase-input": {
                                                                            fontSize: '14px',
                                                                            //fontWeight: '600',
                                                                            padding: '10px 14px', // Controls padding inside the box
                                                                        },
                                                                        "& fieldset": {
                                                                            border: '#ffffff',
                                                                            borderWidth: '5px',
                                                                        },
                                                                    }}
                                                                />
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                                <Grid item container direction="column" spacing={2} xs={3}>
                                                    <Grid item>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'flex-start'
                                                        }}>
                                                            <NormalText text={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}/>
                                                            <FormControl required
                                                                         sx={{
                                                                             width: { xs: '100%', sm: '250px' },
                                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                                             borderRadius: '8px',
                                                                         }}
                                                            >
                                                                <TextField
                                                                    id="typeOfPublicArea"
                                                                    placeholder={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}
                                                                    name='typeOfPublicArea'
                                                                    //label={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}
                                                                    value={point.typeOfPublicArea || ''}
                                                                    onChange={(e) =>
                                                                        handleDockingPointChange(index, 'typeOfPublicArea')
                                                                    }
                                                                    data-testid='type-of-public-area-input'
                                                                    required
                                                                    sx={{
                                                                        backgroundColor: `rgb(255, 255, 255)`,
                                                                        borderRadius: '8px',
                                                                        color: `#000000`,
                                                                        textDecoration: 'none',
                                                                        height: 40,
                                                                        fontSize: '14px',
                                                                        //fontWeight: '600',
                                                                        "& .MuiInputBase-input": {
                                                                            fontSize: '14px',
                                                                            //fontWeight: '600',
                                                                            padding: '10px 14px', // Controls padding inside the box
                                                                        },
                                                                        "& fieldset": {
                                                                            border: '#ffffff',
                                                                            borderWidth: '5px',
                                                                        },
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
                                                            <NormalText text={t('TRANSPORTATIONS.HOUSE_NUMBER')}/>
                                                            <FormControl required
                                                                         sx={{
                                                                             width: { xs: '100%', sm: '250px' },
                                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                                             borderRadius: '8px',
                                                                         }}
                                                            >
                                                                <TextField
                                                                    id="houseNumber"
                                                                    placeholder={t('TRANSPORTATIONS.HOUSE_NUMBER')}
                                                                    name='houseNumber'
                                                                    //label={t('TRANSPORTATIONS.HOUSE_NUMBER')}
                                                                    value={point.houseNumber || ''}
                                                                    onChange={(e) =>
                                                                        handleDockingPointChange(index, 'houseNumber')
                                                                    }
                                                                    data-testid='house-number-input'
                                                                    required
                                                                    sx={{
                                                                        backgroundColor: `rgb(255, 255, 255)`,
                                                                        borderRadius: '8px',
                                                                        color: `#000000`,
                                                                        textDecoration: 'none',
                                                                        height: 40,
                                                                        fontSize: '14px',
                                                                        //fontWeight: '600',
                                                                        "& .MuiInputBase-input": {
                                                                            fontSize: '14px',
                                                                            //fontWeight: '600',
                                                                            padding: '10px 14px', // Controls padding inside the box
                                                                        },
                                                                        "& fieldset": {
                                                                            border: '#ffffff',
                                                                            borderWidth: '5px',
                                                                        },
                                                                    }}
                                                                />
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                                <Grid item container direction="column" spacing={2} xs={3}>
                                                    <Grid item>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'flex-start'
                                                        }}>
                                                            <NormalText text={t('TRANSPORTATIONS.DESTINATION_DATE')} required={false}/>
                                                            <FormControl required
                                                                         sx={{
                                                                             width: { xs: '100%', sm: '250px' },
                                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                                             borderRadius: '8px',
                                                                         }}
                                                            >
                                                                <DatePicker
                                                                    name='destinationDate'
                                                                    data-testid='destination-date-input'
                                                                    //disabled={inputDisabled}
                                                                    value={point.destinationDate || ''}
                                                                    onChange={(e) =>
                                                                        handleDockingPointChange(index, 'destinationDate')
                                                                    }
                                                                    //dateFormat="dd/MM/yyyy"
                                                                    className={'date-picker-class'}
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
                                                            <NormalText text={t('TRANSPORTATIONS.PASSENGERS')} required={false}/>
                                                            <FormControl required
                                                                         sx={{
                                                                             width: { xs: '100%', sm: '250px' },
                                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                                             borderRadius: '8px',
                                                                         }}
                                                            >
                                                                <DatePicker
                                                                    name='passengers'
                                                                    data-testid='passengers-input'
                                                                    //disabled={inputDisabled}
                                                                    value={point.passengers || ''}
                                                                    onChange={(e) =>
                                                                        handleDockingPointChange(index, 'passengers')
                                                                    }
                                                                    //dateFormat="dd/MM/yyyy"
                                                                    className={'date-picker-class'}
                                                                />
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                                <Grid item container direction="column" spacing={2} xs={3}>
                                                    <Grid item>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'flex-start'
                                                        }}>
                                                            <NormalText text={t('TRANSPORTATIONS.DESTINATION_TIME')} required={false}/>
                                                            <FormControl required
                                                                         sx={{
                                                                             width: { xs: '100%', sm: '250px' },
                                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                                             borderRadius: '8px',
                                                                         }}
                                                            >
                                                                <DatePicker
                                                                    name='destinationTime'
                                                                    data-testid='destination-time-input'
                                                                    //disabled={inputDisabled}
                                                                    value={point.destinationTime || ''}
                                                                    onChange={(e) =>
                                                                        handleDockingPointChange(index, 'destinationTime')
                                                                    }
                                                                    //dateFormat="dd/MM/yyyy"
                                                                    className={'date-picker-class'}
                                                                />
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                                <Grid item container direction="column" spacing={2} xs={3}>
                                                    <Grid item>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'flex-start'
                                                        }}>
                                                            <NormalText text={t('TRANSPORTATIONS.IS_IT_OWN_LOCATION')} required={false}/>
                                                            <FormControl required
                                                                         sx={{
                                                                             width: { xs: '100%', sm: '250px' },
                                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                                             borderRadius: '8px',
                                                                         }}
                                                            >
                                                                <DatePicker
                                                                    name='isItOwnLocation'
                                                                    data-testid='is-it-own-location-input'
                                                                    //disabled={inputDisabled}
                                                                    value={point.isItOwnLocation || ''}
                                                                    onChange={(e) =>
                                                                        handleDockingPointChange(index, 'isItOwnLocation')
                                                                    }
                                                                    //dateFormat="dd/MM/yyyy"
                                                                    className={'date-picker-class'}
                                                                />
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                                <Grid item container direction="column" spacing={2} xs={3}>
                                                    <Grid item>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'flex-start'
                                                        }}>
                                                            <NormalText text={t('TRANSPORTATIONS.DRIVER_NAME')} required={false}/>
                                                            <FormControl required
                                                                         sx={{
                                                                             width: { xs: '100%', sm: '250px' },
                                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                                             borderRadius: '8px',
                                                                         }}
                                                            >
                                                                <DatePicker
                                                                    name='driverName'
                                                                    data-testid='driver-name-input'
                                                                    //disabled={inputDisabled}
                                                                    value={point.driverName || ''}
                                                                    onChange={(e) =>
                                                                        handleDockingPointChange(index, 'driverName')
                                                                    }
                                                                    //dateFormat="dd/MM/yyyy"
                                                                    className={'date-picker-class'}
                                                                />
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
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