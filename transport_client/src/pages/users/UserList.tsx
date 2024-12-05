import {
    Box,
    FormControl,
    Grid,
    InputAdornment,
    Select,
    TextField,
    InputLabel,
    MenuItem,
    Fab, Tooltip
} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import { useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import SaveButton from "../../components/button/SaveButton";
import {useDispatch} from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTypeSafeTranslation } from "../../components/inputField/hooks/useTypeSafeTranslation";
import UserCard from "../../components/layout/UserCard";
import AddIcon from "@mui/icons-material/Add";
import {BallTriangle, Circles, Oval, Puff, Rings, SpinningCircles, TailSpin, ThreeDots} from "react-loading-icons";
import DeleteIcon from '@mui/icons-material/Delete';
import UniqueIconButton from "../../components/button/UniqueIconButton";

const UserList = () => {
    const { t } = useTypeSafeTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [page, setPage] = useState(-1);
    const [filtersReset, setFiltersReset] = useState(false);
    const [values, setValues] = useState({
        name: '',
        position: ''
    });
    const [usersList, setUsersList] = useState([]);
    const [positionList, setPositionList] = useState([
        {
            label: 'Sofőr',
            value: 'driver'
        },
        {
            label: 'HR',
            value: 'hr'
        }
    ]);

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
    };

    const onReset = () => {
        setValues({
            name: '',
            position: ''
        });
        setFiltersReset(true);
        setUsersList([]);
    };

    const submitData = async () => {
        try {
            setFiltersReset(false);
            const getResponse = await fetch(
            `http://localhost:3001/api/users/search?name=${values.name}&position=${values.position}`,
            {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const searchUsersQuery = await getResponse.json();
            setUsersList(searchUsersQuery.content || []);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    //TODO: a usereket infinity scrollban töltöm be
    const fetchUsers = async (/*size: number, page: number*/) => {
        try {
            setIsLoading(true);
            const getResponse = await fetch(
                "http://localhost:3001/api/users",
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getUserList = await getResponse.json();
            const getStatus = getResponse.status;
            console.log('getUserList', getUserList);
            console.log('getUserStatus', getStatus);
            //setUsers((prev) => [...prev, ...users.content]);
            //setIsLast(users.isLast);
            //setPage(users.number);
            setUsersList(getUserList);
        } catch {}
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const loadMoreMessage = () => {
        /*if(isUsersFetching) {
            fetchUsers(limit, page + 1);
        }*/
    };

    const resetUsers = () => {
        setUsers([]);
        setPage(-1);
        setIsLast(false);
    };

    const onSuccess = () => {
        setIsLoading(true);
        resetUsers();
        submitData();
        setIsLoading(false);
    }

   /* useEffect(() => {
        resetUsers();
        //fetchUsers(1000, 0);
    }, []);

    useEffect(() => {
        setUsersList(users);
    }, []);
*/
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (values.name !== '' || values.position !== '') {
                submitData();
            }
        }, 500); // 500 ms delay

        return () => clearTimeout(delayDebounceFn);
    }, [values]);

    useEffect(() => {
        console.log('usersList', usersList);
    }, [usersList]);

    return (
        <Box>
            <PageHeader text={t('TEXT.USERS')}/>
            <FilterCard>
                <form
                    autoComplete='off'
                    onSubmit={
                        async (e) => {
                            e.preventDefault();
                            submitData();
                        }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 1,
                        marginBottom: 5,
                        marginLeft: 2,
                        gap: 4,
                        paddingRight: 5
                    }}>
                        <FormControl>
                            <TextField
                                id="name"
                                placeholder='Példa Éva'
                                name='name'
                                label={t('USER.NAME')}
                                value={values.name}
                                onChange={handleChange('name')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Box
                                                onClick={submitData}
                                                sx={{
                                                    backgroundColor: '#DD1C13',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    paddingBottom: '7px',
                                                    paddingTop: '7px',
                                                    paddingLeft: '10px',
                                                    paddingRight: '10px',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <SearchIcon sx={{color: '#e0e0e0'}}/>
                                            </Box>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    backgroundColor: `rgba(255, 255, 255, 0.76)`,
                                    borderRadius: '8px',
                                    color: `#000000`,
                                    textDecoration: 'none',
                                    height: 50,
                                    width: 350,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    "& .MuiInputBase-input": {
                                        fontSize: '14px',
                                        fontWeight: '600',
                                    },
                                    "& fieldset": {
                                        border: '#ffffff',
                                        borderWidth: '5px'
                                    },
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel>{t('USER.POSITION')}</InputLabel>
                            <Select
                                id="position"
                                placeholder='Sofőr'
                                label={t('USER.POSITION')}
                                name='position'
                                value={values.position ?? ''}
                                onChange={handleChange('position')}
                                sx={{
                                    backgroundColor: `rgba(255, 255, 255, 0.76)`,
                                    borderRadius: '8px',
                                    color: `#000000`,
                                    textDecoration: 'none',
                                    height: 50,
                                    width: 350,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    "& .MuiInputBase-input": {
                                        fontSize: '14px',
                                        fontWeight: '600',
                                    },
                                    "& fieldset": {
                                        border: '#ffffff',
                                        borderWidth: '5px'
                                    },
                                    "& .MuiSelect-icon": {
                                        color: '#DD1C13', // Change the arrow color here
                                    },
                                }}
                            >
                                {Object.values(positionList).map((position) => (
                                    <MenuItem key={position.value} value={position.value}>
                                        {position.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Tooltip title={t('TEXT.CLEAR_FILTER')}>
                                <UniqueIconButton onClick={onReset} icon={<DeleteIcon sx={{ width: '50px'}}/>}/>
                            </Tooltip>
                        </div>
                    </Box>
                </form>
            </FilterCard>

            <ContentCard>
                <Box sx={{display: 'flex', marginTop: 2, marginBottom: 10, height: 900}}>
                    <ContentCard>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            {usersList.length > 0 ? (
                                    <InfiniteScroll
                                        useWindow={false}
                                        loadMore={loadMoreMessage}
                                        hasMore={!isLast && !isLoading}
                                        dataLength={usersList.length}
                                        next={loadMoreMessage}
                                        loader={<div />}
                                    >
                                        <Grid container rowSpacing={3}>
                                            {usersList.map((user) => (
                                                <Grid item xs={3} key={Math.random()}>
                                                    <UserCard
                                                        onClick={() => navigate(`/users/${user._id}`)}
                                                        id={user._id}
                                                        firstName={user.firstName}
                                                        familyName={user.familyName}
                                                        email={user.email}
                                                        position={user.position}
                                                        status={user.status}
                                                        phoneNumber={user.phoneNumber}
                                                        image={user.image}
                                                    />
                                                </Grid>
                                            ))}
                                            {isLoading && <ThreeDots fill="#DD1C13" strokeOpacity={.125} speed={.75} width={80}/>}
                                        </Grid>
                                    </InfiniteScroll>
                                ) : (
                                    <div>
                                        <Grid container rowSpacing={3} columnSpacing={-38} >
                                            {usersList.map((user) => (
                                                <Grid item xs={4} key={user._id}>
                                                    <UserCard
                                                        onClick={() => navigate(`/users/${user._id}`)}
                                                        id={user._id}
                                                        firstName={user.firstName}
                                                        familyName={user.familyName}
                                                        email={user.email}
                                                        position={user.position}
                                                        status={user.status}
                                                        phoneNumber={user.phoneNumber}
                                                        image={user.image}
                                                    />
                                                </Grid>
                                            ))}
                                            {isLoading && <ThreeDots fill="#DD1C13" strokeOpacity={.125} speed={.75} width={80}/>}
                                        </Grid>
                                    </div>
                                )}
                        </Box>
                        <Fab aria-label="add"
                             onClick={() => navigate(`/users/new`)}
                             sx={{
                                 margin: 0,
                                 top: 'auto',
                                 right: '40px',
                                 bottom: '40px',
                                 left: 'auto',
                                 position: 'fixed',
                                 width: '70px',
                                 height: '70px',
                                 backgroundColor: '#DD1C13',
                                 color: '#ffffff'
                             }}
                        >
                            <AddIcon sx={{ width: '40px', height: '40px'}}/>
                        </Fab>
                    </ContentCard>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default UserList;