import {
    Box,
    Grid,
} from "@mui/material";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import NormalText from "../../components/text/NormalText.tsx";
import {useNavigate, useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {carEditFormSchema, CarEditFormSchema} from "./schemas/car-edit-form-schema.ts";

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
        <Box>
            <Grid item container direction="column" spacing={2}>
                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Márka'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Fiat Ducato'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Típus'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Maxi 250 L3H2 2.3 MJet 3.5'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box sx={{backgroundColor: "#000000", width: 200, height: 200}} />
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Rendszám'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'ABC-123'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Kivitel'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Kisbusz'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Üzemanyag'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'gázolaj'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Gyártási év'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2023'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Ülések száma'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'6'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Teljesítmény'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'55 kW, 75 LE'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Saját teher'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'1790 kg'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Hasznos teher'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'900 kg'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Vontatás'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'420 kg'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Raktér'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'150 *200*300 cm'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Forgalmi engedély száma'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'123456789'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Alvázszám'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'12345678PA'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Első nyilvántartásba vétel'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2023.01.01.'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Adatbázis regisztráció'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2023.01.01.'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Legutóbbi műszaki vizsga időpontja'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2023.01.01.'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Legutóbbi szervíz időpontja'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2023.11.24.'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Box sx={{ display: 'inline', paddingLeft: 130}}>
                <CancelButton text={t('TEXT.BACK')} onClick={() => navigate(-1)}/>
                <SaveButton text={t('TEXT.EDIT')} onClick={onSubmit} />
            </Box>
        </Box>
    );
};

export default CarTabData;