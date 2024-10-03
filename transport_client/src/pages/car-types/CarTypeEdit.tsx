import PageHeader from "../../components/text/PageHeader";
import BackgroundCard from "../../components/layout/BackgroundCard";
import DataCard from "../../components/layout/DataCard";
import Headline from "../../components/text/Headline";
import {Box, Grid, IconButton, InputAdornment} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate, useParams} from "react-router-dom";
import TextFieldInput from "../../components/inputField/TextFieldInput";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SelectInput from "../../components/inputField/SelectInput";
import {CarTypeEditFormSchema, carTypeEditFormSchema} from "./schemas/car-type-edit-form-schema";

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
            <PageHeader text={t('CAR_TYPES.ADD_NEW_CAR_TYPE')}/>
            <BackgroundCard>
                <DataCard>
                    <Headline text={t('CAR_TYPES.CAR_TYPE_DATA')} />
                    <Grid item container direction="column" spacing={2}>
                        <Grid item container direction="row" xs={4} md={8} spacing={6}>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <NormalText text={t('CAR_TYPES.CAR_TYPE_NAME')} />
                                    <TextFieldInput
                                        placeholder={t('CAR_TYPES.CAR_TYPE_NAME')}
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
                                    <NormalText text={t('CAR_TYPES.CAR_FUNCTIONAL_DESIGN')} />
                                    <SelectInput
                                        placeholder={t('CAR_TYPES.CAR_FUNCTIONAL_DESIGN')}
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
                                    <NormalText text={t('CAR_TYPES.PERFORMANCE')} />
                                    <TextFieldInput
                                        placeholder={t('CAR_TYPES.PERFORMANCE')}
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
                                    <NormalText text={t('CAR_TYPES.OWN_WEIGHT')} />
                                    <TextFieldInput
                                        placeholder={t('CAR_TYPES.OWN_WEIGHT')}
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
                                    <NormalText text={t('CAR_TYPES.NUMBER_OF_SEATS')} />
                                    <SelectInput
                                        placeholder={t('CAR_TYPES.NUMBER_OF_SEATS')}
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
                                    <NormalText text={t('CAR_TYPES.FUEL')} />
                                    <SelectInput
                                        placeholder={t('CAR_TYPES.FUEL')}
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
                                    <NormalText text={t('CAR_TYPES.USEFUL_WEIGHT')} />
                                    <TextFieldInput
                                        placeholder={t('CAR_TYPES.USEFUL_WEIGHT')}
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

                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <CancelButton text={t('TEXT.CANCEL')} onClick={() => navigate(-1)}/>
                    <SaveButton text={t('TEXT.SAVE')} onClick={onSubmit} />
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default CarTypeEdit;