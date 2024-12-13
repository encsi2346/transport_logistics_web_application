import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    TextField, useTheme,
} from '@mui/material';
import type {SxProps, Theme} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import BackgroundCard from "../../components/layout/BackgroundCard";
import { useTypeSafeTranslation } from '../../components/inputfield/hooks/useTypeSafeTranslation';
import DataCard from "@/components/layout/DataCard";
import React, {useState} from "react";
import NormalText from "../../components/text/NormalText";
import Envelope from "../../assets/envelope.png";
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';

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

const iconStyle: SxProps<Theme> = {
    fontSize: 100,
    color: '#A3A3A3',
    width: 130,
    height: 130
}

const ServiceAppointmentAddDialog = NiceModal.create(
    (props: { title: string; acceptText: string; resolveText: string }) => {
        const modal = useModal();
        const theme = useTheme();
        const { t } = useTypeSafeTranslation();
        const { id } = useParams();
        const navigate = useNavigate();
        const [isEditing, setIsEditing] = useState(true);
        const [values, setValues] = useState({
            serviceAppointmentId: '',
            appointment: '',
            nameOfServiceCompany: '',
            driverName: '',
            dateOfRecording: '',
            grossSumPrice: '',
            netSumPrice: '',
            VAT: '',
            title: '',
            description: '',
            reparation: '',
            car: '',
        });

        const handleChange = (prop: any) => (event: any) => {
            setValues({...values, [prop]: event.target.value });
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
                            maxWidth: "1000px",
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
                            width: 800,
                            borderRadius: '19px'
                        }}
                    >
                        <form autoComplete='off'>
                            <Box
                                sx={{
                                    backgroundColor: `${theme.palette.component.medium}`,
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                    paddingTop: '10px',
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
                                <Grid item container direction="column" spacing={2} marginTop={1} marginLeft={5} marginBottom={15}>
                                    <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                        <Grid item xs={4} md={5}>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                alignItems: 'start'
                                            }}>
                                                <NormalText text={t('SERVICE_APPOINTMENTS.APPOINTMENT')}/>
                                                <FormControl required
                                                     sx={{
                                                         width: { xs: '100%', sm: '250px' },
                                                         backgroundColor: 'rgb(255, 255, 255)',
                                                         borderRadius: '8px',
                                                     }}
                                                >
                                                    <TextField
                                                        id="appointment"
                                                        placeholder={t('SERVICE_APPOINTMENTS.APPOINTMENT')}
                                                        name='appointment'
                                                        //label={t('SERVICE_APPOINTMENTS.APPOINTMENT')}
                                                        value={values.appointment}
                                                        onChange={handleChange('appointment')}
                                                        data-testid='appointment-input'
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
                                                <NormalText text={t('SERVICE_APPOINTMENTS.NAME_OF_SERVICE_COMPANY')}/>
                                                <FormControl required
                                                     sx={{
                                                         width: { xs: '100%', sm: '250px' },
                                                         backgroundColor: 'rgb(255, 255, 255)',
                                                         borderRadius: '8px',
                                                     }}
                                                >
                                                    <TextField
                                                        id="nameOfServiceCompany"
                                                        placeholder={t('SERVICE_APPOINTMENTS.NAME_OF_SERVICE_COMPANY')}
                                                        name='nameOfServiceCompany'
                                                        //label={t('SERVICE_APPOINTMENTS.NAME_OF_SERVICE_COMPANY')}
                                                        value={values.nameOfServiceCompany}
                                                        onChange={handleChange('nameOfServiceCompany')}
                                                        data-testid='name-of-service-company-input'
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
                                                <NormalText text={t('SERVICE_APPOINTMENTS.DRIVER_NAME')}/>
                                                <FormControl required
                                                     sx={{
                                                         width: { xs: '100%', sm: '250px' },
                                                         backgroundColor: 'rgb(255, 255, 255)',
                                                         borderRadius: '8px',
                                                     }}
                                                >
                                                    <TextField
                                                        id="driverName"
                                                        placeholder={t('SERVICE_APPOINTMENTS.DRIVER_NAME')}
                                                        name='driverName'
                                                        //label={t('SERVICE_APPOINTMENTS.DRIVER_NAME')}
                                                        value={values.driverName}
                                                        onChange={handleChange('driverName')}
                                                        data-testid='driver-name-input'
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
                                                <NormalText text={t('SERVICE_APPOINTMENTS.DATE_OF_RECORDING')}/>
                                                <FormControl required
                                                     sx={{
                                                         width: { xs: '100%', sm: '250px' },
                                                         backgroundColor: 'rgb(255, 255, 255)',
                                                         borderRadius: '8px',
                                                     }}
                                                >
                                                    <TextField
                                                        id="dateOfRecording"
                                                        placeholder={t('SERVICE_APPOINTMENTS.DATE_OF_RECORDING')}
                                                        name='dateOfRecording'
                                                        //label={t('SERVICE_APPOINTMENTS.DATE_OF_RECORDING')}
                                                        value={values.dateOfRecording}
                                                        onChange={handleChange('dateOfRecording')}
                                                        data-testid='date-of-recording-input'
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
                                                <NormalText text={t('SERVICE_APPOINTMENTS.GROSS_SUM_PRICE')}/>
                                                <FormControl required
                                                     sx={{
                                                         width: { xs: '100%', sm: '250px' },
                                                         backgroundColor: 'rgb(255, 255, 255)',
                                                         borderRadius: '8px',
                                                     }}
                                                >
                                                    <TextField
                                                        id="grossSumPrice"
                                                        placeholder={t('SERVICE_APPOINTMENTS.GROSS_SUM_PRICE')}
                                                        name='grossSumPrice'
                                                        //label={t('SERVICE_APPOINTMENTS.GROSS_SUM_PRICE')}
                                                        value={values.grossSumPrice}
                                                        onChange={handleChange('grossSumPrice')}
                                                        data-testid='gross-sum-price-input'
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
                                                <NormalText text={t('SERVICE_APPOINTMENTS.NET_SUM_PRICE')}/>
                                                <FormControl required
                                                     sx={{
                                                         width: { xs: '100%', sm: '250px' },
                                                         backgroundColor: 'rgb(255, 255, 255)',
                                                         borderRadius: '8px',
                                                     }}
                                                >
                                                    <TextField
                                                        id="netSumPrice"
                                                        placeholder={t('SERVICE_APPOINTMENTS.NET_SUM_PRICE')}
                                                        name='netSumPrice'
                                                        //label={t('SERVICE_APPOINTMENTS.NET_SUM_PRICE')}
                                                        value={values.netSumPrice}
                                                        onChange={handleChange('netSumPrice')}
                                                        data-testid='net-sum-price-input'
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
                                                <NormalText text={t('SERVICE_APPOINTMENTS.VAT')}/>
                                                <FormControl required
                                                     sx={{
                                                         width: { xs: '100%', sm: '250px' },
                                                         backgroundColor: 'rgb(255, 255, 255)',
                                                         borderRadius: '8px',
                                                     }}
                                                >
                                                    <TextField
                                                        id="VAT"
                                                        placeholder={t('SERVICE_APPOINTMENTS.VAT')}
                                                        name='VAT'
                                                        //label={t('SERVICE_APPOINTMENTS.VAT')}
                                                        value={values.nameOfServiceCompany}
                                                        onChange={handleChange('VAT')}
                                                        data-testid='VAT-input'
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
                                                <NormalText text={t('SERVICE_APPOINTMENTS.TITLE')}/>
                                                <FormControl required
                                                     sx={{
                                                         width: { xs: '100%', sm: '250px' },
                                                         backgroundColor: 'rgb(255, 255, 255)',
                                                         borderRadius: '8px',
                                                     }}
                                                >
                                                    <TextField
                                                        id="title"
                                                        placeholder={t('SERVICE_APPOINTMENTS.TITLE')}
                                                        name='title'
                                                        //label={t('SERVICE_APPOINTMENTS.TITLE')}
                                                        value={values.title}
                                                        onChange={handleChange('title')}
                                                        data-testid='title-input'
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
                                                <NormalText text={t('SERVICE_APPOINTMENTS.DESCRIPTION')}/>
                                                <FormControl required
                                                     sx={{
                                                         width: { xs: '100%', sm: '250px' },
                                                         backgroundColor: 'rgb(255, 255, 255)',
                                                         borderRadius: '8px',
                                                     }}
                                                >
                                                    <TextField
                                                        id="description"
                                                        placeholder={t('SERVICE_APPOINTMENTS.DESCRIPTION')}
                                                        name='description'
                                                        //label={t('SERVICE_APPOINTMENTS.DESCRIPTION')}
                                                        value={values.description}
                                                        onChange={handleChange('description')}
                                                        data-testid='description-input'
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
                                                <NormalText text={t('SERVICE_APPOINTMENTS.REPARATION')}/>
                                                <FormControl required
                                                     sx={{
                                                         width: { xs: '100%', sm: '250px' },
                                                         backgroundColor: 'rgb(255, 255, 255)',
                                                         borderRadius: '8px',
                                                     }}
                                                >
                                                    <TextField
                                                        id="reparation"
                                                        placeholder={t('SERVICE_APPOINTMENTS.REPARATION')}
                                                        name='reparation'
                                                        //label={t('SERVICE_APPOINTMENTS.REPARATION')}
                                                        value={values.reparation}
                                                        onChange={handleChange('reparation')}
                                                        data-testid='reparation-input'
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
                                                <NormalText text={t('SERVICE_APPOINTMENTS.CAR')}/>
                                                <FormControl required
                                                     sx={{
                                                         width: { xs: '100%', sm: '250px' },
                                                         backgroundColor: 'rgb(255, 255, 255)',
                                                         borderRadius: '8px',
                                                     }}
                                                >
                                                    <TextField
                                                        id="car"
                                                        placeholder={t('SERVICE_APPOINTMENTS.CAR')}
                                                        name='car'
                                                        //label={t('SERVICE_APPOINTMENTS.CAR')}
                                                        value={values.car}
                                                        onChange={handleChange('car')}
                                                        data-testid='car-input'
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
                                    position: 'absolute',
                                    bottom: 30,
                                    right: 150,
                                }}>
                                    <BuildRoundedIcon sx={iconStyle}/>
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
                        {props.resolveText}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            modal.resolve(values);
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

export default ServiceAppointmentAddDialog;
