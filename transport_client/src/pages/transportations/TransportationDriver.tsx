import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Button,
    useTheme,
    Tooltip
} from "@mui/material";
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
import UniqueIconButton from "../../components/button/UniqueIconButton";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import EditIcon from "@mui/icons-material/Edit";
//TODO

interface Props {
    setCurrentStep: (step: number) => void;
}

const TransportationDriver = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const theme = useTheme();
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
                            <Box sx={{ width: 310, height: 800, alignItems: 'center', justifyContent: 'center'}}>
                                <Box sx={{
                                    backgroundColor: `${theme.palette.component.lightMin}`,
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                    //marginBottom: '10px',
                                    marginTop: '10px',
                                    marginLeft: '20px',
                                    marginRight: '20px',
                                    height: '100%',
                                    borderRadius: '19px',
                                    boxShadow: `0 0 10px rgba(0,0,0,0.2)`,
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <FormControl
                                            sx={{
                                                width: { xs: '100%', sm: '250px' },
                                                backgroundColor: 'rgb(255, 255, 255)',
                                                borderRadius: '8px',
                                            }}
                                        >
                                            <InputLabel
                                                sx={{
                                                    fontSize: '14px',
                                                    color: '#8f8f8f',
                                                    transform: 'translate(14px, 12px) scale(1)', // Ensures proper placement when not focused
                                                    left: 0,
                                                    "&.Mui-focused, &.MuiFormLabel-filled": {
                                                        transform: 'translate(14px, -6px) scale(0.75)', // Scaled position when focused
                                                    },
                                                }}
                                            >{t('TRANSPORTATIONS.POSITION')}</InputLabel>
                                            <Select
                                                id="userPosition"
                                                placeholder={t('TRANSPORTATIONS.POSITION')}
                                                //label={t('TRANSPORTATIONS.POSITION')}
                                                name='userPosition'
                                                data-testid='user-position-input'
                                                value={selectedPosition ?? ''}
                                                onChange={handleChange('userPosition')}
                                                sx={{
                                                    backgroundColor: `rgba(232, 227, 227, 0.76)`,
                                                    borderRadius: '8px',
                                                    color: `#000000`,
                                                    textDecoration: 'none',
                                                    height: 50,
                                                    width: { xs: '100%', sm: '250px' },
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    fontSize: "14px",
                                                    boxShadow: `0 0 10px rgba(0,0,0,0.2)`,
                                                    //fontWeight: "600",
                                                    "& .MuiInputBase-input": {
                                                        fontSize: '14px',
                                                        //fontWeight: '600',
                                                    },
                                                    "& fieldset": {
                                                        border: '#ffffff',
                                                        borderWidth: '5px'
                                                    },
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
                                    <Grid item container direction="column" sx={{
                                        marginTop: 5,
                                        gap: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {
                                            userList.map((user, index) => (
                                                <Grid item key={user._id} xs={4} md={3}>
                                                    <Box
                                                        onDragStart={(event) => dragStartHandler(event, { id: user._id, name: `${user.firstName} ${user.familyName}` })}
                                                        draggable={true}
                                                        sx={{
                                                            width: 230,
                                                            height: 80,
                                                            borderRadius: '17px',
                                                            backgroundColor: '#c8c8c8',
                                                            background: 'transparent',
                                                            border: '2px solid rgba(255, 255, 255, .2)',
                                                            backdropFilter: 'blur(30px)',
                                                            boxShadow: `0 0 10px rgba(0,0,0,0.2)`,
                                                            cursor: 'pointer',
                                                            position: 'relative', // Ensure the circles are behind the card content
                                                            zIndex: 1, // Set a higher z-index for the card itself
                                                            overflow: 'hidden',
                                                            '&:hover': {
                                                                paddingTop: '5px',
                                                                paddingBottom: '5px',
                                                                paddingLeft: '5px',
                                                                paddingRight: '5px',
                                                            },
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: '0px',
                                                                left: '10px',
                                                                width: '150px',
                                                                height: '150px',
                                                                borderRadius: '50%',
                                                                backgroundColor: '#e3e3e3',
                                                                filter: 'blur(30px)',
                                                                zIndex: -1,
                                                            }}
                                                        />
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: '100px',
                                                                right: '-40px',
                                                                width: '130px',
                                                                height: '130px',
                                                                borderRadius: '50%',
                                                                backgroundColor: '#c4c4c4',
                                                                filter: 'blur(50px)',
                                                                zIndex: -1,
                                                            }}
                                                        />
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: '110px',
                                                                right: '40px',
                                                                width: '150px',
                                                                height: '150px',
                                                                borderRadius: '50%',
                                                                backgroundColor: '#e3e3e3',
                                                                filter: 'blur(30px)',
                                                                zIndex: -1,
                                                            }}
                                                        />
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: '80px',
                                                                right: '190px',
                                                                width: '150px',
                                                                height: '150px',
                                                                borderRadius: '50%',
                                                                backgroundColor: '#e3e3e3',
                                                                filter: 'blur(60px)',
                                                                zIndex: -1,
                                                            }}
                                                        />
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'start',
                                                            marginTop: 2
                                                        }}>
                                                            <Box sx={{
                                                                width: 15,
                                                                height: 15,
                                                                backgroundColor: '#07ea00',
                                                                borderRadius: '30px',
                                                                marginLeft: 2
                                                            }}/>
                                                            <Typography sx={{
                                                                marginLeft: 2,
                                                                marginTop: 0
                                                            }}>
                                                                {user.firstName}{user.familyName}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={9}>
                            <Box sx={{ width: 1140, height: 800, marginLeft: -7, display: 'grid', position: 'relative'}}>
                                <Box sx={{
                                    backgroundColor: `${theme.palette.component.lightMin}`,
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                    //marginBottom: '10px',
                                    marginTop: '10px',
                                    marginLeft: '20px',
                                    marginRight: '20px',
                                    height: '100%',
                                    borderRadius: '19px',
                                    boxShadow: `0 0 10px rgba(0,0,0,0.2)`,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}>
                                    <Grid item container direction="row" sx={{
                                        marginTop: 20,
                                        marginLeft: 10
                                    }}>
                                        <Grid item xs={4} md={3} sx={{ marginRight: 0}}>
                                            <Box
                                                sx={{
                                                    width: 250,
                                                    height: 350,
                                                    backgroundColor: '#c4c4c4',
                                                    borderColor: '#ff0000',
                                                    borderStyle: 'dashed',
                                                    borderWidth: 3,
                                                    borderTopLeftRadius: 80,
                                                    borderTopRightRadius: 5, // Round the top-right corner
                                                    borderBottomLeftRadius: 80,
                                                    borderBottomRightRadius: 5,
                                                    paddingLeft: 3,
                                                    paddingBottom: 3,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: `0 0 10px rgba(0,0,0,0.2)`,
                                                    marginRight: 20
                                                }}
                                            >
                                                <Grid item container direction="column">
                                                    <Grid item xs={4} md={3}>
                                                        <Box
                                                            onDragOver={allowDrop}
                                                            onDrop={() => dropHandlerFirst(event, setContentFirst)}
                                                            sx={{
                                                                width: 190,
                                                                height: 80,
                                                                borderRadius: '17px',
                                                                backgroundColor: 'rgba(255,255,255,0.43)',
                                                                marginTop: 5,
                                                                marginBottom: 1,
                                                                marginLeft: 1,
                                                                border: '2px solid rgba(255, 255, 255, .2)',
                                                                backdropFilter: 'blur(30px)',
                                                                boxShadow: `0 0 10px rgba(0,0,0,0.2)`,
                                                                cursor: 'pointer',
                                                                position: 'relative', // Ensure the circles are behind the card content
                                                                zIndex: 1, // Set a higher z-index for the card itself
                                                                overflow: 'hidden',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: 1
                                                            }}>
                                                            {contentFirst.id && (
                                                                <Tooltip title={t('TEXT.REMOVE_PASSENGER')}>
                                                                    <UniqueIconButton
                                                                        onClick={removeContentFirst}
                                                                        width={32}
                                                                        icon={<ClearRoundedIcon sx={{width: 25, height: 25}} /> }/>
                                                                </Tooltip>
                                                            )}
                                                            <Typography>{contentFirst.name}</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={4} md={3}>
                                                        <Box
                                                            onDragOver={allowDrop}
                                                            onDrop={() => dropHandlerSecond(event, setContentSecond)}
                                                            sx={{
                                                                width: 190,
                                                                height: 80,
                                                                borderRadius: '17px',
                                                                backgroundColor: 'rgba(255,255,255,0.43)',
                                                                marginTop: 1,
                                                                marginBottom: 1,
                                                                marginLeft: 1,
                                                                border: '2px solid rgba(255, 255, 255, .2)',
                                                                backdropFilter: 'blur(30px)',
                                                                boxShadow: `0 0 10px rgba(0,0,0,0.2)`,
                                                                cursor: 'pointer',
                                                                position: 'relative', // Ensure the circles are behind the card content
                                                                zIndex: 1, // Set a higher z-index for the card itself
                                                                overflow: 'hidden',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: 1
                                                            }}
                                                        >
                                                            {contentSecond.id && (
                                                                <Tooltip title={t('TEXT.REMOVE_PASSENGER')}>
                                                                    <UniqueIconButton
                                                                        onClick={removeContentSecond}
                                                                        width={32}
                                                                        icon={<ClearRoundedIcon sx={{width: 25, height: 25}} /> }/>
                                                                </Tooltip>
                                                            )}
                                                            <Typography>{contentSecond.name}</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={4} md={3}>
                                                        <Box
                                                            onDragOver={allowDrop}
                                                            onDrop={() => dropHandlerThird(event, setContentThird)}
                                                            sx={{
                                                                width: 190,
                                                                height: 80,
                                                                borderRadius: '17px',
                                                                backgroundColor: 'rgba(255,255,255,0.43)',
                                                                marginTop: 1,
                                                                marginBottom: 1,
                                                                marginLeft: 1,
                                                                border: '2px solid rgba(255, 255, 255, .2)',
                                                                backdropFilter: 'blur(30px)',
                                                                boxShadow: `0 0 10px rgba(0,0,0,0.2)`,
                                                                cursor: 'pointer',
                                                                position: 'relative', // Ensure the circles are behind the card content
                                                                zIndex: 1, // Set a higher z-index for the card itself
                                                                overflow: 'hidden',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: 1
                                                            }}
                                                        >
                                                            {contentThird.id && (
                                                                <Tooltip title={t('TEXT.REMOVE_DRIVER')}>
                                                                    <UniqueIconButton
                                                                        onClick={removeContentThird}
                                                                        width={32}
                                                                        icon={<ClearRoundedIcon sx={{width: 25, height: 25}} /> }/>
                                                                </Tooltip>
                                                            )}
                                                            <Typography>{contentThird.name}</Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4} md={6}>
                                            <Box sx={{
                                                width: 600,
                                                height: 350,
                                                backgroundColor: '#8f8f8f',
                                                borderTopLeftRadius: 5,
                                                borderTopRightRadius: 5,
                                                borderBottomLeftRadius: 5,
                                                borderBottomRightRadius: 5,
                                                boxShadow: `0 0 10px rgba(0,0,0,0.2)`,
                                            }}/>
                                        </Grid>
                                    </Grid>
                                    {!isStepDone && (
                                        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                                            <CancelButton text={t('TEXT.BACK')} disabled={!isActiveStep} onClick={handleCancelClicked}/>
                                            <SaveButton text={t('TEXT.NEXT')}  /*disabled={!isValid || !isActiveStep}*/ onClick={handleNextClicked}/>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </form>
    );
};

export default TransportationDriver;