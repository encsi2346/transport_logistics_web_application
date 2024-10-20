import PageHeader from "../../components/text/PageHeader";
import BackgroundCard from "../../components/layout/BackgroundCard";
import {Box, TextField} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import DataCard from "../../components/layout/DataCard";
import Headline from "../../components/text/Headline";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const CarEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);
    const [t, i18n] = useTranslation();

    const handleLoadCar = async (id) => {
        const getResponse = await fetch(
            `http://localhost:3001/api/cars/${id}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getCarData = await getResponse.json();
        const getStatus = getResponse.status;
        console.log('getCarData', getCarData);
        console.log('getUserStatus', getStatus);
        //setCar(getCarData);
    }

    useEffect(() => {
        handleLoadCar(id);
    }, [id]);

    return (
        <Box>
            <PageHeader text={t('CAR.NEW_CAR')}/>
            <BackgroundCard>
                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                    <NormalText text={t('CAR.SELECTED_CAR_TYPE')} />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </Box>
                <DataCard>
                    <Headline text={t('CAR_TYPES.CAR_TYPE_DATA')} />
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={t('CAR_TYPES.CAR_FUNCTIONAL_DESIGN')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={t('CAR_TYPES.PERFORMANCE')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={t('CAR_TYPES.OWN_WEIGHT')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={t('CAR_TYPES.NUMBER_OF_SEATS')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={t('CAR_TYPES.FUEL')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={t('CAR_TYPES.USEFUL_WEIGHT')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                    </Box>
                </DataCard>
                <DataCard>
                    <Headline text={t('CAR.CAR_DATA')} />
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={t('CAR.LICENCE_PLATE')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={t('CAR.FORG')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={t('CAR.ALVAZ')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={t('CAR.PRODUCTION_YEAR')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={t('CAR.FIRST_REG')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                    </Box>
                </DataCard>

                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <CancelButton text={t('TEXT.CANCEL')} onClick={() => navigate(-1)}/>
                    <SaveButton text={t('TEXT.SAVE')} onClick={() => console.log('save car')} />
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default CarEdit;