import {
    Box,
    Grid, SxProps, Theme, Typography,
} from "@mui/material";
import CancelButton from "../../../components/button/CancelButton";
import SaveButton from "../../../components/button/SaveButton";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import NormalText from "../../../components/text/NormalText";
import {useNavigate, useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {carEditFormSchema, CarEditFormSchema} from "../schemas/car-edit-form-schema";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

const textStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#A3A3A3',
}

const normalTextStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#000000',
    paddingTop: 1
}

const paramTextStyle: SxProps<Theme> = {
    fontWeight: 'normal',
    fontSize: '18px',
    color: '#A3A3A3',
    paddingTop: 5
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

const CarTabData = ({ isEditing = false, isInputDisabled }: Props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);
    const [isProfilePage, setIsProfilePage] = useState(true);
    const [t, i18n] = useTranslation();

    const {
        control,
        setValue,
        reset,
        handleSubmit,
        formState: { isValid },
    } = useForm<CarEditFormSchema>({
        defaultValues: {
        },
        resolver: zodResolver(carEditFormSchema(isEditing)),
        mode: 'all',
    });

    const onSubmit = handleSubmit((data) => {
        let submitData = data as any;
    }, (errors) => {console.log(errors)});

    const handleEditClicked = () => {
        setInputDisabled(!inputDisabled);
    };

    return (
        <Box sx={{paddingTop: 7, paddingLeft: 5}}>
            <Grid container spacing={12}>
                {/* First Column */}
                <Grid item xs={12} md={4}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{`${t('CAR.BRAND')}`}</Typography>
                                <Typography sx={normalTextStyle}>{'Fiat Ducato'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{`${t('CAR.TYPE')}`}</Typography>
                                <Typography sx={normalTextStyle}>{'Maxi 250 L3H2 2.3 MJet 3.5'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{`${t('CAR.LICENCE_PLATE')}`}</Typography>
                                <Typography sx={normalTextStyle}>{'ABC-123'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{`${t('CAR.CAR_FUNCTIONAL_DESIGN')}`}</Typography>
                                <Typography sx={normalTextStyle}>{'Kisbusz'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{`${t('CAR.FUEL')}`}</Typography>
                                <Typography sx={normalTextStyle}>{'gázolaj'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{`${t('CAR.PRODUCTION_YEAR')}`}</Typography>
                                <Typography sx={normalTextStyle}>{'2023'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{`${t('CAR.NUMBER_OF_SEATS')}`}</Typography>
                                <Typography sx={normalTextStyle}>{'6'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Teljesítmény'}</Typography>
                                <Typography sx={normalTextStyle}>{'55 kW, 75 LE'}</Typography>
                            </Box>
                        </Grid>

                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Saját teher'}</Typography>
                                <Typography sx={normalTextStyle}>{'1790 kg'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Hasznos teher'}</Typography>
                                <Typography sx={normalTextStyle}>{'900 kg'}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Column */}
                <Grid item xs={12} md={4}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Vontatás'}</Typography>
                                <Typography sx={normalTextStyle}>{'420 kg'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Raktér'}</Typography>
                                <Typography sx={normalTextStyle}>{'150 *200*300 cm'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Forgalmi engedély száma'}</Typography>
                                <Typography sx={normalTextStyle}>{'123456789'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Alvázszám'}</Typography>
                                <Typography sx={normalTextStyle}>{'12345678PA'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Első nyilvántartásba vétel'}</Typography>
                                <Typography sx={normalTextStyle}>{'2023.01.01.'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Adatbázis regisztráció'}</Typography>
                                <Typography sx={normalTextStyle}>{'2023.01.01.'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Legutóbbi műszaki vizsga időpontja'}</Typography>
                                <Typography sx={normalTextStyle}>{'2023.01.01.'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Legutóbbi szervíz időpontja'}</Typography>
                                <Typography sx={normalTextStyle}>{'2023.11.24.'}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Column */}
                <Grid item xs={12} md={4}>
                    <Grid container direction="column" spacing={3}>
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

            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <CancelButton text={t('TEXT.BACK')} onClick={() => navigate(-1)}/>
                <SaveButton text={t('TEXT.SAVE')} onClick={onSubmit} />
            </Box>
        </Box>
    );
};

export default CarTabData;