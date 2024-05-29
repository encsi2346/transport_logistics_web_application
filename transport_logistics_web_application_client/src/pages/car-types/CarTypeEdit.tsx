import PageHeader from "../../components/text/PageHeader.tsx";
import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import DataCard from "../../components/layout/DataCard.tsx";
import Headline from "../../components/text/Headline.tsx";
import {Box, Grid, IconButton, InputAdornment} from "@mui/material";
import NormalText from "../../components/text/NormalText.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useNavigate, useParams} from "react-router-dom";
import TextFieldInput from "../../components/inputField/TextFieldInput.tsx";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SelectInput from "../../components/inputField/SelectInput.tsx";
import {CarTypeEditFormSchema, carTypeEditFormSchema} from "./schemas/car-type-edit-form-schema.ts";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const CarTypeEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    const { t } = useTypeSafeTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);

    const {
        control,
        setValue,
        reset,
        handleSubmit,
        formState: { isValid },
    } = useForm<CarTypeEditFormSchema>({
        defaultValues: {
            carTypeName: '',
            carFunctionalDesign: '',
            performance: '',
            ownWeight: '',
            numberOfSeats: '',
            fuel: '',
            usefulWeight: '',
        },
        resolver: zodResolver(carTypeEditFormSchema(isEditing)),
        mode: 'all',
    });

    const createCarType = (data) => {
        //TODO
        navigate(`/users/${parseInt(data, 10)}`);
    };

    const updateCarType = (id, data) => {
        //TODO
    };

    const onSubmit = handleSubmit((data) => {
        let submitData = data as any;

        if (isEditing) {
            setInputDisabled(true);
            updateCarType(id, submitData);
        } else {
            setInputDisabled(true);
            createCarType(submitData);
        }
    }, (errors) => {console.log(errors)});

    const handleEditClicked = () => {
        setInputDisabled(!inputDisabled);
    };

    return (
        <Box>
            <PageHeader text={t('TEXT.ADD_NEW_CAR_TYPE')}/>
            <BackgroundCard>
                <DataCard>
                    <Headline text={t('TEXT.CAR_TYPE_DATA')} />
                    <Grid item container direction="column" spacing={2}>
                        <Grid item container direction="row" xs={4} md={8} spacing={6}>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.CAR_TYPE_NAME')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.CAR_TYPE_NAME')}
                                        control={control}
                                        name='carTypeName'
                                        type='text'
                                        data-testid='car-type-name-input'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={4} md={8} spacing={6}>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.CAR_FUNCTIONAL_DESIGN')} />
                                    <SelectInput
                                        placeholder={t('TEXT.CAR_FUNCTIONAL_DESIGN')}
                                        control={control}
                                        name='carFunctionalDesign'
                                        data-testid='car-functional-design-input'
                                        disabled={inputDisabled}
                                        //options={enumToOptions(userRoles)} //TODO
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={() => setValue('carFunctionalDesign', undefined)} edge="end" >
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
                                    <NormalText text={t('TEXT.PERFORMANCE')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.PERFORMANCE')}
                                        control={control}
                                        name='performance'
                                        type='number'
                                        data-testid='performance-input'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={4} md={8} spacing={6}>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.OWN_WEIGHT')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.OWN_WEIGHT')}
                                        control={control}
                                        name='ownWeight'
                                        type='number'
                                        data-testid='own-weight-input'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('TEXT.NUMBER_OF_SEATS')} />
                                    <SelectInput
                                        placeholder={t('TEXT.NUMBER_OF_SEATS')}
                                        control={control}
                                        name='numberOfSeats'
                                        data-testid='number-of-seats-input'
                                        disabled={inputDisabled}
                                        //options={enumToOptions(userRoles)}
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={() => setValue('numberOfSeats', undefined)} edge="end" >
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
                                    <NormalText text={t('TEXT.FUEL')} />
                                    <SelectInput
                                        placeholder={t('TEXT.FUEL')}
                                        control={control}
                                        name='fuel'
                                        data-testid='fuel-input'
                                        disabled={inputDisabled}
                                        //options={enumToOptions(userRoles)} //TODO
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={() => setValue('fuel', undefined)} edge="end" >
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
                                    <NormalText text={t('TEXT.USEFUL_WEIGHT')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.USEFUL_WEIGHT')}
                                        control={control}
                                        name='usefulWeight'
                                        type='number'
                                        data-testid='useful-weight-input'
                                        disabled={inputDisabled}
                                        required
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </DataCard>

                <Box sx={{ display: 'inline', paddingLeft: 130}}>
                    <CancelButton text={t('TEXT.CANCEL')} onClick={() => navigate(-1)} />
                    <SaveButton text={t('TEXT.SAVE')} onClick={onSubmit} />
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default CarTypeEdit;