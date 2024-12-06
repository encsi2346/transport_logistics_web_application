import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Grid,
    IconButton,
    InputAdornment, TextField
} from '@mui/material';
import type {SxProps, Theme} from '@mui/material';
import type { GridSelectionModel } from '@mui/x-data-grid';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate, useParams} from "react-router-dom";
import BackgroundCard from "../../components/layout/BackgroundCard";
import { useTypeSafeTranslation } from '../../components/inputField/hooks/useTypeSafeTranslation';
import TextFieldInput from '../../components/inputField/TextFieldInput';
//import DatePickerInput from "../../components/inputField/DatePickerInput";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SelectInput from "../../components/inputField/SelectInput";
import {RequestEditFormSchema, requestEditFormSchema} from "./schemas/request-edit-form-schema";
import DataCard from "@/components/layout/DataCard";
import NormalText from "../../components/text/NormalText";
import React, {useEffect, useState} from "react";

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

const NewTypeOfTransportationAddDialog = NiceModal.create(
    (props: { title: string; acceptText: string; resolveText: string }) => {
        const modal = useModal();
        const { t } = useTypeSafeTranslation();
        const { id } = useParams();
        const navigate = useNavigate();
        const [inputDisabled, setInputDisabled] = useState(false); //isInputDisabled
        const [isEditing, setIsEditing] = useState(true);
        const [productStatusList, setProductStatusList] = useState([]);
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
                            height: "600px",
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
                            <form
                                autoComplete='off'
                                //onSubmit={(e) => handleSubmit(e)}
                            >
                                <DataCard>
                                    <Grid item container direction="column" spacing={2}>
                                        <Grid item container direction="column" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start',
                                                    marginTop: '60px',
                                                    marginBottom: '60px',
                                                    marginLeft: '100px',
                                                    marginRight: '100px'
                                                }}>
                                                    <NormalText text={t('TYPE_OF_TRANSPORTATION.TYPE_OF_TRANSPORTATION_NAME')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="type"
                                                            placeholder={t('TYPE_OF_TRANSPORTATION.TYPE_OF_TRANSPORTATION_NAME')}
                                                            name='type'
                                                            label={t('TYPE_OF_TRANSPORTATION.TYPE_OF_TRANSPORTATION_NAME')}
                                                            value={values.type}
                                                            onChange={handleChange('type')}
                                                            data-testid='type-input'
                                                            required
                                                            sx={{
                                                                backgroundColor: `#ffffff`,
                                                                borderRadius: '13px',
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
                                            {!isEditing && (
                                                <Grid item xs={4} md={5}>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'start',
                                                        marginTop: '30px',
                                                        marginBottom: '30px',
                                                        marginLeft: '100px',
                                                        marginRight: '100px'
                                                    }}>
                                                        <NormalText text={t('TYPE_OF_TRANSPORTATION.TYPE_OF_TRANSPORTATION_NAME')}/>
                                                        <FormControl required fullWidth>
                                                            <TextField
                                                                id="type"
                                                                placeholder={t('TYPE_OF_TRANSPORTATION.TYPE_OF_TRANSPORTATION_NAME')}
                                                                name='type'
                                                                label={t('TYPE_OF_TRANSPORTATION.TYPE_OF_TRANSPORTATION_NAME')}
                                                                value={values.type}
                                                                onChange={handleChange('type')}
                                                                data-testid='type-input'
                                                                required
                                                                sx={{
                                                                    backgroundColor: `#ffffff`,
                                                                    borderRadius: '13px',
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
                                            )}
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

export default NewTypeOfTransportationAddDialog;
