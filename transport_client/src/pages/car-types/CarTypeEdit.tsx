import PageHeader from "../../components/text/PageHeader";
import BackgroundCard from "../../components/layout/BackgroundCard";
import DataCard from "../../components/layout/DataCard";
import Headline from "../../components/text/Headline";
import {
    Box,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useEffect, useState} from "react";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate, useParams} from "react-router-dom";
import TextFieldInput from "../../components/inputField/TextFieldInput";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SelectInput from "../../components/inputField/SelectInput";
import {CarTypeEditFormSchema, carTypeEditFormSchema} from "./schemas/car-type-edit-form-schema";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import moment from "moment/moment";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const CarTypeEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    const { t } = useTypeSafeTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);
    const [fuelTypeList, setFuelTypeList] = useState([]);
    const [values, setValues] = useState({
        carTypeId: '',
        brand: '',
        typeName: '',
        design: '',
        performance: '',
        selfWeight: null,
        usefulWeight: null,
        numberOfSeats: null,
        fuel: null,
        vontatas: null,
        height: null,
        szelesseg: null,
        long: null
    });

    const handleFuelTypeList = async () => {
        const getResponse = await fetch(
            "http://localhost:3001/api/fuelTypes",
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getFuelTypeList = await getResponse.json();
        //const getStatus = getResponse.status;
        console.log('fuelTypes', getFuelTypeList);

        const formattedFuelTypeList = getFuelTypeList.map(fuelType => ({
            value: fuelType,
            label: fuelType.charAt(0).toUpperCase() + fuelType.slice(1)
        }));
        console.log('formattedFuelTypeList', formattedFuelTypeList);
        setFuelTypeList(formattedFuelTypeList);
    }

    useEffect(() => {
        handleFuelTypeList();
    }, []);

/*
    const {
        control,
        setValue,
        reset,
        handleSubmit,
        formState: { isValid },
    } = useForm<CarTypeEditFormSchema>({
        defaultValues: {
            carTypeId: '',
            brand: '',
            typeName: '',
            design: '',
            performance: '',
            selfWeight: null,
            usefulWeight: null,
            numberOfSeats: null,
            fuel: null,
            vontatas: null,
            height: null,
            szelesseg: null,
            long: null
        },
        resolver: zodResolver(carTypeEditFormSchema(isEditing)),
        mode: 'all',
    });*/

    const handleSubmit = async (e: any) => {
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


    const handleEditClicked = () => {
        setInputDisabled(!inputDisabled);
    };

    const getCarType = async (id: string) => {
        try {
            const getCarTypeResponse = await fetch(
                `http://localhost:3001/api/car-types/${id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getCarTypeData = await getCarTypeResponse.json();
            const getStatus = getCarTypeResponse.status;
            console.log('getCarTypeData', getCarTypeData);
            console.log('getUserStatus', getStatus);
            //setCartTypes(getCarTypesData);
        } catch (error) {
            console.error('Error get car type:', error);
        }
    }

    const createCarType = async (data: any) => {
        try {
            const createCarTypeResponse = await fetch(
                `http://localhost:3001/api/car-types/addCarType`,
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
            //setCartTypes(getCarTypesData);
            return getCarTypeData;
        } catch (error) {
            console.error('Error creating car type:', error);
        }
    };

    const updateCarType = async (id: string, data: any) => {
        try {
            const updatedCarTypeResponse = await fetch(
                `http://localhost:3001/api/car-types/${id}`,
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
            //setCartTypes(getCarTypesData);
            return getCarTypeData;
        } catch (error) {
            console.error(`Error updating car type with ID ${id}:`, error);
        }
    };

    const deleteCarType = async (id: string) => {
        //TODO
        try {
            const deleteCarTypeResponse = await fetch(
                `http://localhost:3001/api/car-types/${id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getCarTypeData = await deleteCarTypeResponse.json();
            const getStatus = deleteCarTypeResponse.status;
            console.log('getCarTypeData', getCarTypeData);
            console.log('getUserStatus', getStatus);
            //setCartTypes(getCarTypesData);
            return getCarTypeData;
        } catch (error) {
            console.error(`Error deleting car type with ID ${id}:`, error);
        }
    };

    useEffect(() => {
        getCarType(id);
    }, [id]);

    const handleChange = (prop: any) => (event: any) => {
        /*setValues(prevValues => ({
            ...prevValues,
            [prop]: event.target.value,
        }));*/
        setValues({...values, [prop]: event.target.value });
    };

    const handleDateChange = (prop: any) => (date: any) => {
        const value = date ? moment(date).hour(0).minute(0).toISOString() : null;
        setValues({ ...values, [prop]: value as string });
    };

    return (
        <Box>
            <PageHeader text={t('CAR_TYPES.ADD_NEW_CAR_TYPE')}/>
            <BackgroundCard>
                <form
                    autoComplete='off'
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <DataCard>
                        <Headline text={t('CAR_TYPES.CAR_TYPE_DATA')}/>
                        <Grid item container direction="column" spacing={2}>
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <NormalText text={t('CAR_TYPES.CAR_TYPE_NAME')}/>
                                        <FormControl>
                                            <TextField
                                                id="typeName"
                                                placeholder='Példa Éva'
                                                name='typeName'
                                                label={t('CAR_TYPES.CAR_TYPE_NAME')}
                                                value={values.typeName}
                                                onChange={handleChange('typeName')}
                                                data-testid='car-type-name-input'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon sx={{color: '#000000'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <ClearIcon
                                                                sx={{color: '#000000', cursor: 'pointer'}}
                                                                onClick={() => setValues({...values, typeName: ''})}
                                                            />
                                                        </InputAdornment>
                                                    )
                                                }}
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
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <NormalText text={t('CAR_TYPES.CAR_FUNCTIONAL_DESIGN')}/>
                                        <FormControl>
                                            <InputLabel>{t('CAR_TYPES.CAR_FUNCTIONAL_DESIGN')}</InputLabel>
                                            <Select
                                                id="design"
                                                placeholder='Sofőr'
                                                label={t('CAR_TYPES.CAR_FUNCTIONAL_DESIGN')}
                                                name='design'
                                                data-testid='car-functional-design-input'
                                                value={values.design ?? ''}
                                                onChange={handleChange('design')}
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
                                            >
                                                {/*Object.values(positionList).map((position) => (
                                                    <MenuItem key={position.value} value={position.value}>
                                                        {position.label}
                                                    </MenuItem>
                                                ))*/}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <NormalText text={t('CAR_TYPES.PERFORMANCE')}/>
                                        <FormControl>
                                            <TextField
                                                id="performance"
                                                placeholder='Példa Éva'
                                                name='performance'
                                                label={t('CAR_TYPES.PERFORMANCE')}
                                                value={values.performance}
                                                onChange={handleChange('performance')}
                                                data-testid='performance-input'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon sx={{color: '#000000'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <ClearIcon
                                                                sx={{color: '#000000', cursor: 'pointer'}}
                                                                onClick={() => setValues({...values, performance: ''})}
                                                            />
                                                        </InputAdornment>
                                                    )
                                                }}
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
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <NormalText text={t('CAR_TYPES.OWN_WEIGHT')}/>
                                        <FormControl>
                                            <TextField
                                                id="selfWeight"
                                                placeholder='Példa Éva'
                                                name='selfWeight'
                                                label={t('CAR_TYPES.OWN_WEIGHT')}
                                                value={values.selfWeight}
                                                onChange={handleChange('selfWeight')}
                                                data-testid='own-weight-input'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon sx={{color: '#000000'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <ClearIcon
                                                                sx={{color: '#000000', cursor: 'pointer'}}
                                                                onClick={() => setValues({...values, selfWeight: ''})}
                                                            />
                                                        </InputAdornment>
                                                    )
                                                }}
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
                                <Grid item xs={4} md={4}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <NormalText text={t('CAR_TYPES.NUMBER_OF_SEATS')}/>
                                        <FormControl>
                                            <InputLabel>{t('CAR_TYPES.NUMBER_OF_SEATS')}</InputLabel>
                                            <Select
                                                id="numberOfSeats"
                                                placeholder='Sofőr'
                                                label={t('CAR_TYPES.NUMBER_OF_SEATS')}
                                                name='numberOfSeats'
                                                value={values.numberOfSeats ?? ''}
                                                onChange={handleChange('numberOfSeats')}
                                                data-testid='number-of-seats-input'
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
                                            >
                                                {/*Object.values(positionList).map((position) => (
                                                    <MenuItem key={position.value} value={position.value}>
                                                        {position.label}
                                                    </MenuItem>
                                                ))*/}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <NormalText text={t('CAR_TYPES.FUEL')}/>
                                        <FormControl>
                                            <InputLabel>{t('CAR_TYPES.FUEL')}</InputLabel>
                                            <Select
                                                id="fuel"
                                                placeholder='Sofőr'
                                                label={t('CAR_TYPES.FUEL')}
                                                name='fuel'
                                                value={values.fuel ?? ''}
                                                onChange={handleChange('fuel')}
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
                                            >
                                                {/*Object.values(positionList).map((position) => (
                                                    <MenuItem key={position.value} value={position.value}>
                                                        {position.label}
                                                    </MenuItem>
                                                ))*/}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <NormalText text={t('CAR_TYPES.USEFUL_WEIGHT')}/>
                                        <FormControl>
                                            <TextField
                                                id="usefulWeight"
                                                placeholder='Példa Éva'
                                                name='usefulWeight'
                                                label={t('CAR_TYPES.USEFUL_WEIGHT')}
                                                value={values.usefulWeight}
                                                onChange={handleChange('usefulWeight')}
                                                data-testid='useful-weight-input'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon sx={{color: '#000000'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <ClearIcon
                                                                sx={{color: '#000000', cursor: 'pointer'}}
                                                                onClick={() => setValues({...values, usefulWeight: ''})}
                                                            />
                                                        </InputAdornment>
                                                    )
                                                }}
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

                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <CancelButton text={t('TEXT.CANCEL')} onClick={() => navigate(-1)}/>
                        <SaveButton text={t('TEXT.SAVE')} type='submit'/>
                    </Box>
                </form>
            </BackgroundCard>
        </Box>
    );
};

export default CarTypeEdit;