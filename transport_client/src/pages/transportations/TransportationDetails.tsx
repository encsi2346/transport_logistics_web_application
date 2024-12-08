import BackgroundCard from "../../components/layout/BackgroundCard";
import DataCard from "../../components/layout/DataCard";
import Headline from "../../components/text/Headline";
import {Box, FormControl, Grid, TextField} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import {TransportationSteps} from "./enums/transportation-steps";
import {useTransportationStore} from "./stores/useTransportationStore";
import useTransportationDetails from "./hooks/useTransportationDetails";
import DatePicker from "react-datepicker";
import React, {useState} from "react";
import moment from "moment";
import "./Transportations.css";

interface Props {
    setCurrentStep: (step: number) => void;
}

const TransportationDetails = ({ setCurrentStep }: Props) => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const { departureDockingPointId, arrivalDockingPointId, dockingPoints, setTransportation } = useTransportationStore();
    const thisStep = TransportationSteps.DETAILS;
    const currentStep = useTransportationStore((state) => state.currentStep);
    const isStepDone = currentStep > thisStep;
    const isActiveStep = thisStep === currentStep;
    const [dockingPoints, setDockingPoints] = useState([]);
    const [extraDockingPoints, setExtraDockingPoints] = useState([]);
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

    /*const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const { control, isValid, preValidationError, onSubmit} = useTransportationDetails();*/

    const handleCancelClicked = () => {
        setCurrentStep(0);
        //navigate(-1);
    };

    const handleNextClicked  = () => {
        onSubmit();
        setCurrentStep(2);
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
                                                <FormControl required fullWidth>
                                                    <TextField
                                                        id="country"
                                                        placeholder={t('TRANSPORTATIONS.COUNTRY')}
                                                        name='country'
                                                        label={t('TRANSPORTATIONS.COUNTRY')}
                                                        value={departureValues.country}
                                                        onChange={handleDepartureChange('country')}
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
                                        <Grid item>
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
                                                        value={departureValues.postcode}
                                                        onChange={handleDepartureChange('postcode')}
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
                                                <FormControl required fullWidth>
                                                    <TextField
                                                        id="city"
                                                        placeholder={t('TRANSPORTATIONS.CITY')}
                                                        name='city'
                                                        label={t('TRANSPORTATIONS.CITY')}
                                                        value={departureValues.city}
                                                        onChange={handleDepartureChange('city')}
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
                                        <Grid item>
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
                                                        value={departureValues.nameOfPublicArea}
                                                        onChange={handleDepartureChange('nameOfPublicArea')}
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
                                                <FormControl required fullWidth>
                                                    <TextField
                                                        id="typeOfPublicArea"
                                                        placeholder={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}
                                                        name='typeOfPublicArea'
                                                        label={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}
                                                        value={departureValues.typeOfPublicArea}
                                                        onChange={handleDepartureChange('typeOfPublicArea')}
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
                                        <Grid item>
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
                                                        value={departureValues.houseNumber}
                                                        onChange={handleDepartureChange('houseNumber')}
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
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.DESTINATION_DATE')} required={false}/>
                                                <FormControl required>
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
                                                <FormControl required>
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
                                                <FormControl required>
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
                                                <FormControl required>
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
                                                <FormControl required>
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
                                                <FormControl required fullWidth>
                                                    <TextField
                                                        id="country"
                                                        placeholder={t('TRANSPORTATIONS.COUNTRY')}
                                                        name='country'
                                                        label={t('TRANSPORTATIONS.COUNTRY')}
                                                        value={arrivalValues.country}
                                                        onChange={handleArrivalChange('country')}
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
                                        <Grid item>
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
                                                        value={arrivalValues.postcode}
                                                        onChange={handleArrivalChange('postcode')}
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
                                                <FormControl required fullWidth>
                                                    <TextField
                                                        id="city"
                                                        placeholder={t('TRANSPORTATIONS.CITY')}
                                                        name='city'
                                                        label={t('TRANSPORTATIONS.CITY')}
                                                        value={arrivalValues.city}
                                                        onChange={handleArrivalChange('city')}
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
                                        <Grid item>
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
                                                        value={arrivalValues.nameOfPublicArea}
                                                        onChange={handleArrivalChange('nameOfPublicArea')}
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
                                                <FormControl required fullWidth>
                                                    <TextField
                                                        id="typeOfPublicArea"
                                                        placeholder={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}
                                                        name='typeOfPublicArea'
                                                        label={t('TRANSPORTATIONS.TYPE_OF_PUBLIC_AREA')}
                                                        value={arrivalValues.typeOfPublicArea}
                                                        onChange={handleArrivalChange('typeOfPublicArea')}
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
                                        <Grid item>
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
                                                        value={arrivalValues.houseNumber}
                                                        onChange={handleArrivalChange('houseNumber')}
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
                                    <Grid item container direction="column" spacing={2} xs={3}>
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                <NormalText text={t('TRANSPORTATIONS.DESTINATION_DATE')} required={false}/>
                                                <FormControl required>
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
                                                <FormControl required>
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
                                                <FormControl required>
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
                                                <FormControl required>
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
                                                <FormControl required>
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