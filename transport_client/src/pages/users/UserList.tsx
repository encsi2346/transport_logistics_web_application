import {Box, FormControl, Grid, InputAdornment, Select, TextField, InputLabel, MenuItem, Button} from "@mui/material";
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

const limit = 5;
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
    const [usersList, setUsersList] = useState([
        {
            id: '1111',
            fullName: 'Példa Elek',
            position: 'Sofőr',
            drivingLicenceCategories: 'A1, A2, B, C',
            validityDateOfDrivingLicence: '2025.12.03'
        },
        {
            id: '1112',
            fullName: 'Példa Teodor',
            position: 'Sofőr',
            drivingLicenceCategories: 'B, C',
            validityDateOfDrivingLicence: '2025.12.03'
        },
        {
            id: '1113',
            fullName: 'Példa Kálmán',
            position: 'Sofőr',
            drivingLicenceCategories: 'B, C, D',
            validityDateOfDrivingLicence: '2024.08.02'
        },
        {
            id: '1114',
            fullName: 'Példa Tivadar',
            position: 'Sofőr',
            drivingLicenceCategories: 'B, C',
            validityDateOfDrivingLicence: '2025.11.21'
        },
        {
            id: '1115',
            fullName: 'Példa Zoltán',
            position: 'Sofőr',
            drivingLicenceCategories: 'B',
            validityDateOfDrivingLicence: '2025.12.03'
        },
    ]);
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

    /*useEffect(() => {
        submitData();
    }, [filtersReset]);*/

    const handleChange = (prop: any) => (event: any) => {
        /*setValues(prevValues => ({
            ...prevValues,
            [prop]: event.target.value,
        }));*/
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
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{color: '#000000'}}/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ClearIcon
                                                sx={{color: '#000000', cursor: 'pointer'}}
                                                onClick={() => setValues({...values, name: '' })}
                                            />
                                        </InputAdornment>
                                    )
                                }}
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
                                {Object.values(positionList).map((position) => (
                                    <MenuItem key={position.value} value={position.value}>
                                        {position.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <SaveButton onClick={onReset} text={t('TEXT.CLEAR_FILTER')} />
                            <SaveButton type='submit' text={t('TEXT.FILTER')}/>
                        </div>
                        <Box sx={{display: 'inline', alignItems: 'center', paddingLeft: 20}}>
                            <SaveButton text={t('USER.NEW_USER')} onClick={() => navigate(`/users/new`)}/>
                        </Box>
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
                                        dataLength={usersList.length} // Length of the data
                                        next={loadMoreMessage}        // Function to fetch more data
                                        loader={<div />}
                                    >
                                        <Grid container rowSpacing={3}>
                                            {usersList.map((user) => (
                                                <Grid item xs={3} key={Math.random()}>
                                                    <UserCard
                                                        onClick={() => navigate(`/users/${user._id}`)}
                                                        id={user._id}
                                                        fullName={user.email}
                                                        position={user.position}
                                                        phoneNumber={user.phoneNumber}
                                                        image={user.image}
                                                    />
                                                </Grid>
                                            ))}
                                            {/*isLoading && <Loading />*/}
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
                                                        fullName={`${user.firstName} ${user.lastName}`}
                                                        position={user.email}
                                                        phoneNumber={user.phoneNumber}
                                                        image={user.image}
                                                    />
                                                </Grid>
                                            ))}
                                            {/*isLoading && <Loading />*/}
                                        </Grid>
                                    </div>
                                )}
                        </Box>
                    </ContentCard>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default UserList;