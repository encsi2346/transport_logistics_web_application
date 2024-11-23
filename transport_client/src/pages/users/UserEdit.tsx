import PageHeader from "../../components/text/PageHeader";
import BackgroundCard from "../../components/layout/BackgroundCard";
import DataCard from "../../components/layout/DataCard";
import Headline from "../../components/text/Headline";
import {
    Box,
    FormControl,
    Grid,
    IconButton,
    InputAdornment, InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent, SxProps, TextField, Theme, Typography,
    useTheme
} from "@mui/material";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import React, {useEffect, useState} from "react";
import NormalText from "../../components/text/NormalText";
import {useNavigate, useParams} from "react-router-dom";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { useTranslation } from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setMode} from "@/state";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ClearIcon from "@mui/icons-material/Clear";
//import {DatePicker} from "@mui/x-date-pickers";
import moment from "moment";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./Users.css";

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

const UserEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const theme = useTheme();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);
    const [isProfilePage, setIsProfilePage] = useState(true);
    const [t, i18n] = useTranslation();
    const [genderList, setGenderList] = useState([]);
    const [languageValue, setLanguageValue] = useState(null);
    const [drivingLicenceList, setDrivingLicenceList] = useState([]);
    const [values, setValues] = useState({
        userId: '',
        familyName: '',
        firstName: '',
        gender: 'male',
        nationality: '',
        birthPlace: '',
        birthDate: '',
        IDCardNumber: '',
        validityDateOfIDCard: '',
        drivingLicenceNumber: '',
        drivingLicenceCategories: 'A',
        validityDateOfDrivingLicence: '',
        dateOfMedicalVisit: '',
        medicalVisitStatus: '',
        email: '',
        phoneNumber: null,
        country: '',
        postcode: null,
        city: '',
        nameOfPublicArea: '',
        typeOfPublicArea: '',
        houseNumber: null,
        dateOfRegistration: '',
        startDateOfContract: '',
        endDateOfContract: '',
        position: '',
        lineManager: '',
        healthProblem: '',
        picturePath: '',
        image: null,
    });
    const [image, setImage] = useState({ image : "", userId: user.userId, carId: null, productId: null });
    const [allImage, setAllImage] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    //TODO: create separate image handdling by entities
    /*const getImage = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/users/get-image", {
                params: {
                    userId: user.userId, // Pass userId as a query parameter
                },
            });
            setAllImage(response.data.image);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };


    const updateImage = async (newImage) => {
        try {
            await axios.post('http://localhost:3001/api/users/update-image', {
                image: newImage.image,
                userId: newImage.userId
            });
        } catch(error){
            console.log(error)
        }
    };

    const deleteImage = async () => {
        try {
            // Send a DELETE request with the userId as a query parameter
            await axios.delete("http://localhost:3001/api/users/delete-image", {
                params: {
                    userId: user.userId,
                },
            });
            console.log("Image deleted successfully");
            alert("Image deleted successfully!");
            setAllImage(null); // Optionally, clear the image state after deletion
        } catch (error) {
            alert("Error deleting image. Please try again.");
            console.error("Error deleting image:", error);
        }
    };*/


    //TODO: common image handling
    const getImage = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/get-image", {
                params: {
                    userId: user.userId, // Pass userId as a query parameter
                },
            });
            setAllImage(response.data.data);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const updateImage = async (updatedImage) => {
        try {
            await axios.put('http://localhost:3001/api/update-image', updatedImage);
            console.log("Image updated successfully");
        } catch (error) {
            console.error("Error updating image:", error);
        }
    };

    const deleteImage = async () => {
        try {
            // Send a DELETE request with the userId as a query parameter
            await axios.delete("http://localhost:3001/api/delete-image", {
                params: {
                    userId: user.userId,
                },
            });
            console.log("Image deleted successfully");
            setAllImage(null); // Optionally, clear the image state after deletion
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };



    const handleSubmitImage = (e) => {
        e.preventDefault();
        updateImage(image);
        console.log("Uploaded");
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64);
        setImage({ ...image, image : base64, userId: user.userId });
    }

    const handleDeleteImage = (e) => {
        e.preventDefault();
        deleteImage();
    };


    useEffect(() => {
        getImage();
    }, []);

    useEffect(() => {
        console.log('user', user.userId);
    }, [user]);

    useEffect(() => {
        console.log('allimages', allImage);
    }, [allImage]);

   /* const submitImage = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            await axios.post("http://localhost:3001/api/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Image uploaded successfully!");
            getImage(); // Refresh the image list after upload
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image.");
        }
    };

    const onInputChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    };
*/

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

    const handleGenderList = async () => {
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
            label: gender.charAt(0).toUpperCase() + gender.slice(1)
        }));
        console.log('formattedGenderList', formattedGenderList);
        setGenderList(formattedGenderList);
    };

    const handleDrivingLicenceList = async () => {
        const getResponse = await fetch(
            "http://localhost:3001/api/drivingLicenceTypes",
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getDrivingLicenceList = await getResponse.json();
        //const getStatus = getResponse.status;
        console.log('drivingLicence', getDrivingLicenceList);

        const formattedDrivingLicenceList = getDrivingLicenceList.map(drivingLicence => ({
            value: drivingLicence,
            label: drivingLicence.charAt(0).toUpperCase() + drivingLicence.slice(1)
        }));
        console.log('formattedDrivingLicenceList', formattedDrivingLicenceList);
        setDrivingLicenceList(formattedDrivingLicenceList);
    };

    useEffect(() => {
        handleGenderList();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let submitData = data as any;
        console.log('isEditing', isEditing);
        console.log('submitData', submitData);
        if (isEditing) {
            setInputDisabled(true);
            createUser(submitData);
        } else {
            setInputDisabled(true);
            updateUser(id, submitData);
        }
    };

    const handleEditClicked = () => {
        setInputDisabled(!inputDisabled);
    };

    const getUser = async (id: string) => {
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

    const updateUser = async (id: string, data: any) => {
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

    const handleChange = (prop: any) => (event: any) => {
        /*setValues(prevValues => ({
            ...prevValues,
            [prop]: event.target.value,
        }));*/
        setValues({...values, [prop]: event.target.value });
    };

    const handleDateChange = (prop: any) => (date: any) => {
        const value = date ? moment(date).toISOString() : null;
        setValues({ ...values, [prop]: value as string });
    };

    useEffect(() => {
        console.log('birthDate', values.birthDate);
    }, [values.birthDate]);

    return (
        <Box>
            {/*<form
                autoComplete='off'
                onSubmit={(e) => handleSubmit(e)}
            >*/}
                <PageHeader text={t('USER.NEW_USER')}/>
                {/*TODO: különböző formok a backgroundokhoz*/}
                <BackgroundCard>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'space-between'}}>
                        <Box sx={{
                            display: 'block',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            marginLeft: 5
                        }}>
                            <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                <NormalText text={t('TEXT.SELECT_MODE')}/>
                                <IconButton onClick={() => dispatch(setMode())} data-testid='mode-selector'>
                                    {theme.palette.mode === "dark" ? (
                                        <DarkModeRoundedIcon sx={{color: `#000000`, fontSize: "25px"}}/>
                                    ) : (
                                        <LightModeRoundedIcon sx={{color: `#000000`, fontSize: "25px"}}/>
                                    )}
                                </IconButton>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                minWidth: 120
                            }}>
                                <NormalText text={t('TEXT.SELECT_LANGUAGE')}/>
                                <FormControl fullWidth>
                                    <InputLabel>{t('TEXT.SELECT_LANGUAGE')}</InputLabel>
                                    <Select
                                        id="select-language-input"
                                        data-testid='select-language-input'
                                        label={t('TEXT.SELECT_LANGUAGE')}
                                        name='select-language-input'
                                        value={languageValue}
                                        onChange={handleChangeLanguage}
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
                                        }}
                                    >
                                        <MenuItem value={'hu'}>Hu</MenuItem>
                                        <MenuItem value={'en'}>En</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>

                        {inputDisabled && (
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <SaveButton text={t('TEXT.EDIT')} onClick={handleEditClicked}/>
                            </Box>
                        )}
                    </Box>
                </BackgroundCard>

                <BackgroundCard>
                    <DataCard>
                        <Headline text={t('USER.PERSONAL_DATA')}/>
                        <Grid container spacing={12}>
                            {/* First Column */}
                            <Grid item xs={12} md={4}>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.FAMILY_NAME')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='familyName'
                                                    placeholder={t('USER.FAMILY_NAME')}
                                                    name='familyName'
                                                    data-testid='family-name-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.familyName}
                                                    onChange={handleChange('familyName')}
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
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.FIRST_NAME')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='firstName'
                                                    placeholder={t('USER.FIRST_NAME')}
                                                    name='firstName'
                                                    data-testid='first-name-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.firstName}
                                                    onChange={handleChange('firstName')}
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
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.GENDER')} required={true}/>
                                            <FormControl>
                                                <InputLabel>{t('USER.GENDER')}</InputLabel>
                                                <Select
                                                    id="gender"
                                                    placeholder={t('USER.GENDER')}
                                                    name='gender'
                                                    label={t('USER.GENDER')}
                                                    data-testid='gender'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.gender ?? ''}
                                                    onChange={handleChange('gender')}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <ClearIcon
                                                                    sx={{color: '#000000', cursor: 'pointer'}}
                                                                    onClick={() => setValues({...values, gender: '' })}
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
                                                    {Object.values(genderList).map((gender) => (
                                                        <MenuItem key={gender.value} value={gender.value}>
                                                            {gender.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.NATIONALITY')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='nationality'
                                                    placeholder={t('USER.NATIONALITY')}
                                                    name='nationality'
                                                    data-testid='nationality-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.nationality}
                                                    onChange={handleChange('nationality')}
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
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.BIRTH_PLACE')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='birthPlace'
                                                    placeholder={t('USER.BIRTH_PLACE')}
                                                    name='birthPlace'
                                                    data-testid='birth-place-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.birthPlace}
                                                    onChange={handleChange('birthPlace')}
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
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.BIRTH_DATE')} required={true}/>
                                            <FormControl required>
                                                <DatePicker
                                                    name='birthDate'
                                                    data-testid='birth-date-input'
                                                    //disabled={inputDisabled}
                                                    value={values.birthDate}
                                                    onChange={handleDateChange('birthDate')}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.ID_CARD_NUMBER')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='IDCardNumber'
                                                    placeholder={t('USER.ID_CARD_NUMBER')}
                                                    name='IDCardNumber'
                                                    data-testid='id-card-number-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.IDCardNumber}
                                                    onChange={handleChange('IDCardNumber')}
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
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.VALIDITY_DATE_OF_ID_CARD')} required={true}/>
                                            <FormControl required>
                                                <DatePicker
                                                    name='validityDateOfIDCard'
                                                    data-testid='validity-date-of-id-card-input'
                                                    //disabled={inputDisabled}
                                                    value={values.validityDateOfIDCard}
                                                    onChange={handleDateChange('validityDateOfIDCard')}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Second Column */}
                            <Grid item xs={12} md={4}>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.DRIVING_LICENCE_CATEGORIES')} required={true}/>
                                            <FormControl>
                                                <InputLabel>{t('USER.DRIVING_LICENCE_CATEGORIES')}</InputLabel>
                                                <Select //TODO: multiselect
                                                    id="drivingLicenceCategories"
                                                    placeholder={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                                    name='drivingLicenceCategories'
                                                    label={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                                    data-testid='driving-licence-categories'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.drivingLicenceCategories ?? ''}
                                                    onChange={handleChange('drivingLicenceCategories')}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <ClearIcon
                                                                    sx={{color: '#000000', cursor: 'pointer'}}
                                                                    onClick={() => setValues({...values, drivingLicenceCategories: '' })}
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
                                                    {Object.values(drivingLicenceList).map((drivingLicence) => (
                                                        <MenuItem key={drivingLicence} value={drivingLicence}>
                                                            {drivingLicence}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.DRIVING_LICENCE_NUMBER')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='drivingLicenceNumber'
                                                    placeholder={t('USER.DRIVING_LICENCE_NUMBER')}
                                                    name='drivingLicenceNumber'
                                                    data-testid='driving-licence-number-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.drivingLicenceNumber}
                                                    onChange={handleChange('drivingLicenceNumber')}
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
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.VALIDITY_DATE_OF_DRIVING_LICENCE')}
                                                        required={true}/>
                                            <FormControl required>
                                                <DatePicker
                                                    name='validityDateOfDrivingLicence'
                                                    data-testid='validity-date-of-driving-licence-input'
                                                    //disabled={inputDisabled}
                                                    value={values.validityDateOfDrivingLicence}
                                                    onChange={handleDateChange('validityDateOfDrivingLicence')}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.DATE_OF_MEDICAL_VISIT')} required={true}/>
                                            <FormControl required>
                                                <DatePicker
                                                    name='dateOfMedicalVisit'
                                                    data-testid='date-of-medical-visit-input'
                                                    //disabled={inputDisabled}
                                                    value={values.dateOfMedicalVisit}
                                                    onChange={handleDateChange('dateOfMedicalVisit')}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.VALIDITY_DATE_OF_MEDICAL_VISIT')}
                                                        required={true}/>
                                            <FormControl>
                                                <InputLabel>{t('USER.MEDICAL_VISIT_STATUS')}</InputLabel>
                                                {/*TODO*/}
                                                <Select
                                                    id="medicalVisitStatus"
                                                    placeholder={t('USER.MEDICAL_VISIT_STATUS')}
                                                    name='medicalVisitStatus'
                                                    label={t('USER.MEDICAL_VISIT_STATUS')}
                                                    data-testid='medical-visit-status'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.medicalVisitStatus ?? ''}
                                                    onChange={handleChange('medicalVisitStatus')}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <ClearIcon
                                                                    sx={{color: '#000000', cursor: 'pointer'}}
                                                                    onClick={() => setValues({...values, medicalVisitStatus: '' })}
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
                                                    {Object.values(drivingLicenceList).map((drivingLicence) => (
                                                        <MenuItem key={drivingLicence} value={drivingLicence}>
                                                            {drivingLicence}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
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
                                                <form onSubmit={handleSubmitImage}>
                                                    {/*<PhotoLibraryIcon sx={iconStyle} onChange={onInputChange}/>
                                                        <Typography sx={textStyle}>
                                                            {t('USER.UPLOAD_IMAGE')}
                                                        </Typography>*/}
                                                    <input
                                                        type="file"
                                                        label="Image"
                                                        name="myFile"
                                                        id='file-upload'
                                                        accept='.jpeg, .png, .jpg'
                                                        onChange={(e) => handleFileUpload(e)}
                                                    />
                                                    <img
                                                        src={allImage !== null ? (image.image || allImage[0]?.image) : ""}
                                                        alt="" height={100}
                                                        width={100}/>
                                                    <button type='submit'>Submit</button>
                                                </form>
                                                <button onClick={handleDeleteImage}>Delete Image</button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DataCard>

                    <DataCard>
                        <Headline text={t('USER.CONTACT_DATA')}/>
                        <Grid container spacing={12}>
                            {/* First Column */}
                            <Grid item xs={12} md={4}>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('TEXT.EMAIL')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='email'
                                                    placeholder={t('USER.EMAIL')}
                                                    name='email'
                                                    data-testid='email-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.email}
                                                    onChange={handleChange('email')}
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
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.PHONE_NUMBER')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='phoneNumber'
                                                    placeholder={t('USER.PHONE_NUMBER')}
                                                    name='phoneNumber'
                                                    data-testid='phone-number-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.phoneNumber}
                                                    onChange={handleChange('phoneNumber')}
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
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.COUNTRY')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='country'
                                                    placeholder={t('USER.COUNTRY')}
                                                    name='country'
                                                    data-testid='country-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.country}
                                                    onChange={handleChange('country')}
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
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.POSTCODE')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='postcode'
                                                    placeholder={t('USER.POSTCODE')}
                                                    name='postcode'
                                                    data-testid='postcode-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.postcode}
                                                    onChange={handleChange('postcode')}
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
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Second Column */}
                            <Grid item xs={12} md={4}>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.CITY')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='city'
                                                    placeholder={t('USER.CITY')}
                                                    name='city'
                                                    data-testid='city-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.city}
                                                    onChange={handleChange('city')}
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
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.NAME_OF_PUBLIC_AREA')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='nameOfPublicArea'
                                                    placeholder={t('USER.NAME_OF_PUBLIC_AREA')}
                                                    name='nameOfPublicArea'
                                                    data-testid='name-of-public-area-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.nameOfPublicArea}
                                                    onChange={handleChange('nameOfPublicArea')}
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
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.TYPE_OF_PUBLIC_AREA')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='typeOfPublicArea'
                                                    placeholder={t('USER.TYPE_OF_PUBLIC_AREA')}
                                                    name='typeOfPublicArea'
                                                    data-testid='type-of-public-area-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.typeOfPublicArea}
                                                    onChange={handleChange('typeOfPublicArea')}
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
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.HOUSE_NUMBER')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='houseNumber'
                                                    placeholder={t('USER.HOUSE_NUMBER')}
                                                    name='houseNumber'
                                                    data-testid='house-number-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.houseNumber}
                                                    onChange={handleChange('houseNumber')}
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
                                                />
                                            </FormControl>
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
                        <Headline text={t('USER.EMPLOYEE_DATA')}/>
                        <Grid container spacing={12}>
                            {/* First Column */}
                            <Grid item xs={12} md={4}>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.DATE_OF_REGISTRATION')} required={true}/>
                                            <FormControl required>
                                                <DatePicker
                                                    name='dateOfRegistration'
                                                    data-testid='date-of-registration-input'
                                                    //disabled={inputDisabled}
                                                    value={values.dateOfRegistration}
                                                    onChange={handleDateChange('dateOfRegistration')}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.START_DATE_OF_CONTRACT')} required={true}/>
                                            <FormControl required>
                                                <DatePicker
                                                    name='startDateOfContract'
                                                    data-testid='start-date-of-contract-input'
                                                    //disabled={inputDisabled}
                                                    value={values.startDateOfContract}
                                                    onChange={handleDateChange('startDateOfContract')}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.END_DATE_OF_CONTRACT')} required={false}/>
                                            <FormControl required>
                                                <DatePicker
                                                    name='endDateOfContract'
                                                    data-testid='end-date-of-contract-input'
                                                    //disabled={inputDisabled}
                                                    value={values.endDateOfContract}
                                                    onChange={handleDateChange('endDateOfContract')}
                                                    //dateFormat="dd/MM/yyyy"
                                                    className={'date-picker-class'}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.POSITION')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='position'
                                                    placeholder={t('USER.POSITION')}
                                                    name='position'
                                                    data-testid='position-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.position}
                                                    onChange={handleChange('position')}
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
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Second Column */}
                            <Grid item xs={12} md={4}>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.LINE_MANAGER')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='lineManager'
                                                    placeholder={t('USER.LINE_MANAGER')}
                                                    name='lineManager'
                                                    data-testid='line-manager-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.lineManager}
                                                    onChange={handleChange('lineManager')}
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
                                                />
                                            </FormControl>
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
                        <Headline text={t('USER.OTHER_DATA')}/>
                        <Grid container spacing={12}>
                            {/* First Column */}
                            <Grid item xs={12} md={4}>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <NormalText text={t('USER.HEALTH_PROBLEM')} required={true}/>
                                            <FormControl required>
                                                <TextField
                                                    id='healthProblem'
                                                    placeholder={t('USER.HEALTH_PROBLEM')}
                                                    name='healthProblem'
                                                    data-testid='health-problem-input'
                                                    disabled={inputDisabled}
                                                    required
                                                    value={values.healthProblem}
                                                    onChange={handleChange('healthProblem')}
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
                                                />
                                            </FormControl>
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
                        <SaveButton text={t('TEXT.SAVE')} type='submit'/>
                    </Box>
                </BackgroundCard>
            {/*</form>*/}
        </Box>
);
};

export default UserEdit;