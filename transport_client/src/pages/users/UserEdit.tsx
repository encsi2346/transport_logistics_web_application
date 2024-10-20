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
    MenuItem,
    Select,
    SelectChangeEvent, SxProps, Theme, Typography,
    useTheme
} from "@mui/material";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import TextFieldInput from "../../components/inputField/TextFieldInput";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import { UserEditFormSchema } from "./schemas/user-edit-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import { userEditFormSchema } from "./schemas/user-edit-form-schema";
import NormalText from "../../components/text/NormalText";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {useNavigate, useParams} from "react-router-dom";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {setMode} from "@/state";
import SelectInput from "@/components/inputfield/SelectInput";
//import DatePickerInput from "@/components/inputfield/DatePickerInput";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

const textStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#A3A3A3',
}

const iconStyle: SxProps<Theme> = {
    fontSize: 100,
    color: '#A3A3A3',
    marginLeft: '40px',
    marginRight: '40px',
    marginTop: '20px',
    marginBottom: '10px',
}

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const UserEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);
    const [isProfilePage, setIsProfilePage] = useState(true);
    const [t, i18n] = useTranslation();
    const [genderList, setGenderList] = useState([]);

    const theme = useTheme();

    const [languageValue, setLanguageValue] = useState(null);

    const handleChangeLanguage = (event: SelectChangeEvent) => {
        setLanguageValue(event.target.value as string);
    }

    useEffect(() => {
        if (languageValue === null) {
            const language = localStorage.getItem('language');
            if (language) {
                setLanguageValue(language);
            }
        }
    }, []);

    useEffect(() => {
        if (languageValue === null) return;
        localStorage.setItem('language', languageValue);
        i18n.changeLanguage(languageValue)
            .then(() => {
                console.log('Language changed');
            })
            .catch((error) => {
                console.log(error);
            });
    }, [languageValue]);

    const handleLoadGenderList = async () => {
        const getResponse = await fetch(
            "http://localhost:3001/api/genders",
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getGenderList = await getResponse.json();
        //const getStatus = getResponse.status;
        console.log('genders', getGenderList);

        const formattedGenderList = getGenderList.map(gender => ({
            value: gender,
            label: gender.charAt(0).toUpperCase() + gender.slice(1) // Capitalize the first letter for labels
        }));
        console.log('formattedGenderList', formattedGenderList);
        setGenderList(formattedGenderList);
    }

    useEffect(() => {
        handleLoadGenderList();
    }, [])




    const {
        control,
        setValue,
        reset,
        handleSubmit,
        formState: { isValid },
    } = useForm<UserEditFormSchema>({
        defaultValues: {
            familyName: '',
            firstName: '',
            gender: '',
            nationality: '',
            birthPlace: '',
            birthDate: '',
            IDCardNumber: '',
            validityDateOfIDCard: '',
            drivingLicenceNumber: '',
            drivingLicenceCategories: '',
            validityDateOfDrivingLicence: '',
            dateOfMedicalVisit: '',
            validityDateOfMedicalVisit: '',
            email: '',
            phoneNumber: '',
            country: '',
            postcode: '',
            city: '',
            nameOfPublicArea: '',
            typeOfPublicArea: '',
            houseNumber: '',
            dateOfRegistration: '',
            startDateOfContract: '',
            endDateOfContract: '',
            position: '',
            lineManager: '',
            healthProblem: '',
        },
        //resolver: zodResolver(userEditFormSchema(isEditing)),
        mode: 'all',
    });

    const createUser = (data) => {
        //TODO
        navigate(`/users/${parseInt(data, 10)}`);
    };

    const updateUser = (id, data) => {
        //TODO
    };

    const onSubmit = handleSubmit((data) => {
        let submitData = data as any;

        if (isEditing) {
            setInputDisabled(true);
            updateUser(id, submitData);
        } else {
            setInputDisabled(true);
            createUser(submitData);
        }
    }, (errors) => {console.log(errors)});

    const handleEditClicked = () => {
        setInputDisabled(!inputDisabled);
    };

    const getUser = async (id) => {
        try {
            const getUserResponse = await fetch(
                `http://localhost:3001/api/users/${id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getUserData = await getUserResponse.json();
            const getStatus = getUserResponse.status;
            console.log('getUserData', getUserData);
            console.log('getUserStatus', getStatus);
            //setUsers(getUserList);
        } catch (error) {
            console.error('Error get user:', error);
        }
    }

    const createUser = async (data: any) => {
        try {
            const createUserResponse = await fetch(
                `http://localhost:3001/api/users/addUser`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getUserData = await createUserResponse.json();
            const getStatus = createUserResponse.status;
            console.log('getUserData', getUserData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
            return getUserData;
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const updateUserType = async (id: string, data: any) => {
        try {
            const updatedUserResponse = await fetch(
                `http://localhost:3001/api/users/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getUserData = await updatedUserResponse.json();
            const getStatus = updatedUserResponse.status;
            console.log('getUserData', getUserData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
            return getUserData;
        } catch (error) {
            console.error(`Error updating user with ID ${id}:`, error);
        }
    };

    const deleteUser = async (id: string) => {
        //TODO
        try {
            const deleteUserResponse = await fetch(
                `http://localhost:3001/api/users/${id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getUserData = await deleteUserResponse.json();
            const getStatus = deleteUserResponse.status;
            console.log('getUserData', getUserData);
            console.log('getUserStatus', getStatus);
            //setCartTypes(getCarTypesData);
            return getUserData;
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error);
        }
    };

    useEffect(() => {
        getUser(id);
    }, [id]);

    return (
        <Box>
            <PageHeader text={t('USER.NEW_USER')}/>
            <BackgroundCard>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'space-between'}}>
                    <Box sx={{ display: 'block', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 5}}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <NormalText text={t('TEXT.SELECT_MODE')} />
                            <IconButton onClick={() => dispatch(setMode())} data-testid='mode-selector'>
                                {theme.palette.mode === "dark" ? (
                                    <DarkModeRoundedIcon sx={{ color: `#000000`, fontSize: "25px" }} />
                                ) : (
                                    <LightModeRoundedIcon sx={{ color: `#000000`, fontSize: "25px" }} />
                                )}
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                            <NormalText text={t('TEXT.SELECT_LANGUAGE')} />
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    data-testid='select-language-input'
                                    value={languageValue}
                                    onChange={handleChangeLanguage}
                                    sx={{color: '#000000', border: 'none', backgroundColor: '#ffffff'}}
                                >
                                    <MenuItem value={'hu'}>Hu</MenuItem>
                                    <MenuItem value={'en'}>En</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    {inputDisabled && (
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <SaveButton text={t('TEXT.EDIT')} onClick={handleEditClicked} />
                        </Box>
                    )}
                </Box>
            </BackgroundCard>

            <BackgroundCard>
                <DataCard>
                    <Headline text={t('USER.PERSONAL_DATA')} />
                        <Grid container spacing={12}>
                            {/* First Column */}
                            <Grid item xs={12} md={4}>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('USER.FAMILY_NAME')} required={true} />
                                            <TextFieldInput
                                                placeholder={t('USER.FAMILY_NAME')}
                                                control={control}
                                                name='familyName'
                                                type='text'
                                                data-testid='family-name-input'
                                                disabled={inputDisabled}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('USER.FIRST_NAME')} required={true} />
                                            <TextFieldInput
                                                placeholder={t('USER.FIRST_NAME')}
                                                control={control}
                                                name='firstName'
                                                type='text'
                                                data-testid='first-name-input'
                                                disabled={inputDisabled}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('USER.GENDER')} required={true} />
                                            <SelectInput
                                                placeholder={t('USER.GENDER')}
                                                control={control}
                                                name='gender'
                                                data-testid='gender-input'
                                                disabled={inputDisabled}
                                                options={genderList.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                                required
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton onClick={() => setValue('gender', undefined)} edge="end" >
                                                                <ClearRoundedIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    sx: {
                                                        '.MuiSelect-icon': {
                                                            display: 'none',
                                                        },
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('USER.NATIONALITY')} required={true} />
                                            <TextFieldInput
                                                placeholder={t('USER.NATIONALITY')}
                                                control={control}
                                                name='nationality'
                                                type='text'
                                                data-testid='nationality-input'
                                                disabled={inputDisabled}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('USER.BIRTH_PLACE')} required={true} />
                                            <TextFieldInput
                                                placeholder={t('USER.BIRTH_PLACE')}
                                                control={control}
                                                name='birthPlace'
                                                type='text'
                                                data-testid='birth-place-input'
                                                disabled={inputDisabled}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('USER.BIRTH_DATE')} required={true} />

                                            {/*
                                            //TODO: datepicker
                                            <DatePickerInput
                                                placeholder={t('USER.BIRTH_DATE')}
                                                control={control}
                                                name='birthDate'
                                                data-testid='birth-date-input'
                                                disabled={inputDisabled}
                                                required
                                            />*/}
                                            <TextFieldInput
                                                placeholder={t('USER.TYPE_OF_PUBLIC_AREA')}
                                                control={control}
                                                name='typeOfPublicArea'
                                                type='text'
                                                data-testid='type-of-public-area'
                                                disabled={inputDisabled}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('USER.ID_CARD_NUMBER')} required={true} />
                                            <TextFieldInput
                                                placeholder={t('USER.ID_CARD_NUMBER')}
                                                control={control}
                                                name='IDCardNumber'
                                                type='text'
                                                data-testid='id-card-number-input'
                                                disabled={inputDisabled}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('USER.VALIDITY_DATE_OF_ID_CARD')} required={true} />
                                            {/*
                                            //TODO: datepicker
                                            <DatePickerInput
                                                placeholder={t('USER.VALIDITY_DATE_OF_ID_CARD')}
                                                control={control}
                                                name='validityDateOfIDCard'
                                                data-testid='validity-date-of-id-card'
                                                disabled={inputDisabled}
                                                required
                                            />
                                            */}
                                            <TextFieldInput
                                                placeholder={t('USER.TYPE_OF_PUBLIC_AREA')}
                                                control={control}
                                                name='typeOfPublicArea'
                                                type='text'
                                                data-testid='type-of-public-area'
                                                disabled={inputDisabled}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Second Column */}
                            <Grid item xs={12} md={4}>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('USER.DRIVING_LICENCE_CATEGORIES')} required={true} />
                                            <SelectInput //TODO: multiselect
                                                placeholder={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                                control={control}
                                                name='drivingLicenceCategories'
                                                data-testid='driving-licence-categories'
                                                disabled={inputDisabled}
                                                //options={enumToOptions(userRoles)}
                                                required
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton onClick={() => setValue('drivingLicenceCategories', undefined)} edge="end" >
                                                                <ClearRoundedIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    sx: {
                                                        '.MuiSelect-icon': {
                                                            display: 'none',
                                                        },
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('USER.DRIVING_LICENCE_NUMBER')} required={true} />
                                            <TextFieldInput
                                                placeholder={t('USER.DRIVING_LICENCE_NUMBER')}
                                                control={control}
                                                name='drivingLicenceNumber'
                                                type='text'
                                                data-testid='driving-licence-number'
                                                disabled={inputDisabled}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('USER.VALIDITY_DATE_OF_DRIVING_LICENCE')} required={true} />
                                            {/*
                                            //TODO: datepicker
                                            <DatePickerInput
                                                placeholder={t('USER.VALIDITY_DATE_OF_DRIVING_LICENCE')}
                                                control={control}
                                                name='validityDateOfDrivingLicence'
                                                data-testid='validity-date-of-driving-licence'
                                                disabled={inputDisabled}
                                                required
                                            />
                                            */}
                                            <TextFieldInput
                                                placeholder={t('USER.TYPE_OF_PUBLIC_AREA')}
                                                control={control}
                                                name='typeOfPublicArea'
                                                type='text'
                                                data-testid='type-of-public-area'
                                                disabled={inputDisabled}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('USER.DATE_OF_MEDICAL_VISIT')} required={true} />
                                            {/*
                                            //TODO: datepicker
                                            <DatePickerInput
                                                placeholder={t('USER.DATE_OF_MEDICAL_VISIT')}
                                                control={control}
                                                name='dateOfMedicalVisit'
                                                data-testid='date-of-medical-visit'
                                                disabled={inputDisabled}
                                                required
                                            />
                                            */}
                                            <TextFieldInput
                                                placeholder={t('USER.TYPE_OF_PUBLIC_AREA')}
                                                control={control}
                                                name='typeOfPublicArea'
                                                type='text'
                                                data-testid='type-of-public-area'
                                                disabled={inputDisabled}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <NormalText text={t('USER.VALIDITY_DATE_OF_MEDICAL_VISIT')} required={true} />
                                            {/*
                                            //TODO: datepicker
                                            <DatePickerInput
                                                placeholder={t('USER.VALIDITY_DATE_OF_MEDICAL_VISIT')}
                                                control={control}
                                                name='validityDateOfMedicalVisit'
                                                data-testid='validity-date-of-medical-visit'
                                                disabled={inputDisabled}
                                                required
                                            />
                                            */}
                                            <TextFieldInput
                                                placeholder={t('USER.TYPE_OF_PUBLIC_AREA')}
                                                control={control}
                                                name='typeOfPublicArea'
                                                type='text'
                                                data-testid='type-of-public-area'
                                                disabled={inputDisabled}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Third Column: Image Picker */}
                            <Grid item xs={12} md={4}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#ffffff',
                                                width: 250,
                                                height: 250,
                                                borderRadius: 4,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <Box>
                                            {/* TODO: Add image picker component */}
                                                <PhotoLibraryIcon sx={iconStyle} />
                                                <Typography sx={textStyle}>
                                                    {t('USER.UPLOAD_IMAGE')}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                </DataCard>

                <DataCard>
                    <Headline text={t('USER.CONTACT_DATA')} />
                    <Grid container spacing={12}>
                        {/* First Column */}
                        <Grid item xs={12} md={4}>
                            <Grid container direction="column" spacing={3}>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.EMAIL')} required={true} />
                                        <TextFieldInput
                                            placeholder={t('TEXT.EMAIL')}
                                            control={control}
                                            name='email'
                                            type='text'
                                            data-testid='email'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('USER.PHONE_NUMBER')} required={true} />
                                        <TextFieldInput
                                            placeholder={t('USER.PHONE_NUMBER')}
                                            control={control}
                                            name='phoneNumber'
                                            type='text'
                                            data-testid='phone-number'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('USER.COUNTRY')} required={true} />
                                        <TextFieldInput
                                            placeholder={t('USER.COUNTRY')}
                                            control={control}
                                            name='country'
                                            type='text'
                                            data-testid='country'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('USER.POSTCODE')} required={true} />
                                        <TextFieldInput
                                            placeholder={t('USER.POSTCODE')}
                                            control={control}
                                            name='postcode'
                                            type='text'
                                            data-testid='postcode'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Second Column */}
                        <Grid item xs={12} md={4}>
                            <Grid container direction="column" spacing={3}>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('USER.CITY')} required={true} />
                                        <TextFieldInput
                                            placeholder={t('USER.CITY')}
                                            control={control}
                                            name='city'
                                            type='text'
                                            data-testid='city'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('USER.NAME_OF_PUBLIC_AREA')} required={true} />
                                        <TextFieldInput
                                            placeholder={t('USER.NAME_OF_PUBLIC_AREA')}
                                            control={control}
                                            name='nameOfPublicArea'
                                            type='text'
                                            data-testid='name-of-public-area'
                                            disabled={inputDisabled}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('USER.TYPE_OF_PUBLIC_AREA')} required={true} />
                                        <TextFieldInput
                                            placeholder={t('USER.TYPE_OF_PUBLIC_AREA')}
                                            control={control}
                                            name='typeOfPublicArea'
                                            type='text'
                                            data-testid='type-of-public-area'
                                            disabled={inputDisabled}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('USER.HOUSE_NUMBER')} required={true} />
                                        <TextFieldInput
                                            placeholder={t('USER.HOUSE_NUMBER')}
                                            control={control}
                                            name='houseNumber'
                                            type='text'
                                            data-testid='house-number'
                                            disabled={inputDisabled}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Third Column: Image Picker */}
                        <Grid item xs={12} md={4}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Box>
                                        {/* TODO */}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DataCard>

                <DataCard>
                    <Headline text={t('USER.EMPLOYEE_DATA')} />
                    <Grid container spacing={12}>
                        {/* First Column */}
                        <Grid item xs={12} md={4}>
                            <Grid container direction="column" spacing={3}>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('USER.DATE_OF_REGISTRATION')} required={true} />
                                        {/*
                                        //TODO: datepicker
                                        <DatePickerInput
                                            placeholder={t('USER.DATE_OF_REGISTRATION')}
                                            control={control}
                                            name='dateOfRegistration'
                                            data-testid='date-of-registration'
                                            disabled={inputDisabled}
                                            required
                                        />
                                        */}
                                        <TextFieldInput
                                            placeholder={t('USER.TYPE_OF_PUBLIC_AREA')}
                                            control={control}
                                            name='typeOfPublicArea'
                                            type='text'
                                            data-testid='type-of-public-area'
                                            disabled={inputDisabled}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('USER.START_DATE_OF_CONTRACT')} required={true} />
                                        {/*
                                        //TODO: datepicker
                                        <DatePickerInput
                                            placeholder={t('USER.START_DATE_OF_CONTRACT')}
                                            control={control}
                                            name='startDateOfContract'
                                            data-testid='start-date-of-contract'
                                            disabled={inputDisabled}
                                            required
                                        />
                                        */}
                                        <TextFieldInput
                                            placeholder={t('USER.TYPE_OF_PUBLIC_AREA')}
                                            control={control}
                                            name='typeOfPublicArea'
                                            type='text'
                                            data-testid='type-of-public-area'
                                            disabled={inputDisabled}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('USER.END_DATE_OF_CONTRACT')} required={true} />
                                        {/*
                                        //TODO: datepicker
                                        <DatePickerInput
                                            placeholder={t('USER.END_DATE_OF_CONTRACT')}
                                            control={control}
                                            name='endDateOfContract'
                                            data-testid='end-date-of-contract'
                                            disabled={inputDisabled}
                                        />
                                        */}
                                        <TextFieldInput
                                            placeholder={t('USER.TYPE_OF_PUBLIC_AREA')}
                                            control={control}
                                            name='typeOfPublicArea'
                                            type='text'
                                            data-testid='type-of-public-area'
                                            disabled={inputDisabled}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('USER.POSITION')} required={true} />
                                        <TextFieldInput
                                            placeholder={t('USER.POSITION')}
                                            control={control}
                                            name='position'
                                            type='text'
                                            data-testid='position'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Second Column */}
                        <Grid item xs={12} md={4}>
                            <Grid container direction="column" spacing={3}>
                                <Grid item>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('USER.LINE_MANAGER')} required={true} />
                                        <TextFieldInput
                                            placeholder={t('USER.LINE_MANAGER')}
                                            control={control}
                                            name='lineManager'
                                            type='text'
                                            data-testid='line-manager'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                        </Grid>
                    </Grid>

                    {/* Third Column: Image Picker */}
                    <Grid item xs={12} md={4}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <Box>
                                    {/* TODO */}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DataCard>

            <DataCard>
                <Headline text={t('USER.OTHER_DATA')} />
                <Grid container spacing={12}>
                    {/* First Column */}
                    <Grid item xs={12} md={4}>
                        <Grid container direction="column" spacing={3}>
                            <Grid item>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('USER.HEALTH_PROBLEM')} required={true} />
                                    <TextFieldInput
                                        placeholder={t('USER.HEALTH_PROBLEM')}
                                        control={control}
                                        name='healthProblem'
                                        type='text'
                                        data-testid='health-problem'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Third Column: Image Picker */}
                    <Grid item xs={12} md={4}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <Box>
                                    {/* TODO */}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DataCard>

            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <CancelButton text={t('TEXT.CANCEL')} onClick={() => navigate(-1)}/>
                <SaveButton text={t('TEXT.SAVE')} onClick={onSubmit} />
            </Box>
            </BackgroundCard>
        </Box>
    );
};

export default UserEdit;