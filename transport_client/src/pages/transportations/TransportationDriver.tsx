import {Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography, Button} from "@mui/material";
import BackgroundCard from "../../components/layout/BackgroundCard";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import {TransportationSteps} from "./enums/transportation-steps";
import {useTransportationStore} from "./stores/useTransportationStore";
import useTransportationDriver from "./hooks/useTransportationDriver";
import SelectInput from "../../components/inputField/SelectInput";
import React, {useEffect, useState} from "react";
import NormalText from "../../components/text/NormalText";
import useTransportationCar from "./hooks/useTransportationCar";
//TODO

interface Props {
    setCurrentStep: (step: number) => void;
}

const TransportationDriver = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const { selectedDriverId, selectedPassengers, setTransportation } = useTransportationStore();
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
    const [userList, setUserList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState({
        contentFirst: null,
        contentSecond: null,
        contentThird: null,
    });
    const [contentFirst, setContentFirst] = useState({ id: '', name: 'Drop Something Here' });
    const [contentSecond, setContentSecond] = useState({ id: '', name: 'Drop Something Here' });
    const [contentThird, setContentThird] = useState({ id: '', name: 'Drop Something Here' });
    const thisStep = TransportationSteps.DRIVER;
    const currentStep = useTransportationStore((state) => state.currentStep);
    const isStepDone = currentStep > thisStep;
    const isActiveStep = thisStep === currentStep;
    const [selectedPosition, setSelectedPosition] = useState('');
    const [driverId, setDriverId] = useState('');
    const [passengersId, setPassengersId] = useState([]);

    //const setCurrentStep = useTransportationStore((state) => state.setCurrentStep);
    /*const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const { control, isValid, preValidationError, onSubmit} = useTransportationDriver();*/

    const { onSubmit } = useTransportationCar();

    const handleCancelClicked = () => {
        setCurrentStep(1);
        //navigate(-1);
    };

    const handleNextClicked  = () => {
        setTransportation({
            selectedDriverId: contentThird.id, // Save contentThird as driver
            selectedPassengers: [contentFirst.id, contentSecond.id] // Save contentFirst and contentSecond as passengers
        });
        setCurrentStep(3); // Move to the next step
    };

    const dragStartHandler = (
        event: React.DragEvent<HTMLDivElement>,
        data: { id: string, name: string }
    ) => {
        event.dataTransfer.setData("text", JSON.stringify(data));
    };

    const dropHandlerFirst = (
        event: React.DragEvent<HTMLDivElement>,
        setContentFirst: React.Dispatch<React.SetStateAction<{ id: string, name: string }>>
    ) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text"));

        // Prevent duplicate assignment
        if (selectedUsers.contentFirst?.id === data.id) return;

        setContentFirst(data);

        // Update selectedUsers and userList
        setSelectedUsers((prev) => ({ ...prev, contentFirst: data }));
        setUserList((prev) => prev.filter((user) => user._id !== data.id));
    };
    const dropHandlerSecond = (
        event: React.DragEvent<HTMLDivElement>,
        setContentSecond: React.Dispatch<React.SetStateAction<{ id: string, name: string }>>
    ) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text"));

        // Prevent duplicate assignment
        if (selectedUsers.contentSecond?.id === data.id) return;

        setContentSecond(data);

        // Update selectedUsers and userList
        setSelectedUsers((prev) => ({ ...prev, contentSecond: data }));
        setUserList((prev) => prev.filter((user) => user._id !== data.id));
    };
    const dropHandlerThird = (
        event: React.DragEvent<HTMLDivElement>,
        setContentThird: React.Dispatch<React.SetStateAction<{ id: string, name: string }>>
    ) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text"));

        // Prevent duplicate assignment
        if (selectedUsers.contentThird?.id === data.id) return;

        setContentThird(data);

        // Update selectedUsers and userList
        setSelectedUsers((prev) => ({ ...prev, contentThird: data }));
        setUserList((prev) => prev.filter((user) => user._id !== data.id));
    };

    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleChange = (prop: any) => (event: any) => {
        setSelectedPosition(event.target.value);
    };

    const removeContentFirst = () => {
        const removedUser = selectedUsers.contentFirst;
        if (!removedUser) return;

        const userToRestore = {
            _id: removedUser.id,
            firstName: removedUser.name.split(' ')[0] || '', // Assume name is "FirstName LastName"
            familyName: removedUser.name.split(' ')[1] || '', // Handle case where there's no last name
        };

        // Update selectedUsers and userList
        setSelectedUsers((prev) => ({ ...prev, contentFirst: null }));
        setUserList((prev) => [...prev, userToRestore]);

        setContentFirst({ id: '', name: 'Drop Something Here' }); // Clear the box
    };

    const removeContentSecond = () => {
        const removedUser = selectedUsers.contentSecond;
        if (!removedUser) return;

        const userToRestore = {
            _id: removedUser.id,
            firstName: removedUser.name.split(' ')[0] || '', // Assume name is "FirstName LastName"
            familyName: removedUser.name.split(' ')[1] || '', // Handle case where there's no last name
        };

        // Update selectedUsers and userList
        setSelectedUsers((prev) => ({ ...prev, contentSecond: null }));
        setUserList((prev) => [...prev, userToRestore]);

        setContentSecond({ id: '', name: 'Drop Something Here' }); // Clear the box
    };

    const removeContentThird = () => {
        const removedUser = selectedUsers.contentThird;
        if (!removedUser) return;

        const userToRestore = {
            _id: removedUser.id,
            firstName: removedUser.name.split(' ')[0] || '', // Assume name is "FirstName LastName"
            familyName: removedUser.name.split(' ')[1] || '', // Handle case where there's no last name
        };

        // Update selectedUsers and userList
        setSelectedUsers((prev) => ({ ...prev, contentThird: null }));
        setUserList((prev) => [...prev, userToRestore]);

        setContentThird({ id: '', name: 'Drop Something Here' }); // Clear the box
    };

    const getUsers = async () => {
        try {
            const getUsersResponse = await fetch(
                `http://localhost:3001/api/users`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getUsersData = await getUsersResponse.json();
            const getStatus = getUsersResponse.status;
            setUserList(getUsersData);
        } catch (error) {
            console.error('Error get car type:', error);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        console.log('contentFirst', contentFirst);
        console.log('contentSecond', contentSecond);
        console.log('contentThird', contentThird);
    }, [contentFirst, contentSecond, contentThird])

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
                                                value={selectedPosition ?? ''}
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
                                    {
                                        userList.map((user, index) => (
                                            <Grid item key={user._id} xs={4} md={3}>
                                                <Box
                                                    onDragStart={(event) => dragStartHandler(event, { id: user._id, name: `${user.firstName} ${user.familyName}` })}
                                                    draggable={true}
                                                    sx={{
                                                        width: 190,
                                                        height: 60,
                                                        borderRadius: '17px',
                                                        backgroundColor: '#c8c8c8',
                                                    }}
                                                >
                                                    <Box sx={{ width: 15, height: 15, backgroundColor: '#07ea00', borderRadius: '30px', marginLeft: 2}}/>
                                                    <Typography sx={{ marginLeft: 7, marginTop: 1}}>{user.firstName}{user.familyName}</Typography>
                                                </Box>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={9}>
                            <Box sx={{ width: 1140, height: 500, marginLeft: -7, display: 'grid'}}>
                                {/*<BackgroundCard>
                                    <Grid container direction="row" sx={{ marginTop: 5 }}>
                                        {[contentFirst, contentSecond, contentThird].map((content, index) => (
                                            <Grid item key={index} xs={4} md={3} sx={{ marginRight: -8 }}>
                                                <Box
                                                    onDragOver={allowDrop}
                                                    onDrop={(event) => {
                                                        if (index === 0) dropHandlerFirst(event, setContentFirst);
                                                        if (index === 1) dropHandlerSecond(event, setContentSecond);
                                                        if (index === 2) dropHandlerThird(event, setContentThird);
                                                    }}
                                                    sx={{
                                                    width: 170,
                                                    height: 80,
                                                    borderRadius: '17px',
                                                    backgroundColor: '#4d4d4d',
                                                    marginTop: 5,
                                                    marginBottom: 1,
                                                    marginLeft: 2
                                                }}
                                                >
                                                    <Typography>{content.id}</Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    {!isStepDone && (
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <CancelButton text={t('TEXT.BACK')} onClick={handleCancelClicked} />
                                            <SaveButton text={t('TEXT.NEXT')} onClick={handleNextClicked} />
                                        </Box>
                                    )}
                                </BackgroundCard> */}
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
                                                            onDrop={() => dropHandlerFirst(event, setContentFirst)}
                                                            sx={{
                                                                width: 170,
                                                                height: 80,
                                                                borderRadius: '17px',
                                                                backgroundColor: '#4d4d4d',
                                                                marginTop: 5,
                                                                marginBottom: 1,
                                                                marginLeft: 2
                                                            }}>
                                                            {contentFirst.id && (
                                                                <Button
                                                                    onClick={removeContentFirst}
                                                                    sx={{
                                                                        color: 'white',
                                                                        border: 'none',
                                                                        borderRadius: '18px',
                                                                        width: 20,
                                                                        height: 20,
                                                                        cursor: 'pointer',
                                                                        backgroundColor: '#ff0000'
                                                                    }}
                                                                >
                                                                    X
                                                                </Button>
                                                            )}
                                                            <Typography>{contentFirst.name}</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={4} md={3}>
                                                        <Box
                                                            onDragOver={allowDrop}
                                                            onDrop={() => dropHandlerSecond(event, setContentSecond)}
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
                                                            {contentSecond.id && (
                                                                <Button
                                                                    onClick={removeContentSecond}
                                                                    sx={{
                                                                        color: 'white',
                                                                        border: 'none',
                                                                        borderRadius: '18px',
                                                                        width: 20,
                                                                        height: 20,
                                                                        cursor: 'pointer',
                                                                        backgroundColor: '#ff0000'
                                                                    }}
                                                                >
                                                                    X
                                                                </Button>
                                                            )}
                                                            <Typography>{contentSecond.name}</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={4} md={3}>
                                                        <Box
                                                            onDragOver={allowDrop}
                                                            onDrop={() => dropHandlerThird(event, setContentThird)}
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
                                                            {contentThird.id && (
                                                                <Button
                                                                    onClick={removeContentThird}
                                                                    sx={{
                                                                        color: 'white',
                                                                        border: 'none',
                                                                        borderRadius: '18px',
                                                                        width: 20,
                                                                        height: 20,
                                                                        cursor: 'pointer',
                                                                        backgroundColor: '#ff0000'
                                                                    }}
                                                                >
                                                                    X
                                                                </Button>
                                                            )}
                                                            <Typography>{contentThird.name}</Typography>
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
                                            <SaveButton text={t('TEXT.NEXT')}  /*disabled={!isValid || !isActiveStep}*/ onClick={handleNextClicked}/>
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