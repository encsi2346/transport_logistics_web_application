import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Grid,
    IconButton,
    InputAdornment, InputLabel, MenuItem, Select, TextField
} from '@mui/material';
import type {SxProps, Theme} from '@mui/material';
import type { GridSelectionModel } from '@mui/x-data-grid';
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useEffect, useState} from "react";
import {carTypeEditFormSchema, CarTypeEditFormSchema} from "./schemas/car-type-edit-form-schema";
import {useNavigate, useParams} from "react-router-dom";
import BackgroundCard from "../../components/layout/BackgroundCard";
import { useTypeSafeTranslation } from '../../components/inputField/hooks/useTypeSafeTranslation';
import TextFieldInput from '../../components/inputField/TextFieldInput';
import SelectInput from "../../components/inputField/SelectInput";
import DataCard from "@/components/layout/DataCard";
import moment from "moment/moment";
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

//TODO: szar az egész zod resolveres dolog

const CompaniesAddDialog = NiceModal.create(
    (props: { title: string; acceptText: string; defaultSelected: GridSelectionModel; handleEmployeeAdded: () => void }) => {
        const modal = useModal();
        const { t } = useTypeSafeTranslation();
        const { id } = useParams();
        const navigate = useNavigate();
        const [inputDisabled, setInputDisabled] = useState(false); //isInputDisabled
        const [isEditing, setIsEditing] = useState(true);

        const methods = useForm<CompanyEditFormSchema>({
            defaultValues: {
                companyId: '',
                companyName: '',
                email: '',
                phoneNumber: '',
                address: '',
                contactPersonName: '',
            },
            resolver: zodResolver(campnyEditFormSchema(isEditing)),
            mode: 'all',
        });
        const {
            control,
            setValue,
            getValues,
            reset,
            handleSubmit,
            formState: { isValid },
        } = methods;

        const getCompany = async (id: string) => {
            try {
                const getCompanyResponse = await fetch(
                    `http://localhost:3001/api/companies/${id}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json"},
                    }
                );
                const getCompanyData = await getCompanyResponse.json();
                const getStatus = getCompanyResponse.status;
                console.log('getCarTypeData', getCompanyData);
                console.log('getUserStatus', getStatus);
                //setCarType(getCarTypeData);
            } catch (error) {
                console.error('Error get type of company:', error);
            }
        }

        const createCompany = async (data: any) => {
            try {
                const createCompanyResponse = await fetch(
                    `http://localhost:3001/api/companies/addCompany`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify(data),
                    }
                );
                const getCompanyData = await createCompanyResponse.json();
                const getStatus = createCompanyResponse.status;
                console.log('getCarTypeData', getCompanyData);
                console.log('getUserStatus', getStatus);
                //setTypeOfTransportation(getTypeOfTransportationData);
                return getCompanyData;
            } catch (error) {
                console.error('Error creating type of company:', error);
            }
        };

        const updateCompany = async (id: string, data: any) => {
            try {
                const updatedCompanyResponse = await fetch(
                    `http://localhost:3001/api/companies/${id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify(data),
                    }
                );
                const getCompanyData = await updatedCompanyResponse.json();
                const getStatus = updatedCompanyResponse.status;
                console.log('getCompanyData', getCompanyData);
                console.log('getUserStatus', getStatus);
                //setCarType(getCarTypeData);
                return getCompanyData;
            } catch (error) {
                console.error(`Error updating type of company with ID ${id}:`, error);
            }
        };

        const deleteCompany = async (id: string) => {
            //TODO
            try {
                const deleteCompanyResponse = await fetch(
                    `http://localhost:3001/api/companies/${id}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json"},
                    }
                );
                const getCompanyData = await deleteCompanyResponse.json();
                const getStatus = deleteCompanyResponse.status;
                console.log('getCompanyData', getCompanyData);
                console.log('getUserStatus', getStatus);
                //setCarType(getCarTypeData);
                return getCompanyData;
            } catch (error) {
                console.error(`Error deleting type of car with ID ${id}:`, error);
            }
        };

        const onSubmit: SubmitHandler<CompanyEditFormSchema> = async (e: any) => {
            e.preventDefault();

            let submitData = data as any;
            console.log('isEditing', isEditing);
            console.log('submitData', submitData);
            if (isEditing) {
                setInputDisabled(true);
                updateCompany(id, submitData);
            } else {
                setInputDisabled(true);
                createCompany(submitData);
            }
        };

        /*const handleChange = (prop: any) => (event: any) => {
            setValues({...values, [prop]: event.target.value });
        };*/

        useEffect(() => {
            const val = getValues();
            console.log('getValues', val);
        }, []);

        return (
            <Dialog
                {...muiDialogV5(modal)}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "1300px",
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
                            <FormProvider children={''} {...methods}>
                                <form
                                    autoComplete='off'
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <DataCard>
                                        <Grid item container direction="column" spacing={2} mt={1} mb={1} mr={5} ml={5}>
                                            <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                                <Grid item xs={4} md={5}>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'start'
                                                    }}>
                                                        <NormalText text={t('COMPANIES.COMPANY_NAME')}/>
                                                        <FormControl required fullWidth>
                                                            <TextField
                                                                id="companyName"
                                                                placeholder={t('COMPANIES.COMPANY_NAME')}
                                                                name='companyName'
                                                                label={t('COMPANIES.COMPANY_NAME')}
                                                                //value={values.companyName}
                                                                //onChange={handleChange('companyName')}
                                                                data-testid='company-name-input'
                                                                required
                                                                errors={isValid}
                                                                control={control}
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
                                                        <NormalText text={t('COMPANIES.EMAIL')}/>
                                                        <FormControl required fullWidth>
                                                            <TextField
                                                                id="email"
                                                                placeholder={t('COMPANIES.EMAIL')}
                                                                name='email'
                                                                label={t('COMPANIES.EMAIL')}
                                                                //value={values.email}
                                                                //onChange={handleChange('email')}
                                                                data-testid='email-input'
                                                                required
                                                                errors={isValid}
                                                                control={control}
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
                                                        <NormalText text={t('COMPANIES.PHONE_NUMBER')}/>
                                                        <FormControl required fullWidth>
                                                            <TextField
                                                                id="phoneNumber"
                                                                placeholder={t('COMPANIES.PHONE_NUMBER')}
                                                                name='phoneNumber'
                                                                label={t('COMPANIES.PHONE_NUMBER')}
                                                                //value={values.phoneNumber}
                                                                //onChange={handleChange('phoneNumber')}
                                                                data-testid='phone-number-input'
                                                                required
                                                                errors={isValid}
                                                                control={control}
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
                                                        <NormalText text={t('COMPANIES.ADDRESS')}/>
                                                        <FormControl required fullWidth>
                                                            <TextField
                                                                id="address"
                                                                placeholder={t('COMPANIES.ADDRESS')}
                                                                name='address'
                                                                label={t('COMPANIES.ADDRESS')}
                                                                //value={values.address}
                                                                //onChange={handleChange('address')}
                                                                data-testid='address-input'
                                                                required
                                                                errors={isValid}
                                                                control={control}
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
                                                        <NormalText text={t('COMPANIES.CONTACT_PERSON_NAME')} required={true}/>
                                                        <FormControl>
                                                            <InputLabel>{t('COMPANIES.CONTACT_PERSON_NAME')}</InputLabel>
                                                            <Select
                                                                id="contactPersonName"
                                                                placeholder={t('COMPANIES.CONTACT_PERSON_NAME')}
                                                                name='contactPersonName'
                                                                label={t('COMPANIES.CONTACT_PERSON_NAME')}
                                                                data-testid='contactPersonName'
                                                                disabled={inputDisabled}
                                                                required
                                                                //value={values.contactPersonName ?? ''}
                                                                //onChange={handleChange('contactPersonName')}
                                                                errors={isValid}
                                                                control={control}
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
                                        </Grid>
                                    </DataCard>
                                </form>
                            </FormProvider>
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

export default CompaniesAddDialog;
