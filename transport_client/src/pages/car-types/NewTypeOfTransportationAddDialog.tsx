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
    TextField, useTheme
} from '@mui/material';
import type {SxProps, Theme} from '@mui/material';;
import { useTypeSafeTranslation } from '../../components/inputField/hooks/useTypeSafeTranslation';
import NormalText from "../../components/text/NormalText";
import React, {useState} from "react";
import CardBoardBox from "../../assets/cardboard_box_2.png";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

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
    width: 180,
    height: 180
}

const NewTypeOfTransportationAddDialog = NiceModal.create(
    (props: { title: string; acceptText: string; resolveText: string }) => {
        const modal = useModal();
        const theme = useTheme();
        const { t } = useTypeSafeTranslation();
        const [isEditing, setIsEditing] = useState(true);
        const [values, setValues] = useState({
            carTypeOfTransportationId: '',
            type: '',
            countOfCars: 0
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
                            height: "700px",
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
                            width: 650,
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
                                    <Grid item container direction="column" spacing={2} marginTop={1} marginLeft={5} marginBottom={15}>
                                        <Grid item container direction="column" xs={4} md={10} spacing={5}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('TYPE_OF_TRANSPORTATION.TYPE_OF_TRANSPORTATION_NAME')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="type"
                                                            placeholder={t('TYPE_OF_TRANSPORTATION.TYPE_OF_TRANSPORTATION_NAME')}
                                                            name='type'
                                                            //label={t('TYPE_OF_TRANSPORTATION.TYPE_OF_TRANSPORTATION_NAME')}
                                                            value={values.type}
                                                            onChange={handleChange('type')}
                                                            data-testid='type-input'
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
                                        <Grid item container direction="column" xs={4} md={10} spacing={5}>
                                            {!isEditing && (
                                                <Grid item xs={4} md={5}>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'start'
                                                    }}>
                                                        <NormalText text={t('TYPE_OF_TRANSPORTATION.TYPE_OF_TRANSPORTATION_NAME')}/>
                                                        <FormControl
                                                             sx={{
                                                                 width: { xs: '100%', sm: '250px' },
                                                                 backgroundColor: 'rgb(255, 255, 255)',
                                                                 borderRadius: '8px',
                                                             }}
                                                        >
                                                            <TextField
                                                                id="type"
                                                                placeholder={t('TYPE_OF_TRANSPORTATION.TYPE_OF_TRANSPORTATION_NAME')}
                                                                name='type'
                                                                //label={t('TYPE_OF_TRANSPORTATION.TYPE_OF_TRANSPORTATION_NAME')}
                                                                value={values.type}
                                                                onChange={handleChange('type')}
                                                                data-testid='type-input'
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
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: -5,
                                        right: 60,
                                    }}>
                                        <LocalShippingIcon sx={iconStyle}/>
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

export default NewTypeOfTransportationAddDialog;
