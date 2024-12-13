import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Grid,
    IconButton,
    InputAdornment, InputLabel, Select, TextField, useTheme
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
import DataCard from "../../components/layout/DataCard";
import React, {useEffect, useState} from "react";
import NormalText from "../../components/text/NormalText";
import ClearIcon from "@mui/icons-material/Clear";
import DatePicker from "react-datepicker";
import moment from "moment/moment";

import "react-datepicker/dist/react-datepicker.css";
import "./NewDocumentAddDialog.css";
import DocumentImage from "../../assets/document.png";

function convertToBase64(file){
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

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

const NewDocumentAddDialog = NiceModal.create(
    (props: { title: string; acceptText: string; defaultSelected: GridSelectionModel; handleEmployeeAdded: () => void }) => {
        const modal = useModal();
        const theme = useTheme();
        const { t } = useTypeSafeTranslation();
        const { id } = useParams();
        const navigate = useNavigate();
        const [inputDisabled, setInputDisabled] = useState(false); //isInputDisabled
        const [isEditing, setIsEditing] = useState(true);
        const [values, setValues] = useState({
            documentId: '',
            documentType: '',
            title: null,
            timeStamp: '',
            status: '',
            creator: '',
            size: '',
        });


        const [documentTypeList, setDocumentTypeList] = useState([]);
        const [documentStatusList, setDocumentStatusList] = useState([]);

        const handleDocumentTypeList = async () => {
            const getResponse = await fetch(
                "http://localhost:3001/api/documentTypes",
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getDocumentTypeList = await getResponse.json();
            //const getStatus = getResponse.status;
            console.log('DocumentTypes', getDocumentTypeList);

            const formattedDocumentTypeList = getDocumentTypeList.map(documentType => ({
                value: documentType,
                label: documentType.charAt(0).toUpperCase() + documentType.slice(1)
            }));
            console.log('formattedDocumentTypeList', formattedDocumentTypeList);
            setDocumentTypeList(formattedDocumentTypeList);
        }

        useEffect(() => {
            handleDocumentTypeList();
        }, [])

        const handleDocumentStatusList = async () => {
            const getResponse = await fetch(
                "http://localhost:3001/api/documentStatus",
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getDocumentStatusList = await getResponse.json();
            //const getStatus = getResponse.status;
            console.log('DocumentStatuses', getDocumentStatusList);

            const formattedDocumentStatusList = getDocumentStatusList.map(documentStatus => ({
                value: documentStatus,
                label: documentStatus.charAt(0).toUpperCase() + documentStatus.slice(1)
            }));
            console.log('formattedDocumentStatusList', formattedDocumentStatusList);
            setDocumentStatusList(formattedDocumentStatusList);
        }

        useEffect(() => {
            handleDocumentStatusList();
        }, [])

        const getDocuments = async () => {
            try {
                const getDocumentsResponse = await fetch(
                    `http://localhost:3001/api/documents`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json"},
                    }
                );
                const getDocumentsData = await getDocumentsResponse.json();
                const getStatus = getDocumentsResponse.status;
                console.log('getDocumentsData', getDocumentsData);
                console.log('getUserStatus', getStatus);
                //setDocuments(getDocumentsData);
            } catch (error) {
                console.error('Error get all document:', error);
            }
        }

        const createDocument = async (data: any) => {
            try {
                const createDocumentResponse = await fetch(
                    `http://localhost:3001/api/documents/addDocument`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify(data),
                    }
                );
                const getDocumentData = await createDocumentResponse.json();
                const getStatus = createDocumentResponse.status;
                console.log('getDocumentData', getDocumentData);
                console.log('getUserStatus', getStatus);
                //setCar(getCarData);
                return getDocumentData;
            } catch (error) {
                console.error('Error creating document:', error);
            }
        };

        const updateDocument = async (id: string, data: any) => {
            try {
                const updatedDocumentResponse = await fetch(
                    `http://localhost:3001/api/documents/${id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify(data),
                    }
                );
                const getDocumentData = await updatedDocumentResponse.json();
                const getStatus = updatedDocumentResponse.status;
                console.log('getDocumentData', getDocumentData);
                console.log('getUserStatus', getStatus);
                //setCar(getCarData);
                return getDocumentData;
            } catch (error) {
                console.error(`Error updating document with ID ${id}:`, error);
            }
        };

        const deleteDocument = async (id: string) => {
            //TODO
            try {
                const deleteDocumentResponse = await fetch(
                    `http://localhost:3001/api/documents/${id}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json"},
                    }
                );
                const getDocumentData = await deleteDocumentResponse.json();
                const getStatus = deleteDocumentResponse.status;
                console.log('getDocumentData', getDocumentData);
                console.log('getUserStatus', getStatus);
                //setCartTypes(getCarTypesData);
                return getDocumentData;
            } catch (error) {
                console.error(`Error deleting document with ID ${id}:`, error);
            }
        };


        const handleSubmit = async (e: any) => {
            e.preventDefault();

            let submitData = data as any;
            console.log('isEditing', isEditing);
            console.log('submitData', submitData);
            if (isEditing) {
                setInputDisabled(true);
                updateDocument(id, submitData);
            } else {
                setInputDisabled(true);
                createDocument(submitData);
            }
        };

        const handleChange = (prop: any) => (event: any) => {
            setValues({...values, [prop]: event.target.value });
        };

        const handleFileUpload = async (e) => {
            const file = e.target.files[0];
            const base64 = await convertToBase64(file);
            console.log(base64);
            setValues({...values, title : base64 });
        }

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
                            height: 550,
                            width: 800,
                            borderRadius: '19px'
                        }}
                    >
                            <form
                                autoComplete='off'
                                onSubmit={(e) => handleSubmit(e)}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: `${theme.palette.component.medium}`,
                                        paddingLeft: '10px',
                                        paddingRight: '10px',
                                        paddingTop: '10px',
                                        paddingBottom: '1px',
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
                                                    <NormalText text={t('DOCUMENTS.DOCUMENT_TYPE')} required={true}/>
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
                                                        >{t('DOCUMENTS.DOCUMENT_TYPE')}</InputLabel>
                                                        <Select
                                                            id="documentType"
                                                            placeholder={t('DOCUMENTS.DOCUMENT_TYPE')}
                                                            name='documentType'
                                                            //label={t('DOCUMENTS.DOCUMENT_TYPE')}
                                                            data-testid='documentType'
                                                            disabled={inputDisabled}
                                                            required
                                                            value={values.documentType ?? ''}
                                                            onChange={handleChange('documentType')}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <ClearIcon
                                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                                            onClick={() => setValues({
                                                                                ...values,
                                                                                documentType: ''
                                                                            })}
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
                                            {/*<Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('DOCUMENTS.TITLE')}/>
                                                    <FormControl required fullWidth>
                                                        <TextField
                                                            id="title"
                                                            placeholder='Példa Éva'
                                                            name='title'
                                                            label={t('DOCUMENTS.TITLE')}
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
                                            </Grid>*/}
                                        </Grid>
                                        <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                            <Grid item xs={4} md={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'start'
                                                }}>
                                                    <NormalText text={t('DOCUMENTS.TIMESTAMP')} required={true}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <DatePicker
                                                            name='timeStamp'
                                                            data-testid='timestamp-input'
                                                            //disabled={inputDisabled}
                                                            value={values.timeStamp}
                                                            onChange={handleDateChange('timeStamp')}
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
                                                    <NormalText text={t('DOCUMENTS.STATUS')} required={true}/>
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
                                                        >{t('DOCUMENTS.STATUS')}</InputLabel>
                                                        <Select
                                                            id="status"
                                                            placeholder={t('DOCUMENTS.STATUS')}
                                                            name='status'
                                                            label={t('DOCUMENTS.STATUS')}
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
                                                                            onClick={() => setValues({
                                                                                ...values,
                                                                                status: ''
                                                                            })}
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
                                                    <NormalText text={t('DOCUMENTS.CREATOR')} required={true}/>
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
                                                        >{t('DOCUMENTS.CREATOR')}</InputLabel>
                                                        <Select
                                                            id="creator"
                                                            placeholder={t('DOCUMENTS.CREATOR')}
                                                            name='creator'
                                                            label={t('DOCUMENTS.CREATOR')}
                                                            data-testid='creator'
                                                            disabled={inputDisabled}
                                                            required
                                                            value={values.creator ?? ''}
                                                            onChange={handleChange('creator')}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <ClearIcon
                                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                                            onClick={() => setValues({
                                                                                ...values,
                                                                                creator: ''
                                                                            })}
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
                                                    <NormalText text={t('DOCUMENTS.SIZE')}/>
                                                    <FormControl required
                                                         sx={{
                                                             width: { xs: '100%', sm: '250px' },
                                                             backgroundColor: 'rgb(255, 255, 255)',
                                                             borderRadius: '8px',
                                                         }}
                                                    >
                                                        <TextField
                                                            id="size"
                                                            placeholder='Példa Éva'
                                                            name='size'
                                                            label={t('DOCUMENTS.SIZE')}
                                                            value={values.size}
                                                            onChange={handleChange('size')}
                                                            data-testid='size-input'
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
                                                    alignItems: 'start',
                                                    marginTop: 5
                                                }}>
                                                    <input
                                                        type="file"
                                                        label="Title"
                                                        name="title"
                                                        id='file-upload'
                                                        accept='.doc, .docx, .pdf'
                                                        onChange={(e) => handleFileUpload(e)}
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: 10,
                                        right: 130,
                                    }}>
                                        <img
                                            src={DocumentImage}
                                            style={{ height: "180px", width: "180px", objectFit: "cover"}}
                                            alt="van"
                                        />
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

export default NewDocumentAddDialog;
