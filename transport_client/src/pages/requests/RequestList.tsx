import {Box, Fab, FormControl, Input, InputAdornment, TextField, Tooltip} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useSelection from "../../components/inputField/hooks/useSelection";
import {useForm} from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import SaveButton from "../../components/button/SaveButton";
import {carTypeEditFormSchema, CarTypeEditFormSchema} from "../car-types/schemas/car-type-edit-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useModal} from "@ebay/nice-modal-react";
import RequestTableQuery from "./RequestTableQuery";
import NewRequestAddDialog from "./NewRequestAddDialog";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "../../components/button/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const RequestList = () => {
    const { id } = useParams();
    const { t } = useTypeSafeTranslation();
    const addNewRequestDialog = useModal(NewRequestAddDialog);
    const [search, setSearch] = useState('');
    const [values, setValues] = useState({
        name: '',
        position: ''
    });
    const [filtersReset, setFiltersReset] = useState(false);
    const [requests, setRequests] = useState([
        {
            id: '1111',
            fullName: 'Példa Elek',
            position: 'Sofőr',
        },
        {
            id: '1111',
            fullName: 'Példa Elek',
            position: 'Sofőr',
        },
        {
            id: '1111',
            fullName: 'Példa Elek',
            position: 'Sofőr',
        },
        {
            id: '1111',
            fullName: 'Példa Elek',
            position: 'Sofőr',
        },
        {
            id: '1111',
            fullName: 'Példa Elek',
            position: 'Sofőr',
        },
    ]);

    const openAddNewRequestDialog = () => {
        addNewRequestDialog
            .show({
                title: t('REQUEST.ADD_NEW_REQUEST'),
                acceptText: t('TEXT.CREATE'),
            })
            .then((value) => {
                setValue('carTypes', value as string[]);
            })
            .catch(() => null);
    };

    /*const handleLoadRequests = async () => {
        const getResponse = await fetch(
            `http://localhost:3001/api/requests`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getRequestsData = await getResponse.json();
        const getStatus = getResponse.status;
        console.log('getRequestsData', getRequestsData);
        console.log('getUserStatus', getStatus);
        setRequests(getRequestsData);
    }

    useEffect(() => {
        handleLoadRequests();
    }, []);

    const deleteRequest = async (id: string) => {
        //TODO
        try {
            const deleteRequestResponse = await fetch(
                `http://localhost:3001/api/requests/${id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getRequestData = await deleteRequestResponse.json();
            const getStatus = deleteRequestResponse.status;
            console.log('getRequestData', getRequestData);
            console.log('getRequestStatus', getStatus);
            //setCartTypes(getCarTypesData);
            return getRequestData;
        } catch (error) {
            console.error(`Error deleting request with ID ${id}:`, error);
        }
    };
*/
    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
    };

    const onReset = () => {
        setValues({
            name: '',
            position: ''
        });
        setFiltersReset(true);
        setRequests([]);
    };

    const submitData = async () => {
        try {
            setFiltersReset(false);
            const getResponse = await fetch(
                `http://localhost:3001/api/product-categories/search?name=${values.name}&position=${values.position}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const searchRequestsQuery = await getResponse.json();
            setRequests(searchRequestsQuery.content || []);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box>
            <PageHeader text={t('REQUEST.PERSONAL_REQUESTS')}/>
            <FilterCard>
                <form
                    autoComplete='off'
                    onSubmit={
                        async (e) => {
                            e.preventDefault();
                            submitData();
                        }}
                >
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'space-between'}}>
                        <Box sx={{
                            marginTop: 1,
                            marginBottom: 5,
                            marginLeft: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 4
                        }}>
                            <FormControl>
                                <TextField
                                    id="name"
                                    placeholder={t('REQUEST.FULL_NAME')}
                                    name='name'
                                    label={t('REQUEST.FULL_NAME')}
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
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Tooltip title={t('TEXT.CLEAR_FILTER')}>
                                    <IconButton onClick={onReset} icon={<DeleteIcon sx={{width: '50px'}}/>}/>
                                </Tooltip>
                            </div>
                        </Box>
                    </Box>
                </form>
            </FilterCard>

            <ContentCard>
                <Box sx={{display: 'flex', marginTop: 2, marginBottom: 10, height: 900}}>
                    <RequestTableQuery
                        searchResults={
                            requests
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.fullName.toLowerCase().includes(search);
                                })
                        }
                        onHandleDelete={() => deleteRequest(id)}
                    />
                    <Fab aria-label="add"
                         onClick={openAddNewRequestDialog}
                         sx={{
                             margin: 0,
                             top: 'auto',
                             right: '40px',
                             bottom: '40px',
                             left: 'auto',
                             position: 'fixed',
                             width: '70px',
                             height: '70px',
                             backgroundColor: '#a40500',
                             color: '#ffffff'
                         }}
                    >
                        <AddIcon sx={{ width: '40px', height: '40px'}}/>
                    </Fab>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default RequestList;