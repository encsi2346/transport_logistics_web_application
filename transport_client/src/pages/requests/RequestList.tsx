import {Box, Fab, FormControl, Input, InputAdornment, TextField, Tooltip, useTheme} from "@mui/material";
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
import UniqueIconButton from "../../components/button/UniqueIconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const RequestList = () => {
    const theme = useTheme();
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
        <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
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
                    <Box sx={{display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'space-between'}}>
                        <Box sx={{
                            marginTop: 1,
                            marginBottom: 5,
                            marginLeft: 2,
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            gap: 4
                        }}>
                            <FormControl sx={{ width: { xs: '100%', sm: 'auto' } }}>
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
                                                    <SearchIcon sx={{color: '#ffffff'}}/>
                                                </Box>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        backgroundColor: `rgba(232, 227, 227, 0.76)`,
                                        borderRadius: '8px',
                                        color: `#000000`,
                                        textDecoration: 'none',
                                        height: 50,
                                        width: { xs: '100%', sm: '350px' },
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
                                    <UniqueIconButton onClick={onReset} icon={<DeleteIcon sx={{ width: '25px', height: '25px' }} />}/>
                                </Tooltip>
                            </div>
                        </Box>
                    </Box>
                </form>
            </FilterCard>

            <ContentCard>
                <Box sx={{display: 'flex', marginTop: 2, marginBottom: 10, height: 550}}>
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
                             bottom: { xs: 16, sm: 32 },
                             right: { xs: 16, sm: 32 },
                             left: 'auto',
                             position: 'fixed',
                             width: { xs: '50px', sm: '60px' },
                             height: { xs: '50px', sm: '60px' },
                             backgroundColor: '#DD1C13' || `${theme.palette.component.dark}`,
                             color: '#ffffff'
                         }}
                    >
                        <AddIcon sx={{ width: { xs: '24px', sm: '40px' }, height: { xs: '24px', sm: '40px' } }}/>
                    </Fab>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default RequestList;