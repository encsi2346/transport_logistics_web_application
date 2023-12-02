import PageHeader from "../../components/text/PageHeader.tsx";
import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import DataCard from "../../components/layout/DataCard.tsx";
import Headline from "../../components/text/Headline.tsx";
import {Box, Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import TextFieldInput from "../../components/inputField/TextFieldInput.tsx";
import {useState} from "react";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useForm} from "react-hook-form";
import { UserEditFormSchema } from "./schemas/user-edit-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import { userEditFormSchema } from "./schemas/user-edit-form-schema.ts";
import SelectInput from "../../components/inputField/SelectInput.tsx";
import NormalText from "../../components/text/NormalText.tsx";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import DatePickerInput from "../../components/inputField/DatePickerInput.tsx";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const UserEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    const { t } = useTypeSafeTranslation();
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
            email: '',
            privilegeLevel: 2,
            givenName: '',
            familyName: '',
            birthPlace: '',
            phoneNumber: '',
            address: '',
            jobTitle: '',
            hourlyWage: 0,
            contractType: 1,
            expectedMonthlyHours: 40,
        },
        resolver: zodResolver(userEditFormSchema(isEditing)),
        mode: 'all',
    });

    return (
        <Box>
            <PageHeader text={'Új alkalmazott felvétele'}/>
            <BackgroundCard>
                <DataCard>
                    <Headline text={'Személyes adatok'} />
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={5}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.FAMILY_NAME')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.FAMILY_NAME')}
                                    control={control}
                                    name='familyName'
                                    type='text'
                                    data-testid='family-name-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.FIRST_NAME')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.FIRST_NAME')}
                                    control={control}
                                    name='firstName'
                                    type='text'
                                    data-testid='first-name-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                <NormalText text={t('TEXT.GENDER')} />
                                <SelectInput
                                    label={t('TEXT.GENDER')}
                                    control={control}
                                    name='gender'
                                    data-testid='gender-input'
                                    disabled={inputDisabled}
                                    //options={enumToOptions(userRoles)}
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
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.NATIONALITY')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.NATIONALITY')}
                                    control={control}
                                    name='nationality'
                                    type='text'
                                    data-testid='nationality-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                <NormalText text={t('TEXT.BIRTH_PLACE')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.BIRTH_PLACE')}
                                    control={control}
                                    name='birthPlace'
                                    type='text'
                                    data-testid='birth-place-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.BIRTH_DATE')} />
                                <DatePickerInput
                                    label={t('TEXT.BIRTH_DATE')}
                                    control={control}
                                    name='birthDate'
                                    data-testid='birth-date-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                <NormalText text={t('TEXT.ID_CARD_NUMBER')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.ID_CARD_NUMBER')}
                                    control={control}
                                    name='IDCardNumber'
                                    type='text'
                                    data-testid='id-card-number-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.VALIDITY_DATE_OF_ID_CARD')} />
                                <DatePickerInput
                                    label={t('TEXT.VALIDITY_DATE_OF_ID_CARD')}
                                    control={control}
                                    name='validityDateOfIDCard'
                                    data-testid='validity-date-of-id-card'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                <NormalText text={t('TEXT.DRIVING_LICENCE_NUMBER')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.DRIVING_LICENCE_NUMBER')}
                                    control={control}
                                    name='drivingLicenceNumber'
                                    type='text'
                                    data-testid='driving-licence-number'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.DRIVING_LICENCE_CATEGORIES')} />
                                <SelectInput //TODO: multiselect
                                    label={t('TEXT.DRIVING_LICENCE_CATEGORIES')}
                                    control={control}
                                    name='drivingLicenceCategories'
                                    data-testid='driving-licence-categories'
                                    disabled={inputDisabled}
                                    //options={enumToOptions(userRoles)}
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
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.VALIDITY_DATE_OF_DRIVING_LICENCE')} />
                                <DatePickerInput
                                    label={t('TEXT.VALIDITY_DATE_OF_DRIVING_LICENCE')}
                                    control={control}
                                    name='validityDateOfDrivingLicence'
                                    data-testid='validity-date-of-driving-licence'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                <NormalText text={t('TEXT.DATE_OF_MEDICAL_VISIT')} />
                                <DatePickerInput
                                    label={t('TEXT.DATE_OF_MEDICAL_VISIT')}
                                    control={control}
                                    name='dateOfMedicalVisit'
                                    data-testid='date-of-medical-visit'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.VALIDITY_DATE_OF_MEDICAL_VISIT')} />
                                <DatePickerInput
                                    label={t('TEXT.VALIDITY_DATE_OF_MEDICAL_VISIT')}
                                    control={control}
                                    name='validityDateOfMedicalVisit'
                                    data-testid='validity-date-of-medical-visit'
                                    disabled={inputDisabled}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DataCard>

                <DataCard>
                    <Headline text={'Elérhetőség'} />
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={5}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.EMAIL')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.EMAIL')}
                                    control={control}
                                    name='email'
                                    type='text'
                                    data-testid='email'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.PHONE_NUMBER')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.PHONE_NUMBER')}
                                    control={control}
                                    name='phoneNumber'
                                    type='text'
                                    data-testid='phone-number'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.COUNTRY')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.COUNTRY')}
                                    control={control}
                                    name='country'
                                    type='text'
                                    data-testid='country'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.POSTCODE')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.POSTCODE')}
                                    control={control}
                                    name='postcode'
                                    type='text'
                                    data-testid='postcode'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.CITY')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.CITY')}
                                    control={control}
                                    name='city'
                                    type='text'
                                    data-testid='city'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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
                </DataCard>

                <DataCard>
                    <Headline text={t('TEXT.EMPLOYEE_STATUS')} />
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={5}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.DATE_OF_REGISTRATION')} />
                                <DatePickerInput
                                    label={t('TEXT.DATE_OF_REGISTRATION')}
                                    control={control}
                                    name='dateOfRegistration'
                                    data-testid='date-of-registration'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.START_DATE_OF_CONTRACT')} />
                                <DatePickerInput
                                    label={t('TEXT.START_DATE_OF_CONTRACT')}
                                    control={control}
                                    name='startDateOfContract'
                                    data-testid='start-date-of-contract'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.END_DATE_OF_CONTRACT')} />
                                <DatePickerInput
                                    label={t('TEXT.END_DATE_OF_CONTRACT')}
                                    control={control}
                                    name='endDateOfContract'
                                    data-testid='end-date-of-contract'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.POSITION')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.POSITION')}
                                    control={control}
                                    name='position'
                                    type='text'
                                    data-testid='position'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.LINE_MANAGER')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.LINE_MANAGER')}
                                    control={control}
                                    name='lineManager'
                                    type='text'
                                    data-testid='line-manager'
                                    disabled={inputDisabled}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DataCard>

                <DataCard>
                    <Headline text={'Egyéb'} />
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={5}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={'Egészségügyi problémák'} />
                                <TextFieldInput
                                    placeholder={t('TEXT.DRIVING_LICENCE_NUMBER')}
                                    control={control}
                                    name='drivingLicenceNumber'
                                    type='text'
                                    data-testid='driving-licence-number'
                                    disabled={inputDisabled}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DataCard>

                <Box sx={{ display: 'inline', paddingLeft: 142}}>
                    <CancelButton text={'Mégsem'} />
                    <SaveButton text={'Mentés'} />
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default UserEdit;