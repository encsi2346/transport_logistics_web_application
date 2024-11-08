import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Grid,
    IconButton,
    InputAdornment, InputLabel, Select, TextField
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
import React, {useEffect, useState} from "react";
import NormalText from "../../components/text/NormalText";
import ClearIcon from "@mui/icons-material/Clear";

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

const NewRequestAddDialog = NiceModal.create(
    (props: { title: string; acceptText: string; defaultSelected: GridSelectionModel; handleEmployeeAdded: () => void }) => {
        const modal = useModal();
        const { t } = useTypeSafeTranslation();
        const { id } = useParams();
        const navigate = useNavigate();
        const [inputDisabled, setInputDisabled] = useState(false); //isInputDisabled
        const [isEditing, setIsEditing] = useState(true);
        const [requestStatusList, setRequestStatusList] = useState(true);
        const [productStatusList, setProductStatusList] = useState([]);
        const [values, setValues] = useState({
            requestId: '',
            title: '',
            typeOfRequest: '',
            selectedDate: '',
            reason: '',
            status: '',
            answerId: '',
            userId: '',
        });

        const handleRequestStatusList = async () => {
            const getResponse = await fetch(
                "http://localhost:3001/api/requestStatus",
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getRequestStatusList = await getResponse.json();
            //const getStatus = getResponse.status;
            console.log('RequestStatus', getRequestStatusList);

            const formattedRequestStatusList = getRequestStatusList.map(requestStatus => ({
                value: requestStatus,
                label: requestStatus.charAt(0).toUpperCase() + requestStatus.slice(1)
            }));
            console.log('formattedRequestStatusList', formattedRequestStatusList);
            setRequestStatusList(formattedRequestStatusList);
        }

        useEffect(() => {
            handleRequestStatusList();
        }, [])

        const getRequest = async (id: string) => {
            try {
                const getRequestResponse = await fetch(
                    `http://localhost:3001/api/requests/${id}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json"},
                    }
                );
                const getRequestData = await getRequestResponse.json();
                const getStatus = getRequestResponse.status;
                console.log('getRequestData', getRequestData);
                console.log('getUserStatus', getStatus);
                //setCar(getCarData);
            } catch (error) {
                console.error('Error get request:', error);
            }
        }

        const createRequest = async (data: any) => {
            try {
                const createRequestResponse = await fetch(
                    `http://localhost:3001/api/requests/addRequest`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify(data),
                    }
                );
                const getRequestData = await createRequestResponse.json();
                const getStatus = createRequestResponse.status;
                console.log('getRequestData', getRequestData);
                console.log('getUserStatus', getStatus);
                //setCar(getCarData);
                return getRequestData;
            } catch (error) {
                console.error('Error creating request:', error);
            }
        };

        const updateRequest = async (id: string, data: any) => {
            try {
                const updatedRequestResponse = await fetch(
                    `http://localhost:3001/api/requests/${id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify(data),
                    }
                );
                const getRequestData = await updatedRequestResponse.json();
                const getStatus = updatedRequestResponse.status;
                console.log('getRequestData', getRequestData);
                console.log('getUserStatus', getStatus);
                //setCar(getCarData);
                return getRequestData;
            } catch (error) {
                console.error(`Error updating request with ID ${id}:`, error);
            }
        };

        const deleteRequest = async (id: string) => {
            //TODO
            try {
                const deleteRequestResponse = await fetch(
                    `http://localhost:3001/api/requests/${id}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json"},
                    }
                );
                const getRequestData = await deleteRequestResponse.json();
                const getStatus = deleteRequestResponse.status;
                console.log('getRequestData', getRequestData);
                console.log('getUserStatus', getStatus);
                //setCartTypes(getCarTypesData);
                return getRequestData;
            } catch (error) {
                console.error(`Error deleting request with ID ${id}:`, error);
            }
        };

        const handleSubmit = async (e: any) => {
            e.preventDefault();

            let submitData = data as any;
            console.log('isEditing', isEditing);
            console.log('submitData', submitData);
            if (isEditing) {
                setInputDisabled(true);
                updateRequest(id, submitData);
            } else {
                setInputDisabled(true);
                createRequest(submitData);
            }
        };

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
                    <Box>
                        <BackgroundCard>
                            <form
                                autoComplete='off'
                                onSubmit={(e) => handleSubmit(e)}
                            >
                                <DataCard>
                                    <Grid item container direction="column" spacing={2}>
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('REQUEST.TITLE')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="title"
                                                            placeholder='Példa Éva'
                                                            name='title'
                                                            label={t('REQUEST.TITLE')}
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
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('REQUEST.TYPE_OF_REQUEST')} required={true}/>
                                                    <FormControl>
                                                        <InputLabel>{t('REQUEST.TYPE_OF_REQUEST')}</InputLabel>
                                                        <Select
                                                            id="typeOfRequest"
                                                            placeholder={t('REQUEST.TYPE_OF_REQUEST')}
                                                            name='typeOfRequest'
                                                            label={t('REQUEST.TYPE_OF_REQUEST')}
                                                            data-testid='typeOfRequest'
                                                            disabled={inputDisabled}
                                                            required
                                                            value={values.typeOfRequest ?? ''}
                                                            onChange={handleChange('typeOfRequest')}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <ClearIcon
                                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                                            onClick={() => setValues({...values, typeOfRequest: '' })}
                                                                        />
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                            sx={{
                                                                backgroundColor: `#ffffff`,
                                                                borderRadius: '8px',
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
                                                    <NormalText text={t('REQUEST.SELECTED_DATE')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="selectedDate"
                                                            placeholder='Példa Éva'
                                                            name='selectedDate'
                                                            label={t('REQUEST.SELECTED_DATE')}
                                                            value={values.selectedDate}
                                                            onChange={handleChange('selectedDate')}
                                                            data-testid='selected-date-input'
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
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('REQUEST.REASON')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="reason"
                                                            placeholder='Példa Éva'
                                                            name='reason'
                                                            label={t('REQUEST.REASON')}
                                                            value={values.reason}
                                                            onChange={handleChange('reason')}
                                                            data-testid='reason-input'
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
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('REQUEST.STATUS')} required={true}/>
                                                    <FormControl>
                                                        <InputLabel>{t('REQUEST.STATUS')}</InputLabel>
                                                        <Select
                                                            id="status"
                                                            placeholder={t('REQUEST.STATUS')}
                                                            name='status'
                                                            label={t('REQUEST.STATUS')}
                                                            data-testid='status'
                                                            disabled={inputDisabled}
                                                            required
                                                            value={values.status ?? ''}
                                                            onChange={handleChange('status')}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <ClearIcon
                                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                                            onClick={() => setValues({...values, status: '' })}
                                                                        />
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                            sx={{
                                                                backgroundColor: `#ffffff`,
                                                                borderRadius: '8px',
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
                                                    <NormalText text={t('REQUEST.ANSWER')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="answerId"
                                                            placeholder='Példa Éva'
                                                            name='answerId'
                                                            label={t('REQUEST.ANSWER')}
                                                            value={values.answerId}
                                                            onChange={handleChange('answerId')}
                                                            data-testid='answer-id-input'
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
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('REQUEST.USER')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="userId"
                                                            placeholder='Példa Éva'
                                                            name='userId'
                                                            label={t('REQUEST.USER')}
                                                            value={values.userId}
                                                            onChange={handleChange('userId')}
                                                            data-testid='user-id-input'
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

export default NewRequestAddDialog;
