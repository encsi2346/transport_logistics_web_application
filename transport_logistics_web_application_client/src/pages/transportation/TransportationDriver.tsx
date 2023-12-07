import {Box, Grid, IconButton, InputAdornment, Typography} from "@mui/material";
import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useNavigate} from "react-router-dom";
import {TransportationSteps} from "./enums/transportation-steps.ts";
import {useTransportationStore} from "./stores/useTransportationStore.tsx";
import useTransportationDriver from "./hooks/useTransportationDriver.tsx";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SelectInput from "../../components/inputField/SelectInput.tsx";
import {useState} from "react";

const TransportationDriver = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const [positions, setPositions] = useState([
        {
            label: `${t('TEXT.DRIVER')}`,
            value: 1
        },
        {
            label: `${t('TEXT.PASSENGER')}`,
            value: 2
        }
    ]);
    const [users, setUsers]=useState([
        {
            id: 1,
            name: 'Példa Lajos',
            position: 'driver'
        },
        {
            id: 2,
            name: 'Teszt Géza',
            position: 'passenger'
        },
        {
            id: 3,
            name: 'Példa Aladár',
            position: 'passenger'
        },
        {
            id: 4,
            name: 'Teszt Tihamér',
            position: 'driver'
        },
    ])
    const thisStep = TransportationSteps.DRIVER;
    const currentStep = useTransportationStore((state) => state.currentStep);
    const isStepDone = currentStep > thisStep;
    const isActiveStep = thisStep === currentStep;

    const setCurrentStep = useTransportationStore((state) => state.setCurrentStep);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const { control, isValid, preValidationError, onSubmit} = useTransportationDriver();

    const handleCancelClicked = () => {
        navigate('..');
    };

    return (
        <form autoComplete='off' noValidate onSubmit={(e) => e.preventDefault()}>
            {isActiveStep && (
                <Box>
                    <Grid item container direction="row">
                        <Grid item xs={4} md={3}>
                            <Box sx={{ width: 300, height: 500}}>
                                <BackgroundCard>
                                    <SelectInput
                                        label={t('TEXT.POSITION')}
                                        control={control}
                                        name='userPosition'
                                        data-testid='user-position-input'
                                        options={positions}
                                        required
                                        InputProps={{
                                            sx: {
                                                '.MuiSelect-icon': {
                                                    display: 'none',
                                                },
                                            },
                                        }}
                                    />
                                </BackgroundCard>
                                <Grid item container direction="column" sx={{ marginTop: -53, marginLeft: 7}}>
                                    <Grid item xs={4} md={3}>
                                        <Box sx={{ width: 190, height: 60, borderRadius: '17px', backgroundColor: '#c8c8c8'}}>
                                            <Box sx={{ width: 15, height: 15, backgroundColor: '#07ea00', borderRadius: '30px', marginLeft: 2}}/>
                                            <Typography sx={{ marginLeft: 7, marginTop: 1}}>Példa Alma</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={9}>
                            <Box sx={{ width: 1140, height: 500, marginLeft: -7, display: 'grid'}}>
                                <BackgroundCard>
                                    <Grid item container direction="row" sx={{ marginTop: 5, marginLeft: 15}}>
                                        <Grid item xs={4} md={3} sx={{ marginRight: -8}}>
                                            <Box sx={{ width: 200, height: 350, backgroundColor: '#9e9e9e', borderColor: '#ff0000', borderStyle: 'dashed', borderWidth: 3}}>
                                                <Grid item container direction="column">
                                                    <Grid item xs={4} md={3}>
                                                        <Box sx={{ width: 170, height: 80, borderRadius: '17px', backgroundColor: '#4d4d4d', marginTop: 5, marginBottom: 1, marginLeft: 2}}>

                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={4} md={3}>
                                                        <Box sx={{ width: 170, height: 80, borderRadius: '17px', backgroundColor: '#4d4d4d', marginTop: 1, marginBottom: 1, marginLeft: 2}}>

                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={4} md={3}>
                                                        <Box sx={{ width: 170, height: 80, borderRadius: '17px', backgroundColor: '#4d4d4d', marginTop: 1, marginBottom: 1, marginLeft: 2}}>

                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4} md={6}>
                                            <Box sx={{ width: 600, height: 350, backgroundColor: '#9e9e9e'}}>

                                            </Box>
                                        </Grid>
                                    </Grid>
                                    {!isStepDone && (
                                        <Box sx={{ display: 'block', paddingLeft: 95, marginTop: 3, marginBottom: -3}}>
                                            <CancelButton text={t('TEXT.BACK')} disabled={!isActiveStep} onClick={handleCancelClicked}/>
                                            <SaveButton text={t('TEXT.NEXT')}  disabled={!isValid || !isActiveStep} onClick={onSubmit}/>
                                        </Box>
                                    )}
                                </BackgroundCard>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </form>
    );
};

export default TransportationDriver;