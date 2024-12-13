import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Grid,
    InputAdornment, InputLabel, Select, TextField, useTheme
} from '@mui/material';
import type {SxProps, Theme} from '@mui/material';
import type { GridSelectionModel } from '@mui/x-data-grid';
import {useNavigate, useParams} from "react-router-dom";
import Van from "@/assets/van.png";
import { useTypeSafeTranslation } from '../../components/inputField/hooks/useTypeSafeTranslation';
import NormalText from "../../components/text/NormalText";
import React, {useState} from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Headline from "../../components/text/Headline";
import DatePicker from "react-datepicker";
import moment from "moment/moment";

import "react-datepicker/dist/react-datepicker.css";
import "./CarAddDialog.css";
import CardBoardBox from "../../assets/cardboard_box_2.png";

const titleStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '20px',
    color: '#000000',
    marginTop: '60px',
    marginBottom: '30px',
    marginLeft: '10px',
    marginRight: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const saveTitleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: '#DD1C13',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

const cancelTitleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#DD1C13',
    backgroundColor: 'rgba(41, 0, 92, 0.12)',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

const NewCarAddDialog = NiceModal.create(
    (props: { title: string; acceptText: string; defaultSelected: GridSelectionModel; handleEmployeeAdded: () => void }) => {
        const modal = useModal();
        const theme = useTheme();
        const { t } = useTypeSafeTranslation();
        const { id } = useParams();
        const navigate = useNavigate();
        const [inputDisabled, setInputDisabled] = useState(false); //isInputDisabled
        const [isEditing, setIsEditing] = useState(true);
        const [productStatusList, setProductStatusList] = useState([]);
        const [values, setValues] = useState({
            carId: '',
            name: '',
            type: '',
            licencePlate: '',
            numberOfRegistrationLicence: '',
            chassisNumber: '',
            yearOfProduction: '',
            dateOfFirstRegistration: '',
            images: '',
            dateOfDatabaseRegistration: '',
            dateOfLastTechnicalExamination: '',
            dateOfLastService: '',
            totalDrivenKm: '',
            totalTransport: '',
        });

        const getCar = async (id: string) => {
            try {
                const getCarResponse = await fetch(
                    `http://localhost:3001/api/cars/${id}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json"},
                    }
                );
                const getCarData = await getCarResponse.json();
                const getStatus = getCarResponse.status;
                console.log('getCarData', getCarData);
                console.log('getUserStatus', getStatus);
                //setCar(getCarData);
            } catch (error) {
                console.error('Error get car:', error);
            }
        }

        const createCar = async (data: any) => {
            try {
                const createCarResponse = await fetch(
                    `http://localhost:3001/api/cars/addCar`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify(data),
                    }
                );
                const getCarData = await createCarResponse.json();
                const getStatus = createCarResponse.status;
                console.log('getCarData', getCarData);
                console.log('getUserStatus', getStatus);
                //setCar(getCarData);
                return getCarData;
            } catch (error) {
                console.error('Error creating car:', error);
            }
        };

        const updateCar = async (id: string, data: any) => {
            try {
                const updatedCarResponse = await fetch(
                    `http://localhost:3001/api/cars/${id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify(data),
                    }
                );
                const getCarData = await updatedCarResponse.json();
                const getStatus = updatedCarResponse.status;
                console.log('getCarData', getCarData);
                console.log('getUserStatus', getStatus);
                //setCar(getCarData);
                return getCarData;
            } catch (error) {
                console.error(`Error updating car with ID ${id}:`, error);
            }
        };

        const deleteCar = async (id: string) => {
            //TODO
            try {
                const deleteCarResponse = await fetch(
                    `http://localhost:3001/api/cars/${id}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json"},
                    }
                );
                const getCarData = await deleteCarResponse.json();
                const getStatus = deleteCarResponse.status;
                console.log('getCarTypeData', getCarData);
                console.log('getUserStatus', getStatus);
                //setCartTypes(getCarTypesData);
                return getCarData;
            } catch (error) {
                console.error(`Error deleting car with ID ${id}:`, error);
            }
        };

        const handleSubmit = async (e: any) => {
            e.preventDefault();

            let submitData = data as any;
            console.log('isEditing', isEditing);
            console.log('submitData', submitData);
            if (isEditing) {
                setInputDisabled(true);
                updateCar(id, submitData);
            } else {
                setInputDisabled(true);
                createCar(submitData);
            }
        };

        const handleChange = (prop: any) => (event: any) => {
            setValues({...values, [prop]: event.target.value });
        };

        const handleDateChange = (prop: any) => (date: any) => {
            const value = date ? moment(date).toISOString() : null;
            setValues({ ...values, [prop]: value as string });
        };

        return (
            <Dialog
                {...muiDialogV5(modal)}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "1200px",
                            borderRadius: '19px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                    },
                }}
            >
                <DialogTitle id="confirm-dialog-title" sx={titleStyle}>
                    {props.title}
                </DialogTitle>

                <DialogContent>
                    <Box
                        sx={{
                            backgroundColor: `${theme.palette.component.lightMin}`,
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            //marginBottom: '10px',
                            //marginTop: '10px',
                            //marginLeft: '20px',
                            //marginRight: '20px',
                            height: 650,
                            width: 1000,
                            borderRadius: '19px'
                        }}
                    >
                        <form
                            autoComplete='off'
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'start',
                                    marginBottom: 3
                                }}>
                                    <NormalText text={t('CAR.SELECTED_CAR_TYPE')} />
                                    <FormControl sx={{ width: { xs: '100%', sm: 'auto' } }}>
                                        <InputLabel
                                            sx={{
                                                fontSize: '14px',
                                                color: '#8f8f8f',
                                                transform: 'translate(14px, 12px) scale(1)', // Ensures proper placement when not focused
                                                left: 0,
                                                marginRight: 3,
                                                "&.Mui-focused, &.MuiFormLabel-filled": {
                                                    transform: 'translate(14px, -6px) scale(0.75)', // Scaled position when focused
                                                },
                                            }}
                                        >{t('CAR.SELECTED_CAR_TYPE')}</InputLabel>
                                        <Select
                                            id="type"
                                            placeholder={t('CAR.TYPE')}
                                            name='type'
                                            label={t('CAR.TYPE')}
                                            data-testid='type'
                                            disabled={inputDisabled}
                                            required
                                            value={values.type ?? ''}
                                            onChange={handleChange('type')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <ClearIcon
                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                            onClick={() => setValues({...values, type: '' })}
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
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
                                            {/*Object.values(genderList).map((gender) => (
                                                            <MenuItem key={gender.value} value={gender.value}>
                                                                {gender.label}
                                                            </MenuItem>
                                                        ))*/}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: `${theme.palette.component.medium}`,
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                    paddingTop: '10px',
                                    paddingBottom: '40px',
                                    height: '100%',
                                    borderRadius: '19px',
                                    boxShadow: `0 0 10px rgba(0,0,0,0.3)`,
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'start',
                                }}
                            >
                                <Headline text={t('CAR_TYPES.CAR_TYPE_DATA')} />
                                <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: 0, marginRight: 5}}>
                                    <Grid item container direction="column" spacing={2} marginTop={1} marginLeft={5} marginBottom={15}>
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR_TYPES.BRAND')} required={true}/>
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
                                                                marginRight: 3,
                                                                "&.Mui-focused, &.MuiFormLabel-filled": {
                                                                    transform: 'translate(14px, -6px) scale(0.75)', // Scaled position when focused
                                                                },
                                                            }}
                                                        >{t('CAR_TYPES.BRAND')}</InputLabel>
                                                        <Select
                                                            id="brand"
                                                            placeholder={t('CAR_TYPES.BRAND')}
                                                            name='brand'
                                                            label={t('CAR_TYPES.BRAND')}
                                                            data-testid='brand'
                                                            disabled={inputDisabled}
                                                            required
                                                            value={values.design ?? ''}
                                                            onChange={handleChange('brand')}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <ClearIcon
                                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                                            onClick={() => setValues({...values, brand: '' })}
                                                                        />
                                                                    </InputAdornment>
                                                                )
                                                            }}
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
                                                            {/*Object.values(genderList).map((gender) => (
                                                            <MenuItem key={gender.value} value={gender.value}>
                                                                {gender.label}
                                                            </MenuItem>
                                                        ))*/}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR_TYPES.CAR_TYPE_NAME')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="typeName"
                                                            placeholder='Példa Éva'
                                                            name='typeName'
                                                            label={t('CAR_TYPES.CAR_TYPE_NAME')}
                                                            value={values.typeName}
                                                            onChange={handleChange('typeName')}
                                                            data-testid='car-type-name-input'
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
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR_TYPES.DESIGN')} required={true}/>
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
                                                                marginRight: 3,
                                                                "&.Mui-focused, &.MuiFormLabel-filled": {
                                                                    transform: 'translate(14px, -6px) scale(0.75)', // Scaled position when focused
                                                                },
                                                            }}
                                                        >{t('CAR_TYPES.DESIGN')}</InputLabel>
                                                        <Select
                                                            id="design"
                                                            placeholder={t('CAR_TYPES.DESIGN')}
                                                            name='design'
                                                            label={t('CAR_TYPES.DESIGN')}
                                                            data-testid='design'
                                                            disabled={inputDisabled}
                                                            required
                                                            value={values.design ?? ''}
                                                            onChange={handleChange('design')}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <ClearIcon
                                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                                            onClick={() => setValues({...values, design: '' })}
                                                                        />
                                                                    </InputAdornment>
                                                                )
                                                            }}
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
                                                            {/*Object.values(genderList).map((gender) => (
                                                            <MenuItem key={gender.value} value={gender.value}>
                                                                {gender.label}
                                                            </MenuItem>
                                                        ))*/}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR_TYPES.PERFORMANCE')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="performance"
                                                            placeholder='Példa Éva'
                                                            name='performance'
                                                            label={t('CAR_TYPES.PERFORMANCE')}
                                                            value={values.performance}
                                                            onChange={handleChange('performance')}
                                                            data-testid='performance-input'
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
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR_TYPES.OWN_WEIGHT')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="selfWeight"
                                                            placeholder='Példa Éva'
                                                            name='selfWeight'
                                                            label={t('CAR_TYPES.OWN_WEIGHT')}
                                                            value={values.selfWeight}
                                                            onChange={handleChange('selfWeight')}
                                                            data-testid='self-weight-input'
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
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR_TYPES.USEFUL_WEIGHT')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="usefulWeight"
                                                            placeholder='Példa Éva'
                                                            name='usefulWeight'
                                                            label={t('CAR_TYPES.USEFUL_WEIGHT')}
                                                            value={values.usefulWeight}
                                                            onChange={handleChange('usefulWeight')}
                                                            data-testid='useful-weight-input'
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
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR_TYPES.NUMBER_OF_SEATS')} required={true}/>
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
                                                                marginRight: 3,
                                                                "&.Mui-focused, &.MuiFormLabel-filled": {
                                                                    transform: 'translate(14px, -6px) scale(0.75)', // Scaled position when focused
                                                                },
                                                            }}
                                                        >{t('CAR_TYPES.NUMBER_OF_SEATS')}</InputLabel>
                                                        <Select
                                                            id="numberOfSeats"
                                                            placeholder={t('CAR_TYPES.NUMBER_OF_SEATS')}
                                                            name='numberOfSeats'
                                                            label={t('CAR_TYPES.NUMBER_OF_SEATS')}
                                                            data-testid='numberOfSeats'
                                                            disabled={inputDisabled}
                                                            required
                                                            value={values.numberOfSeats ?? ''}
                                                            onChange={handleChange('numberOfSeats')}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <ClearIcon
                                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                                            onClick={() => setValues({...values, numberOfSeats: '' })}
                                                                        />
                                                                    </InputAdornment>
                                                                )
                                                            }}
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
                                                            {/*Object.values(genderList).map((gender) => (
                                                            <MenuItem key={gender.value} value={gender.value}>
                                                                {gender.label}
                                                            </MenuItem>
                                                        ))*/}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR_TYPES.FUEL')} required={true}/>
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
                                                                marginRight: 3,
                                                                "&.Mui-focused, &.MuiFormLabel-filled": {
                                                                    transform: 'translate(14px, -6px) scale(0.75)', // Scaled position when focused
                                                                },
                                                            }}
                                                        >{t('CAR_TYPES.FUEL')}</InputLabel>
                                                        <Select
                                                            id="fuel"
                                                            placeholder={t('CAR_TYPES.FUEL')}
                                                            name='fuel'
                                                            label={t('CAR_TYPES.FUEL')}
                                                            data-testid='fuel'
                                                            disabled={inputDisabled}
                                                            required
                                                            value={values.fuel ?? ''}
                                                            onChange={handleChange('fuel')}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <ClearIcon
                                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                                            onClick={() => setValues({...values, fuel: '' })}
                                                                        />
                                                                    </InputAdornment>
                                                                )
                                                            }}
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
                                                            {/*Object.values(genderList).map((gender) => (
                                                            <MenuItem key={gender.value} value={gender.value}>
                                                                {gender.label}
                                                            </MenuItem>
                                                        ))*/}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR_TYPES.VONTATAS')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="vontatas"
                                                            placeholder='Példa Éva'
                                                            name='vontatas'
                                                            label={t('CAR_TYPES.VONTATAS')}
                                                            value={values.vontatas}
                                                            onChange={handleChange('vontatas')}
                                                            data-testid='vontatas-input'
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
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR_TYPES.HEIGHT')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="height"
                                                            placeholder='Példa Éva'
                                                            name='height'
                                                            label={t('CAR_TYPES.HEIGHT')}
                                                            value={values.height}
                                                            onChange={handleChange('height')}
                                                            data-testid='height-input'
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
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR_TYPES.SZELESSEG')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="szelesseg"
                                                            placeholder='Példa Éva'
                                                            name='szelesseg'
                                                            label={t('CAR_TYPES.SZELESSEG')}
                                                            value={values.szelesseg}
                                                            onChange={handleChange('szelesseg')}
                                                            data-testid='szelesseg-input'
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
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR_TYPES.LONG')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="long"
                                                            placeholder='Példa Éva'
                                                            name='long'
                                                            label={t('CAR_TYPES.LONG')}
                                                            value={values.long}
                                                            onChange={handleChange('long')}
                                                            data-testid='long-input'
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
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR_TYPES.CAR_TYPE_OF_TRANSPORTATION')} required={true}/>
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
                                                                marginRight: 3,
                                                                "&.Mui-focused, &.MuiFormLabel-filled": {
                                                                    transform: 'translate(14px, -6px) scale(0.75)', // Scaled position when focused
                                                                },
                                                            }}
                                                        >{t('CAR_TYPES.CAR_TYPE_OF_TRANSPORTATION')}</InputLabel>
                                                        <Select
                                                            id="carTypeOfTransportationId"
                                                            placeholder={t('CAR_TYPES.CAR_TYPE_OF_TRANSPORTATION')}
                                                            name='carTypeOfTransportationId'
                                                            label={t('CAR_TYPES.CAR_TYPE_OF_TRANSPORTATION')}
                                                            data-testid='carTypeOfTransportationId'
                                                            disabled={inputDisabled}
                                                            required
                                                            value={values.carTypeOfTransportationId ?? ''}
                                                            onChange={handleChange('carTypeOfTransportationId')}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <ClearIcon
                                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                                            onClick={() => setValues({...values, carTypeOfTransportationId: '' })}
                                                                        />
                                                                    </InputAdornment>
                                                                )
                                                            }}
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
                                                            {/*Object.values(genderList).map((gender) => (
                                                            <MenuItem key={gender.value} value={gender.value}>
                                                                {gender.label}
                                                            </MenuItem>
                                                        ))*/}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: `${theme.palette.component.medium}`,
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                    paddingTop: '10px',
                                    paddingBottom: '40px',
                                    height: '100%',
                                    borderRadius: '19px',
                                    boxShadow: `0 0 10px rgba(0,0,0,0.3)`,
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'start',
                                    marginTop: 10
                                }}
                            >
                                <Headline text={t('CAR.CAR_DATA')} />
                                <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: 0, marginRight: 5}}>
                                    <Grid item container direction="column" spacing={2} marginTop={1} marginLeft={5} marginBottom={15}>
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR.NAME')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="name"
                                                            placeholder='Példa Éva'
                                                            name='name'
                                                            label={t('CAR.NAME')}
                                                            value={values.name}
                                                            onChange={handleChange('name')}
                                                            data-testid='name-input'
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
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR.TYPE')} required={true}/>
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
                                                                marginRight: 3,
                                                                "&.Mui-focused, &.MuiFormLabel-filled": {
                                                                    transform: 'translate(14px, -6px) scale(0.75)', // Scaled position when focused
                                                                },
                                                            }}
                                                        >{t('CAR.TYPE')}</InputLabel>
                                                        <Select
                                                            id="type"
                                                            placeholder={t('CAR.TYPE')}
                                                            name='type'
                                                            label={t('CAR.TYPE')}
                                                            data-testid='type'
                                                            disabled={inputDisabled}
                                                            required
                                                            value={values.type ?? ''}
                                                            onChange={handleChange('type')}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <ClearIcon
                                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                                            onClick={() => setValues({...values, type: '' })}
                                                                        />
                                                                    </InputAdornment>
                                                                )
                                                            }}
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
                                                            {/*Object.values(genderList).map((gender) => (
                                                                <MenuItem key={gender.value} value={gender.value}>
                                                                    {gender.label}
                                                                </MenuItem>
                                                            ))*/}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR.LICENCE_PLATE')} required={true}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="licencePlate"
                                                            placeholder='Példa Éva'
                                                            name='licencePlate'
                                                            label={t('CAR.LICENCE_PLATE')}
                                                            value={values.licencePlate}
                                                            onChange={handleChange('licencePlate')}
                                                            data-testid='licence-plate-input'
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
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR.NUMBER_OF_REGISTRATION_LICENCE')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <DatePicker
                                                            name='numberOfRegistrationLicence'
                                                            data-testid='number-of-registration-licence-input'
                                                            //disabled={inputDisabled}
                                                            value={values.numberOfRegistrationLicence}
                                                            onChange={handleDateChange('numberOfRegistrationLicence')}
                                                            //dateFormat="dd/MM/yyyy"
                                                            className={'date-picker-class'}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR.CHASSIS_NUMBER')} required={true}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="chassisNumber"
                                                            placeholder='Példa Éva'
                                                            name='chassisNumber'
                                                            label={t('CAR.CHASSIS_NUMBER')}
                                                            value={values.chassisNumber}
                                                            onChange={handleChange('chassisNumber')}
                                                            data-testid='chassis-number-input'
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
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR.YEAR_OF_PRODUCTION')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="yearOfProduction"
                                                            placeholder='Példa Éva'
                                                            name='yearOfProduction'
                                                            label={t('CAR.YEAR_OF_PRODUCTION')}
                                                            value={values.yearOfProduction}
                                                            onChange={handleChange('yearOfProduction')}
                                                            data-testid='year-of-production-input'
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
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR.DATE_OF_FIRST_REGISTRATION')} required={true}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
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
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR.DATE_OF_DATABASE_REGISTRATION')} required={true}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <DatePicker
                                                            name='dateOfDatabaseRegistration'
                                                            data-testid='date-of-database-registration-input'
                                                            //disabled={inputDisabled}
                                                            value={values.dateOfDatabaseRegistration}
                                                            onChange={handleDateChange('dateOfDatabaseRegistration')}
                                                            //dateFormat="dd/MM/yyyy"
                                                            className={'date-picker-class'}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR.DATE_OF_LAST_TECHNICAL_EXAMINATION')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <DatePicker
                                                            name='dateOfLastTechnicalExamination'
                                                            data-testid='date-of-last-technical-examination-input'
                                                            //disabled={inputDisabled}
                                                            value={values.dateOfLastTechnicalExamination}
                                                            onChange={handleDateChange('dateOfLastTechnicalExamination')}
                                                            //dateFormat="dd/MM/yyyy"
                                                            className={'date-picker-class'}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR.DATE_OF_LAST_SERVICE')} required={true}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <DatePicker
                                                            name='dateOfLastService'
                                                            data-testid='date-of-last-service-input'
                                                            //disabled={inputDisabled}
                                                            value={values.dateOfLastService}
                                                            onChange={handleDateChange('dateOfLastService')}
                                                            //dateFormat="dd/MM/yyyy"
                                                            className={'date-picker-class'}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR.TOTAL_DRIVEN_KM')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="totalDrivenKm"
                                                            placeholder='Példa Éva'
                                                            name='totalDrivenKm'
                                                            //label={t('CAR.TOTAL_DRIVEN_KM')}
                                                            value={values.totalDrivenKm}
                                                            onChange={handleChange('totalDrivenKm')}
                                                            data-testid='total-driven-km-input'
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
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('CAR.TOTAL_TRANSPORT')} required={true}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="totalTransport"
                                                            placeholder='Példa Éva'
                                                            name='totalTransport'
                                                            //label={t('CAR.TOTAL_TRANSPORT')}
                                                            value={values.totalTransport}
                                                            onChange={handleChange('totalTransport')}
                                                            data-testid='total-transport-input'
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
                                    </Grid>
                                    <Box sx={{
                                        position: "absolute",
                                        bottom: 20,
                                        right: -380,
                                        overflow: "hidden"
                                    }}>
                                        <img
                                            src={Van}
                                            style={{ height: "45%", width: "45%", objectFit: "cover", objectPosition: "right"}}
                                            alt="van"
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        color="error"
                        onClick={() => {
                            modal.reject();
                            modal.remove();
                        }}
                        data-testid="cancel-button"
                        sx={cancelTitleStyle}
                    >
                        {t('TEXT.CANCEL')}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            //onSubmit();
                            modal.remove();
                        }}
                        data-testid="confirm-button"
                        sx={saveTitleStyle}
                    >
                        {props.acceptText}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
);

export default NewCarAddDialog;
