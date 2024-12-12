import BackgroundCard from "../../components/layout/BackgroundCard";
import {
    Box,
    FormControl,
    Grid,
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
import {TransportationSteps} from "./enums/transportation-steps";
import {useTransportationStore} from "./stores/useTransportationStore";
import useTransportationCar from "./hooks/useTransportationCar";
import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import moment from "moment/moment";
import "./Transportations.css";

interface Props {
    setCurrentStep: (step: number) => void;
}

const TransportationCarSelector = ({ setCurrentStep }: Props) => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const { selectedTypeOfTransportationId, selectedCarTypeId, selectedCarId, setTransportation } = useTransportationStore();
    const thisStep = TransportationSteps.CAR;
    const currentStep = useTransportationStore((state) => state.currentStep);
    const isStepDone = currentStep > thisStep;
    const isActiveStep = thisStep === currentStep;
    const [typeOfTransportationList, setTypeOfTransportationList] = useState([]);
    const [carTypes, setCarTypes] = useState([]);
    const [cars, setCars] = useState([]);
    /*const [values, setValues] = useState({
        selectedTypeOfTransportationId: '',
        selectedCarTypeId: '',
        selectedCarId: '',
    });*/
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
    const { onSubmit } = useTransportationCar();

    /*const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const { control, isValid, preValidationError, onSubmit} = useTransportationCar();*/

    const handleLoadTypeOfTransportation = async () => {
        const getResponse = await fetch(
            `http://localhost:3001/api/type-of-transportation`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getTypeOfTransportationData = await getResponse.json();
        setTypeOfTransportationList(getTypeOfTransportationData);
    }

    useEffect(() => {
        handleLoadTypeOfTransportation();
    }, []);

    const handleLoadCarTypes = async () => {
        const getResponse = await fetch(
            `http://localhost:3001/api/type-of-transportation/${selectedTypeOfTransportationId}/car-types`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getCarTypesData = await getResponse.json();
        setCarTypes(getCarTypesData);
    }

    useEffect(() => {
        handleLoadCarTypes();
    }, [selectedTypeOfTransportationId])


    const getSelectedCarType = async () => {
        try {
            const getCarTypeResponse = await fetch(
                `http://localhost:3001/api/car-types/${selectedCarTypeId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getCarTypeData = await getCarTypeResponse.json();
            const getStatus = getCarTypeResponse.status;
            setSelectedCarTypeData(getCarTypeData);
        } catch (error) {
            console.error('Error get car type:', error);
        }
    }

    useEffect(() => {
        getSelectedCarType();
    }, [selectedCarTypeId])

    const getSelectedCar = async () => {
        try {
            const getCarResponse = await fetch(
                `http://localhost:3001/api/cars/${selectedCarId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getCarData = await getCarResponse.json();
            setSelectedCarData(getCarData);
        } catch (error) {
            console.error('Error get car:', error);
        }
    }

    useEffect(() => {
        getSelectedCar();
    }, [selectedCarId])

    const handleChange = (prop: any) => (event: any) => {
        setTransportation({
            [prop]: event.target.value
        });
    };

    const handleCancelClicked = () => {
        setCurrentStep(0);
        navigate(-1);
    };

    const handleNextClicked  = () => {
        onSubmit();
        setCurrentStep(1);
    };

    return (
        <form autoComplete='off' noValidate onSubmit={(e) => (e.preventDefault())}>
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
                                                value={selectedTypeOfTransportationId ?? ''}
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
                                                value={selectedCarTypeId ?? ''}
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
                                                value={selectedCarId ?? ''}
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