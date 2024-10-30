import {Box, FormControl, Input, InputAdornment, TextField} from "@mui/material";
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
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    const {
        control,
        setValue,
        reset,
        handleSubmit,
        formState: { isValid },
    } = useForm<CarTypeEditFormSchema>({
        defaultValues: {
            carTypeName: '',
            carFunctionalDesign: '',
            performance: '',
            ownWeight: '',
            numberOfSeats: '',
            fuel: '',
            usefulWeight: '',
        },
        resolver: zodResolver(carTypeEditFormSchema()),
        mode: 'all',
    });

    const openAddNewRequestDialog = () => {
        addNewRequestDialog
            .show({
                title: t('TEXT.ADD_NEW_REQUEST'),
                acceptText: t('TEXT.CREATE'),
            })
            .then((value) => {
                setValue('carTypes', value as string[]);
            })
            .catch(() => null);
    };

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

    const handleLoadRequests = async () => {
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
                                    placeholder='Példa Éva'
                                    name='name'
                                    label={t('REQUEST.FULL_NAME')}
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
                                                    onClick={() => setValues({...values, name: ''})}
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
                                <TextField
                                    id="position"
                                    placeholder='Példa Éva'
                                    name='position'
                                    label={t('REQUEST.POSITION')}
                                    value={values.position}
                                    onChange={handleChange('position')}
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
                                                    onClick={() => setValues({...values, position: ''})}
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
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <SaveButton onClick={onReset} text={t('TEXT.CLEAR_FILTER')}/>
                                <SaveButton type='submit' text={t('TEXT.FILTER')}/>
                            </div>
                        </Box>
                        <Box sx={{display: 'inline', alignItems: 'center', paddingLeft: 20}}>
                            <SaveButton text={t('REQUEST.NEW_REQUESTS')} onClick={openAddNewRequestDialog}/>
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
                        selectionModel={selectionModel}
                        onSelectionChange={handleSelectionChange}
                        onDataChange={handleDataChange}
                        onHandleDelete={() => deleteRequest(id)}
                    />
                </Box>
            </ContentCard>
        </Box>
    );
};

export default RequestList;