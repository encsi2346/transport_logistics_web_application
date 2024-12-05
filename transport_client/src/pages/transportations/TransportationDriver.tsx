import {Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import BackgroundCard from "../../components/layout/BackgroundCard";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import {TransportationSteps} from "./enums/transportation-steps";
import {useTransportationStore} from "./stores/useTransportationStore";
import useTransportationDriver from "./hooks/useTransportationDriver";
import SelectInput from "../../components/inputField/SelectInput";
import React, {useState} from "react";
import NormalText from "../../components/text/NormalText";
//TODO

interface Props {
    setCurrentStep: (step: number) => void;
}

const TransportationDriver = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const [positions, setPositions] = useState([
        {
            label: `${t('TRANSPORTATIONS.DRIVER')}`,
            value: 1
        },
        {
            label: `${t('TRANSPORTATIONS.PASSENGER')}`,
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
    const [contentFirst, setContentFirst] = useState<string>("Drop Something Here");
    const [contentSecond, setContentSecond] = useState<string>("Drop Something Here");
    const [contentThird, setContentThird] = useState<string>("Drop Something Here");
    const thisStep = TransportationSteps.DRIVER;
    const currentStep = useTransportationStore((state) => state.currentStep);
    const isStepDone = currentStep > thisStep;
    const isActiveStep = thisStep === currentStep;
    const [values, setValues] = useState({
        position: '',
    });

    //const setCurrentStep = useTransportationStore((state) => state.setCurrentStep);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const { control, isValid, preValidationError, onSubmit} = useTransportationDriver();

    const handleCancelClicked = () => {
        setCurrentStep(1);
        //navigate(-1);
    };

    const handleNextClicked  = () => {
        onSubmit(); // Calls the `onSubmit` from the hook
        setCurrentStep(3); // Move to the next step
    };

    const dragStartHandler = (
        event: React.DragEvent<HTMLDivElement>,
        data: string
    ) => {
        event.dataTransfer.setData("text", data /*event.currentTarget.id*/);
    };

    const dropHandlerFirst = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        setContentFirst(data);
    };
    const dropHandlerSecond = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        setContentSecond(data);
    };
    const dropHandlerThird = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        setContentThird(data);
    };

    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
        console.log('values', values);
    };

    return (
        <form autoComplete='off' noValidate onSubmit={(e) => e.preventDefault()}>
            {isActiveStep && (
                <Box>
                    <Grid item container direction="row">
                        <Grid item xs={4} md={3}>
                            <Box sx={{ width: 300, height: 500}}>
                                <BackgroundCard>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <FormControl>
                                            <InputLabel>{t('TRANSPORTATIONS.POSITION')}</InputLabel>
                                            <Select
                                                id="userPosition"
                                                placeholder={t('TRANSPORTATIONS.POSITION')}
                                                label={t('TRANSPORTATIONS.POSITION')}
                                                name='userPosition'
                                                data-testid='user-position-input'
                                                value={values.userPosition ?? ''}
                                                onChange={handleChange('userPosition')}
                                                sx={{
                                                    backgroundColor: `#ffffff`,
                                                    borderRadius: '18px',
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
                                                {Object.values(positions).map((pos) => (
                                                    <MenuItem key={pos.value} value={pos.value}>
                                                        {pos.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </BackgroundCard>
                                <Grid item container direction="column" sx={{ marginTop: -53, marginLeft: 7, gap: 2}}>
                                    <Grid item xs={4} md={3}>
                                        <Box
                                            onDragStart={(event) => dragStartHandler(event, 'alma')}
                                            draggable={true}
                                            sx={{
                                                width: 190,
                                                height: 60,
                                                borderRadius: '17px',
                                                backgroundColor: '#c8c8c8',
                                            }}
                                        >
                                            <Box sx={{ width: 15, height: 15, backgroundColor: '#07ea00', borderRadius: '30px', marginLeft: 2}}/>
                                            <Typography sx={{ marginLeft: 7, marginTop: 1}}>Példa Alma</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} md={3}>
                                        <Box
                                            onDragStart={(event) => dragStartHandler(event, 'körte')}
                                            draggable={true}
                                            sx={{
                                                width: 190,
                                                height: 60,
                                                borderRadius: '17px',
                                                backgroundColor: '#c8c8c8',
                                            }}
                                        >
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
                                            <Box
                                                sx={{
                                                    width: 200,
                                                    height: 350,
                                                    backgroundColor: '#9e9e9e',
                                                    borderColor: '#ff0000',
                                                    borderStyle: 'dashed',
                                                    borderWidth: 3
                                                }}
                                            >
                                                <Grid item container direction="column">
                                                    <Grid item xs={4} md={3}>
                                                        <Box
                                                            onDragOver={allowDrop}
                                                            onDrop={dropHandlerFirst}
                                                            sx={{
                                                                width: 170,
                                                                height: 80,
                                                                borderRadius: '17px',
                                                                backgroundColor: '#4d4d4d',
                                                                marginTop: 5,
                                                                marginBottom: 1,
                                                                marginLeft: 2
                                                        }}>
                                                            <Typography>{contentFirst}</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={4} md={3}>
                                                        <Box
                                                            onDragOver={allowDrop}
                                                            onDrop={dropHandlerSecond}
                                                            sx={{
                                                                width: 170,
                                                                height: 80,
                                                                borderRadius: '17px',
                                                                backgroundColor: '#4d4d4d',
                                                                marginTop: 1,
                                                                marginBottom: 1,
                                                                marginLeft: 2
                                                            }}
                                                        >
                                                            <Typography>{contentSecond}</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={4} md={3}>
                                                        <Box
                                                            onDragOver={allowDrop}
                                                            onDrop={dropHandlerThird}
                                                            sx={{
                                                                width: 170,
                                                                height: 80,
                                                                borderRadius: '17px',
                                                                backgroundColor: '#4d4d4d',
                                                                marginTop: 1,
                                                                marginBottom: 1,
                                                                marginLeft: 2
                                                            }}
                                                        >
                                                            <Typography>{contentThird}</Typography>
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
                                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                            <CancelButton text={t('TEXT.BACK')} disabled={!isActiveStep} onClick={handleCancelClicked}/>
                                            <SaveButton text={t('TEXT.NEXT')}  disabled={!isValid || !isActiveStep} onClick={handleNextClicked}/>
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