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
    TextField,
} from '@mui/material';
import type {SxProps, Theme} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import BackgroundCard from "../../components/layout/BackgroundCard";
import { useTypeSafeTranslation } from '../../components/inputfield/hooks/useTypeSafeTranslation';
import DataCard from "@/components/layout/DataCard";
import React, {useState} from "react";
import NormalText from "../../components/text/NormalText";

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

const ServiceAppointmentAddDialog = NiceModal.create(
    (props: { title: string; acceptText: string; resolveText: string }) => {
        const modal = useModal();
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
                            maxWidth: "700px",
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
                    <Box>
                        <BackgroundCard>
                            <form autoComplete='off'>
                                <DataCard>
                                    <Grid item container direction="column" spacing={2} m={10}>
                                        <Grid item container direction="column" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('SERVICE_APPOINTMENTS.APPOINTMENT')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="appointment"
                                                            placeholder={t('SERVICE_APPOINTMENTS.APPOINTMENT')}
                                                            name='appointment'
                                                            label={t('SERVICE_APPOINTMENTS.APPOINTMENT')}
                                                            value={values.appointment}
                                                            onChange={handleChange('appointment')}
                                                            data-testid='appointment-input'
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
                                        <Grid item container direction="column" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('SERVICE_APPOINTMENTS.NAME_OF_SERVICE_COMPANY')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="nameOfServiceCompany"
                                                            placeholder={t('SERVICE_APPOINTMENTS.NAME_OF_SERVICE_COMPANY')}
                                                            name='nameOfServiceCompany'
                                                            label={t('SERVICE_APPOINTMENTS.NAME_OF_SERVICE_COMPANY')}
                                                            value={values.nameOfServiceCompany}
                                                            onChange={handleChange('nameOfServiceCompany')}
                                                            data-testid='name-of-service-company-input'
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
                                        <Grid item container direction="column" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('SERVICE_APPOINTMENTS.DRIVER_NAME')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="driverName"
                                                            placeholder={t('SERVICE_APPOINTMENTS.DRIVER_NAME')}
                                                            name='driverName'
                                                            label={t('SERVICE_APPOINTMENTS.DRIVER_NAME')}
                                                            value={values.driverName}
                                                            onChange={handleChange('driverName')}
                                                            data-testid='driver-name-input'
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
                                        <Grid item container direction="column" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('SERVICE_APPOINTMENTS.DATE_OF_RECORDING')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="dateOfRecording"
                                                            placeholder={t('SERVICE_APPOINTMENTS.DATE_OF_RECORDING')}
                                                            name='dateOfRecording'
                                                            label={t('SERVICE_APPOINTMENTS.DATE_OF_RECORDING')}
                                                            value={values.dateOfRecording}
                                                            onChange={handleChange('dateOfRecording')}
                                                            data-testid='date-of-recording-input'
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
                                        <Grid item container direction="column" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('SERVICE_APPOINTMENTS.GROSS_SUM_PRICE')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="grossSumPrice"
                                                            placeholder={t('SERVICE_APPOINTMENTS.GROSS_SUM_PRICE')}
                                                            name='grossSumPrice'
                                                            label={t('SERVICE_APPOINTMENTS.GROSS_SUM_PRICE')}
                                                            value={values.grossSumPrice}
                                                            onChange={handleChange('grossSumPrice')}
                                                            data-testid='gross-sum-price-input'
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
                                        <Grid item container direction="column" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('SERVICE_APPOINTMENTS.NET_SUM_PRICE')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="netSumPrice"
                                                            placeholder={t('SERVICE_APPOINTMENTS.NET_SUM_PRICE')}
                                                            name='netSumPrice'
                                                            label={t('SERVICE_APPOINTMENTS.NET_SUM_PRICE')}
                                                            value={values.netSumPrice}
                                                            onChange={handleChange('netSumPrice')}
                                                            data-testid='net-sum-price-input'
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
                                        <Grid item container direction="column" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('SERVICE_APPOINTMENTS.VAT')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="VAT"
                                                            placeholder={t('SERVICE_APPOINTMENTS.VAT')}
                                                            name='VAT'
                                                            label={t('SERVICE_APPOINTMENTS.VAT')}
                                                            value={values.nameOfServiceCompany}
                                                            onChange={handleChange('VAT')}
                                                            data-testid='VAT-input'
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
                                        <Grid item container direction="column" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('SERVICE_APPOINTMENTS.TITLE')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="title"
                                                            placeholder={t('SERVICE_APPOINTMENTS.TITLE')}
                                                            name='title'
                                                            label={t('SERVICE_APPOINTMENTS.TITLE')}
                                                            value={values.title}
                                                            onChange={handleChange('title')}
                                                            data-testid='title-input'
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
                                        <Grid item container direction="column" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('SERVICE_APPOINTMENTS.DESCRIPTION')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="description"
                                                            placeholder={t('SERVICE_APPOINTMENTS.DESCRIPTION')}
                                                            name='description'
                                                            label={t('SERVICE_APPOINTMENTS.DESCRIPTION')}
                                                            value={values.description}
                                                            onChange={handleChange('description')}
                                                            data-testid='description-input'
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
                                        <Grid item container direction="column" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('SERVICE_APPOINTMENTS.REPARATION')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="reparation"
                                                            placeholder={t('SERVICE_APPOINTMENTS.REPARATION')}
                                                            name='reparation'
                                                            label={t('SERVICE_APPOINTMENTS.REPARATION')}
                                                            value={values.reparation}
                                                            onChange={handleChange('reparation')}
                                                            data-testid='reparation-input'
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
                                        <Grid item container direction="column" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('SERVICE_APPOINTMENTS.CAR')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="car"
                                                            placeholder={t('SERVICE_APPOINTMENTS.CAR')}
                                                            name='car'
                                                            label={t('SERVICE_APPOINTMENTS.CAR')}
                                                            value={values.car}
                                                            onChange={handleChange('car')}
                                                            data-testid='car-input'
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
                            </form>
                        </BackgroundCard>
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
