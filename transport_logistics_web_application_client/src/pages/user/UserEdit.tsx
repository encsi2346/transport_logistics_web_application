import PageHeader from "../../components/text/PageHeader.tsx";
import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import DataCard from "../../components/layout/DataCard.tsx";
import Headline from "../../components/text/Headline.tsx";
import {Box, Grid, IconButton, InputAdornment} from "@mui/material";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import TextFieldInput from "../../components/inputField/TextFieldInput.tsx";
import {useEffect, useState} from "react";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useForm} from "react-hook-form";
import { UserEditFormSchema } from "./schemas/user-edit-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import { userEditFormSchema } from "./schemas/user-edit-form-schema.ts";
import SelectInput from "../../components/inputField/SelectInput.tsx";
import NormalText from "../../components/text/NormalText.tsx";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import DatePickerInput from "../../components/inputField/DatePickerInput.tsx";
import {useNavigate, useParams} from "react-router-dom";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const UserEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    const { t } = useTypeSafeTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);

    const gender = {
        0: 'TEXT.MEN',
        1: 'TEXT.WOMEN',
    };

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
        resolver: zodResolver(userEditFormSchema(isEditing)),
        mode: 'all',
    });

    const createUser = (data) => {
        //TODO
        navigate(`/users/${parseInt(data, 10)}`);
    };

    const updateUser = (id, data) => {
        //TODO
    };

    useEffect(() => {
        if (id) {
            //TODO: get user
        }
    }, [id, reset]);

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

    return (
        <Box>
            <PageHeader text={t('TEXT.ADD_NEW_USER')}/>
            {inputDisabled && (
                <Box sx={{ display: 'inline', paddingLeft: 120}}>
                    <SaveButton text={t('TEXT.EDIT')} onClick={handleEditClicked} />
                </Box>
            )}
            <BackgroundCard>
                <DataCard>
                    <Headline text={t('TEXT.PERSONAL_DATA')} />
                        <Grid item container direction="column" spacing={2}>
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.FAMILY_NAME')} />
                                        <TextFieldInput
                                            placeholder={t('TEXT.FAMILY_NAME')}
                                            control={control}
                                            name='familyName'
                                            type='text'
                                            data-testid='family-name-input'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.FIRST_NAME')} />
                                        <TextFieldInput
                                            placeholder={t('TEXT.FIRST_NAME')}
                                            control={control}
                                            name='firstName'
                                            type='text'
                                            data-testid='first-name-input'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.GENDER')} />
                                        <SelectInput
                                            placeholder={t('TEXT.GENDER')}
                                            control={control}
                                            name='gender'
                                            data-testid='gender-input'
                                            disabled={inputDisabled}
                                            //options={enumToOptions(userRoles)}
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
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.NATIONALITY')} />
                                        <TextFieldInput
                                            placeholder={t('TEXT.NATIONALITY')}
                                            control={control}
                                            name='nationality'
                                            type='text'
                                            data-testid='nationality-input'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.BIRTH_PLACE')} />
                                        <TextFieldInput
                                            placeholder={t('TEXT.BIRTH_PLACE')}
                                            control={control}
                                            name='birthPlace'
                                            type='text'
                                            data-testid='birth-place-input'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.BIRTH_DATE')} />
                                        <DatePickerInput
                                            placeholder={t('TEXT.BIRTH_DATE')}
                                            control={control}
                                            name='birthDate'
                                            data-testid='birth-date-input'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.ID_CARD_NUMBER')} />
                                        <TextFieldInput
                                            placeholder={t('TEXT.ID_CARD_NUMBER')}
                                            control={control}
                                            name='IDCardNumber'
                                            type='text'
                                            data-testid='id-card-number-input'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.VALIDITY_DATE_OF_ID_CARD')} />
                                        <DatePickerInput
                                            placeholder={t('TEXT.VALIDITY_DATE_OF_ID_CARD')}
                                            control={control}
                                            name='validityDateOfIDCard'
                                            data-testid='validity-date-of-id-card'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.DRIVING_LICENCE_CATEGORIES')} />
                                        <SelectInput //TODO: multiselect
                                            placeholder={t('TEXT.DRIVING_LICENCE_CATEGORIES')}
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
                            </Grid>
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.DRIVING_LICENCE_NUMBER')} />
                                        <TextFieldInput
                                            placeholder={t('TEXT.DRIVING_LICENCE_NUMBER')}
                                            control={control}
                                            name='drivingLicenceNumber'
                                            type='text'
                                            data-testid='driving-licence-number'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.VALIDITY_DATE_OF_DRIVING_LICENCE')} />
                                        <DatePickerInput
                                            placeholder={t('TEXT.VALIDITY_DATE_OF_DRIVING_LICENCE')}
                                            control={control}
                                            name='validityDateOfDrivingLicence'
                                            data-testid='validity-date-of-driving-licence'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item container direction="row" xs={4} md={8} spacing={6}>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.DATE_OF_MEDICAL_VISIT')} />
                                        <DatePickerInput
                                            placeholder={t('TEXT.DATE_OF_MEDICAL_VISIT')}
                                            control={control}
                                            name='dateOfMedicalVisit'
                                            data-testid='date-of-medical-visit'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <NormalText text={t('TEXT.VALIDITY_DATE_OF_MEDICAL_VISIT')} />
                                        <DatePickerInput
                                            placeholder={t('TEXT.VALIDITY_DATE_OF_MEDICAL_VISIT')}
                                            control={control}
                                            name='validityDateOfMedicalVisit'
                                            data-testid='validity-date-of-medical-visit'
                                            disabled={inputDisabled}
                                            required
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container direction="column" spacing={2}>
                            <Grid item container>
                                <Grid item>
                                    <Box sx={{backgroundColor: "#ffffff", width: 200, height: 200}}> //TODO: imagepicker

                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                </DataCard>

                <DataCard>
                    <Headline text={t('TEXT.CONTACT_DATA')} />
                    <Grid container spacing={2}>
                        <Grid item container direction="row" xs={4} md={10} spacing={6}>
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.EMAIL')} />
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
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.PHONE_NUMBER')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.PHONE_NUMBER')}
                                        control={control}
                                        name='phoneNumber'
                                        type='text'
                                        data-testid='phone-number'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={4} md={10} spacing={6}>
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.COUNTRY')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.COUNTRY')}
                                        control={control}
                                        name='country'
                                        type='text'
                                        data-testid='country'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.POSTCODE')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.POSTCODE')}
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
                        <Grid item container direction="row" xs={4} md={10} spacing={6}>
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.CITY')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.CITY')}
                                        control={control}
                                        name='city'
                                        type='text'
                                        data-testid='city'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.NAME_OF_PUBLIC_AREA')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.NAME_OF_PUBLIC_AREA')}
                                        control={control}
                                        name='nameOfPublicArea'
                                        type='text'
                                        data-testid='name-of-public-area'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={4} md={10} spacing={6}>
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.TYPE_OF_PUBLIC_AREA')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.TYPE_OF_PUBLIC_AREA')}
                                        control={control}
                                        name='typeOfPublicArea'
                                        type='text'
                                        data-testid='type-of-public-area'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.HOUSE_NUMBER')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.HOUSE_NUMBER')}
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
                </DataCard>

                <DataCard>
                    <Headline text={t('TEXT.EMPLOYEE_STATUS')} />
                    <Grid container spacing={2}>
                        <Grid item container direction="row" xs={4} md={10} spacing={6}>
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.DATE_OF_REGISTRATION')} />
                                    <DatePickerInput
                                        placeholder={t('TEXT.DATE_OF_REGISTRATION')}
                                        control={control}
                                        name='dateOfRegistration'
                                        data-testid='date-of-registration'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={4} md={10} spacing={6}>
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.START_DATE_OF_CONTRACT')} />
                                    <DatePickerInput
                                        placeholder={t('TEXT.START_DATE_OF_CONTRACT')}
                                        control={control}
                                        name='startDateOfContract'
                                        data-testid='start-date-of-contract'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.END_DATE_OF_CONTRACT')} />
                                    <DatePickerInput
                                        placeholder={t('TEXT.END_DATE_OF_CONTRACT')}
                                        control={control}
                                        name='endDateOfContract'
                                        data-testid='end-date-of-contract'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={4} md={10} spacing={6}>
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.POSITION')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.POSITION')}
                                        control={control}
                                        name='position'
                                        type='text'
                                        data-testid='position'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.LINE_MANAGER')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.LINE_MANAGER')}
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
                </DataCard>

                <DataCard>
                    <Headline text={t('TEXT.OTHER_DATA')} />
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={5}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <NormalText text={t('TEXT.HEALTH_PROBLEM')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.HEALTH_PROBLEM')}
                                    control={control}
                                    name='healthProblem'
                                    type='text'
                                    data-testid='health-problem'
                                    disabled={inputDisabled}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DataCard>

                <Box sx={{ display: 'inline', paddingLeft: 130}}>
                    <CancelButton text={t('TEXT.CANCEL')} onClick={() => navigate(-1)}/>
                    <SaveButton text={t('TEXT.SAVE')} onClick={onSubmit} /*disabled={!isValid}*//>
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default UserEdit;