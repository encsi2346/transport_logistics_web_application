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
import {FormProvider, useForm} from "react-hook-form";
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

const CarTypeAddDialog = NiceModal.create(
    (props: { title: string; acceptText: string; defaultSelected: GridSelectionModel; handleEmployeeAdded: () => void }) => {
        const modal = useModal();
        const { t } = useTypeSafeTranslation();
        const { id } = useParams();
        const navigate = useNavigate();
        const [inputDisabled, setInputDisabled] = useState(false); //isInputDisabled
        const [isEditing, setIsEditing] = useState(true);
        const [productStatusList, setProductStatusList] = useState([]);
        /*const [values, setValues] = useState({
            carTypeId: '',
            brand: '',
            typeName: '',
            design: '',
            performance: '',
            selfWeight: '',
            usefulWeight: '',
            numberOfSeats: '',
            fuel: '',
            vontatas: '',
            height: '',
            szelesseg: '',
            long: '',
            carTypeOfTransportationId: '',
        });*/

        const methods = useForm<CarTypeEditFormSchema>({
            defaultValues: {
                carTypeId: '',
                brand: '',
                typeName: '',
                design: '',
                performance: '',
                selfWeight: '',
                usefulWeight: '',
                numberOfSeats: '',
                fuel: '',
                vontatas: '',
                height: '',
                szelesseg: '',
                long: '',
                carTypeOfTransportationId: '',
            },
            resolver: zodResolver(carTypeEditFormSchema(isEditing)),
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

        const getCarType = async (id: string) => {
            try {
                const getCarTypeResponse = await fetch(
                    `http://localhost:3001/api/type-of-transportation/${id}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json"},
                    }
                );
                const getCarTypeData = await getCarTypeResponse.json();
                const getStatus = getCarTypeResponse.status;
                console.log('getCarTypeData', getCarTypeData);
                console.log('getUserStatus', getStatus);
                //setCarType(getCarTypeData);
            } catch (error) {
                console.error('Error get type of car:', error);
            }
        }

        const createCarType = async (data: any) => {
            try {
                const createCarTypeResponse = await fetch(
                    `http://localhost:3001/api/type-of-transportation/addTypeOfTransportation`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify(data),
                    }
                );
                const getCarTypeData = await createCarTypeResponse.json();
                const getStatus = createCarTypeResponse.status;
                console.log('getCarTypeData', getCarTypeData);
                console.log('getUserStatus', getStatus);
                //setTypeOfTransportation(getTypeOfTransportationData);
                return getCarTypeData;
            } catch (error) {
                console.error('Error creating type of car:', error);
            }
        };

        const updateCarType = async (id: string, data: any) => {
            try {
                const updatedCarTypeResponse = await fetch(
                    `http://localhost:3001/api/type-of-transportation/${id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify(data),
                    }
                );
                const getCarTypeData = await updatedCarTypeResponse.json();
                const getStatus = updatedCarTypeResponse.status;
                console.log('getCarTypeData', getCarTypeData);
                console.log('getUserStatus', getStatus);
                //setCarType(getCarTypeData);
                return getCarTypeData;
            } catch (error) {
                console.error(`Error updating type of car with ID ${id}:`, error);
            }
        };

        const deleteCarType = async (id: string) => {
            //TODO
            try {
                const deleteCarTypeResponse = await fetch(
                    `http://localhost:3001/api/type-of-transportation/${id}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json"},
                    }
                );
                const getCarTypeData = await deleteCarTypeResponse.json();
                const getStatus = deleteCarTypeResponse.status;
                console.log('getCarTypeData', getCarTypeData);
                console.log('getUserStatus', getStatus);
                //setCarType(getCarTypeData);
                return getCarTypeData;
            } catch (error) {
                console.error(`Error deleting type of car with ID ${id}:`, error);
            }
        };

        const onSubmit: SubmitHandler<CarTypeEditFormSchema> = async (e: any) => {
            e.preventDefault();

            let submitData = data as any;
            console.log('isEditing', isEditing);
            console.log('submitData', submitData);
            if (isEditing) {
                setInputDisabled(true);
                updateCarType(id, submitData);
            } else {
                setInputDisabled(true);
                createCarType(submitData);
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
                                                        <NormalText text={t('CAR_TYPES.BRAND')} required={true}/>
                                                        <FormControl>
                                                            <InputLabel>{t('CAR_TYPES.BRAND')}</InputLabel>
                                                            <Select
                                                                id="brand"
                                                                placeholder={t('CAR_TYPES.BRAND')}
                                                                name='brand'
                                                                label={t('CAR_TYPES.BRAND')}
                                                                data-testid='brand'
                                                                disabled={inputDisabled}
                                                                required
                                                                //value={values.design ?? ''}
                                                                //onChange={setValue('brand')}
                                                                errors={isValid}
                                                                control={control}
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <ClearIcon
                                                                                sx={{color: '#000000', cursor: 'pointer'}}
                                                                                //onClick={() => setValues({...values, brand: '' })}
                                                                                onClick={() => setValue('brand', null)}
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
                                                        <NormalText text={t('CAR_TYPES.CAR_TYPE_NAME')}/>
                                                        <FormControl required fullWidth>
                                                            <TextField
                                                                id="typeName"
                                                                placeholder='Példa Éva'
                                                                name='typeName'
                                                                label={t('CAR_TYPES.CAR_TYPE_NAME')}
                                                                //value={values.typeName}
                                                                //onChange={handleChange('typeName')}
                                                                data-testid='car-type-name-input'
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
                                                        <NormalText text={t('CAR_TYPES.DESIGN')} required={true}/>
                                                        <FormControl>
                                                            <InputLabel>{t('CAR_TYPES.DESIGN')}</InputLabel>
                                                            <Select
                                                                id="design"
                                                                placeholder={t('CAR_TYPES.DESIGN')}
                                                                name='design'
                                                                label={t('CAR_TYPES.DESIGN')}
                                                                data-testid='design'
                                                                disabled={inputDisabled}
                                                                required
                                                                //value={values.design ?? ''}
                                                                //onChange={handleChange('design')}
                                                                errors={isValid}
                                                                control={control}
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
                                                        <NormalText text={t('CAR_TYPES.PERFORMANCE')}/>
                                                        <FormControl required fullWidth>
                                                            <TextField
                                                                id="performance"
                                                                placeholder='Példa Éva'
                                                                name='performance'
                                                                label={t('CAR_TYPES.PERFORMANCE')}
                                                                //value={values.performance}
                                                                //onChange={handleChange('performance')}
                                                                data-testid='performance-input'
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
                                                        <NormalText text={t('CAR_TYPES.OWN_WEIGHT')}/>
                                                        <FormControl required fullWidth>
                                                            <TextField
                                                                id="selfWeight"
                                                                placeholder='Példa Éva'
                                                                name='selfWeight'
                                                                label={t('CAR_TYPES.OWN_WEIGHT')}
                                                                //value={values.selfWeight}
                                                                //onChange={handleChange('selfWeight')}
                                                                data-testid='self-weight-input'
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
                                                        <NormalText text={t('CAR_TYPES.USEFUL_WEIGHT')}/>
                                                        <FormControl required fullWidth>
                                                            <TextField
                                                                id="usefulWeight"
                                                                placeholder='Példa Éva'
                                                                name='usefulWeight'
                                                                label={t('CAR_TYPES.USEFUL_WEIGHT')}
                                                                //value={values.usefulWeight}
                                                                //onChange={handleChange('usefulWeight')}
                                                                data-testid='useful-weight-input'
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
                                                        <NormalText text={t('CAR_TYPES.NUMBER_OF_SEATS')} required={true}/>
                                                        <FormControl>
                                                            <InputLabel>{t('CAR_TYPES.NUMBER_OF_SEATS')}</InputLabel>
                                                            <Select
                                                                id="numberOfSeats"
                                                                placeholder={t('CAR_TYPES.NUMBER_OF_SEATS')}
                                                                name='numberOfSeats'
                                                                label={t('CAR_TYPES.NUMBER_OF_SEATS')}
                                                                data-testid='numberOfSeats'
                                                                disabled={inputDisabled}
                                                                required
                                                                //value={values.numberOfSeats ?? ''}
                                                                //onChange={handleChange('numberOfSeats')}
                                                                errors={isValid}
                                                                control={control}
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
                                                        <NormalText text={t('CAR_TYPES.FUEL')} required={true}/>
                                                        <FormControl>
                                                            <InputLabel>{t('CAR_TYPES.FUEL')}</InputLabel>
                                                            <Select
                                                                id="fuel"
                                                                placeholder={t('CAR_TYPES.FUEL')}
                                                                name='fuel'
                                                                label={t('CAR_TYPES.FUEL')}
                                                                data-testid='fuel'
                                                                disabled={inputDisabled}
                                                                required
                                                                //value={values.fuel ?? ''}
                                                                //onChange={handleChange('fuel')}
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
                                            <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                                <Grid item xs={4} md={5}>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'start'
                                                    }}>
                                                        <NormalText text={t('CAR_TYPES.VONTATAS')}/>
                                                        <FormControl required fullWidth>
                                                            <TextField
                                                                id="vontatas"
                                                                placeholder='Példa Éva'
                                                                name='vontatas'
                                                                label={t('CAR_TYPES.VONTATAS')}
                                                                //value={values.vontatas}
                                                                //onChange={handleChange('vontatas')}
                                                                data-testid='vontatas-input'
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
                                                        <NormalText text={t('CAR_TYPES.HEIGHT')}/>
                                                        <FormControl required fullWidth>
                                                            <TextField
                                                                id="height"
                                                                placeholder='Példa Éva'
                                                                name='height'
                                                                label={t('CAR_TYPES.HEIGHT')}
                                                                //value={values.height}
                                                                //onChange={handleChange('height')}
                                                                data-testid='height-input'
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
                                                        <NormalText text={t('CAR_TYPES.SZELESSEG')}/>
                                                        <FormControl required fullWidth>
                                                            <TextField
                                                                id="szelesseg"
                                                                placeholder='Példa Éva'
                                                                name='szelesseg'
                                                                label={t('CAR_TYPES.SZELESSEG')}
                                                                //value={values.szelesseg}
                                                                //onChange={handleChange('szelesseg')}
                                                                data-testid='szelesseg-input'
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
                                                        <NormalText text={t('CAR_TYPES.LONG')}/>
                                                        <FormControl required fullWidth>
                                                            <TextField
                                                                id="long"
                                                                placeholder='Példa Éva'
                                                                name='long'
                                                                label={t('CAR_TYPES.LONG')}
                                                                //value={values.long}
                                                                //onChange={handleChange('long')}
                                                                data-testid='long-input'
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
                                                        <NormalText text={t('CAR_TYPES.CAR_TYPE_OF_TRANSPORTATION')} required={true}/>
                                                        <FormControl>
                                                            <InputLabel>{t('CAR_TYPES.CAR_TYPE_OF_TRANSPORTATION')}</InputLabel>
                                                            <Select
                                                                id="carTypeOfTransportationId"
                                                                placeholder={t('CAR_TYPES.CAR_TYPE_OF_TRANSPORTATION')}
                                                                name='carTypeOfTransportationId'
                                                                label={t('CAR_TYPES.CAR_TYPE_OF_TRANSPORTATION')}
                                                                data-testid='carTypeOfTransportationId'
                                                                disabled={inputDisabled}
                                                                required
                                                                //value={values.carTypeOfTransportationId ?? ''}
                                                                //onChange={handleChange('carTypeOfTransportationId')}
                                                                errors={isValid}
                                                                control={control}
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

export default CarTypeAddDialog;
