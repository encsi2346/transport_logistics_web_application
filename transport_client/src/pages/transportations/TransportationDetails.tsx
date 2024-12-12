import BackgroundCard from "../../components/layout/BackgroundCard";
import DataCard from "../../components/layout/DataCard";
import Headline from "../../components/text/Headline";
import {Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import {TransportationSteps} from "./enums/transportation-steps";
import {useTransportationStore} from "./stores/useTransportationStore";
import DatePicker from "react-datepicker";
import React, {useEffect, useState} from "react";
import moment from "moment";
import "./Transportations.css";
import useTransportationCar from "./hooks/useTransportationCar";

interface Props {
    setCurrentStep: (step: number) => void;
}

const TransportationDetails = ({ setCurrentStep }: Props) => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const { departureDockingPointId, arrivalDockingPointId, dockingPointIds, setTransportation } = useTransportationStore();
    const transportation = useTransportationStore((state) => state.transportation);
    const thisStep = TransportationSteps.DETAILS;
    const currentStep = useTransportationStore((state) => state.currentStep);
    const isStepDone = currentStep > thisStep;
    const isActiveStep = thisStep === currentStep;
    const [dockingPointList, setDockingPointList] = useState([]);
    const [userList, setUserList] = useState([]);
    //const [extraDockingPoints, setExtraDockingPoints] = useState([]);
    const [departureId, setDepartureId] = useState(transportation.departureDockingPointId || '');
    const [arrivalId, setArrivalId] = useState(transportation.arrivalDockingPointId || '');
    const [selectedDockingPointIds, setSelectedDockingPointIds] = useState(transportation.dockingPointIds || []);
    const [departureDockingPointData, setDepartureDockingPointData] = useState({
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
    const [arrivalDockingPointData, setArrivalDockingPointData] = useState({
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

    const { onSubmit } = useTransportationCar();

    /*const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const { control, isValid, preValidationError, onSubmit} = useTransportationDetails();*/

    const handleDockingPointChange = (index: number, value: string) => {
        setSelectedDockingPointIds((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const addDockingPoint = () => {
        setSelectedDockingPointIds((prev) => [...prev, {
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
        }]);
    };

    const removeDockingPoint = (index: number) => {
        setSelectedDockingPointIds((prev) => prev.filter((_, i) => i !== index));
    };


    const handleLoadDockingPoints = async () => {
        const getResponse = await fetch(
            `http://localhost:3001/api/dockingPoints`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getAllDockingPointData = await getResponse.json();
        setDockingPointList(getAllDockingPointData);
    }

    useEffect(() => {
        handleLoadDockingPoints();
    }, []);

    const getDepartureDockingPoint = async () => {
        try {
            const getDepartureDockingPointResponse = await fetch(
                `http://localhost:3001/api/dockingPoints/${departureDockingPointId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getDepartureDockingPointData = await getDepartureDockingPointResponse.json();
            const getStatus = getDepartureDockingPointResponse.status;
            setDepartureDockingPointData(getDepartureDockingPointData);
        } catch (error) {
            console.error('Error get car type:', error);
        }
    }

    useEffect(() => {
        getDepartureDockingPoint();
    }, [departureDockingPointId])

    const getArrivalDockingPoint = async () => {
        try {
            const getArrivalDockingPointResponse = await fetch(
                `http://localhost:3001/api/dockingPoints/${arrivalDockingPointId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getArrivalDockingPointData = await getArrivalDockingPointResponse.json();
            const getStatus = getArrivalDockingPointResponse.status;
            setArrivalDockingPointData(getArrivalDockingPointData);
        } catch (error) {
            console.error('Error get car type:', error);
        }
    }

    useEffect(() => {
        getArrivalDockingPoint();
    }, [arrivalDockingPointId])

    const getUsers = async () => {
        try {
            const getUsersResponse = await fetch(
                `http://localhost:3001/api/users`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getUsersData = await getUsersResponse.json();
            const getStatus = getUsersResponse.status;
            setUserList(getUsersData);
        } catch (error) {
            console.error('Error get car type:', error);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    /* const getDepartureDriver = async () => {
         try {
             const getDepartureDriverResponse = await fetch(
                 `http://localhost:3001/api/users/${departureDockingPointData.driverId}`,
                 {
                     method: "GET",
                     headers: { "Content-Type": "application/json"},
                 }
             );
             const getDepartureDriverData = await getDepartureDriverResponse.json();
             const getStatus = getDepartureDriverResponse.status;
             //setSelectedCarTypeData(getDepartureDriverData);
         } catch (error) {
             console.error('Error get car type:', error);
         }
     }

     useEffect(() => {
         getDepartureDriver();
     }, [departureDockingPointDa.driverId])

     /*const getArrivalDriver = async () => {
         try {
             const getArrivalDriverResponse = await fetch(
                 `http://localhost:3001/api/users/${arrivalDockingPointData.driverId}`,
                 {
                     method: "GET",
                     headers: { "Content-Type": "application/json"},
                 }
             );
             const getArrivalDriverData = await getArrivalDriverResponse.json();
             const getStatus = getArrivalDriverResponse.status;
             //setSelectedArrivalDriverData(getCarTypeData);
         } catch (error) {
             console.error('Error get car type:', error);
         }
     }

     useEffect(() => {
         getArrivalDriver();
     }, [arrivalDockingPointData.driverId])*/


    const saveDockingPoints = async () => {
        try {
            // Save or update departure
            const departureResponse = await fetch(
                `http://localhost:3001/api/dockingPoints/${transportation.departureId || ""}`,
                {
                    method: transportation.departureId ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ locationId: departureId }),
                }
            );
            const departureData = await departureResponse.json();

            // Save or update arrival
            const arrivalResponse = await fetch(
                `http://localhost:3001/api/dockingPoints/${transportation.arrivalId || ""}`,
                {
                    method: transportation.arrivalId ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ locationId: arrivalId }),
                }
            );
            const arrivalData = await arrivalResponse.json();

            // Save or update each docking point
            const savedDockingPoints = await Promise.all(
                selectedDockingPointIds.map((point) =>
                    fetch(`http://localhost:3001/api/dockingPoints/${point.id || ""}`, {
                        method: point.id ? "PUT" : "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ locationId: point.locationId }),
                    }).then((response) => response.json())
                )
            );

            // Update transportation store with saved or updated IDs
            setTransportation({
                ...transportation,
                departureId: departureData.id,
                arrivalId: arrivalData.id,
                dockingPointIds: savedDockingPoints,
            });

            setCurrentStep(2); // Move to the next step
        } catch (error) {
            console.error("Error saving transportation details:", error);
        }
    };

    const handleCancelClicked = () => {
        setCurrentStep(0);
        //navigate(-1);
    };

    const handleNextClicked  = () => {
        onSubmit();
        setCurrentStep(2);
    };

    const handleDepartureChange = (prop: any) => (event: any) => {
        setDepartureDockingPointData({...departureDockingPointData, [prop]: event.target.value });
    };

    const handleArrivalChange = (prop: any) => (event: any) => {
        setArrivalDockingPointData({...arrivalDockingPointData, [prop]: event.target.value });
    };

    const handleDepartureDateChange = (prop: any) => (date: any) => {
        const value = date ? moment(date).toISOString() : null;
        setDepartureDockingPointData({ ...departureDockingPointData, [prop]: value as string });
    };

    const handleArrivalDateChange = (prop: any) => (date: any) => {
        const value = date ? moment(date).toISOString() : null;
        setArrivalDockingPointData({ ...arrivalDockingPointData, [prop]: value as string });
    };

    return (
        <form autoComplete='off' noValidate onSubmit={(e) => e.preventDefault()}>
            {isActiveStep && (
                <Box>
                    <BackgroundCard>
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
                                                        value={departureDockingPointData.country}
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
                                                        value={departureDockingPointData.postcode}
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
                                                        value={departureDockingPointData.city}
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
                                                        value={departureDockingPointData.nameOfPublicArea}
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
                                                        value={departureDockingPointData.typeOfPublicArea}
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
                                                        value={departureDockingPointData.houseNumber}
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
                                                        value={departureDockingPointData.destinationDate}
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
                                                        value={departureDockingPointData.passengers}
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
                                                        value={departureDockingPointData.destinationTime}
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
                                                        value={departureDockingPointData.isItOwnLocation}
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
                                                        value={departureDockingPointData.driverName}
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
                                                        value={arrivalDockingPointData.country}
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
                                                        value={arrivalDockingPointData.postcode}
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
                                                        value={arrivalDockingPointData.city}
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
                                                        value={arrivalDockingPointData.nameOfPublicArea}
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
                                                        value={arrivalDockingPointData.typeOfPublicArea}
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
                                                        value={arrivalDockingPointData.houseNumber}
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
                                                        value={arrivalDockingPointData.destinationDate}
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
                                                        value={arrivalDockingPointData.passengers}
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
                                                        value={arrivalDockingPointData.destinationTime}
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
                                                        value={arrivalDockingPointData.isItOwnLocation}
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
                                                        value={arrivalDockingPointData.driverName}
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
                            <Headline text={t('TRANSPORTATIONS.ADD_LOADING_POINT')} />
                            <Grid item>
                                {selectedDockingPointIds.map((point, index) => (
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
                                            <CancelButton text={t('TEXT.REMOVE')} onClick={() => removeDockingPoint(index)}/>
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
                                <Grid container item sx={{marginTop: 7, marginLeft: -2}}>
                                    <SaveButton text={t("TRANSPORTATIONS.ADD_NEW_DOCKING_POINT")} onClick={addDockingPoint}/>
                                </Grid>
                            </Grid>
                        </DataCard>

                        {!isStepDone && (
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                <CancelButton text={t('TEXT.BACK')} disabled={!isActiveStep} onClick={handleCancelClicked}/>
                                {/*TODO <SaveButton text={t('TEXT.NEXT')}  onClick={saveDockingPoints}/>*/}
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