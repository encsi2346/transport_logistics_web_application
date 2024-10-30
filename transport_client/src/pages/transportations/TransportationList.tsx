import {Box, FormControl, Input, InputAdornment, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import {useForm} from "react-hook-form";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import useSelection from "../../components/inputField/hooks/useSelection";
import SaveButton from "../../components/button/SaveButton";
import TransportationTableQuery from "./TransportationTableQuery";

const TransportationList = () => {
    const { id } = useParams();
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState('');
    const [values, setValues] = useState({
        driverName: '',
        startDate: ''
    });
    const [filtersReset, setFiltersReset] = useState(false);
    const [transportations, setTransportations] = useState([
        {
            id: '1111',
            driverName: 'Példa Elek',
            startPlace: 'Budapest',
            endPlace: 'Budapest',
            startDate: '2023.10.11.',
            endDate: '2023.10.11.',
        },
        {
            id: '1111',
            driverName: 'Példa Elek',
            startPlace: 'Budapest',
            endPlace: 'Budapest',
            startDate: '2023.10.11.',
            endDate: '2023.10.11.',
        },
        {
            id: '1111',
            driverName: 'Példa Elek',
            startPlace: 'Budapest',
            endPlace: 'Budapest',
            startDate: '2023.10.11.',
            endDate: '2023.10.11.',
        },
        {
            id: '1111',
            driverName: 'Példa Elek',
            startPlace: 'Budapest',
            endPlace: 'Budapest',
            startDate: '2023.10.11.',
            endDate: '2023.10.11.',
        },
        {
            id: '1111',
            driverName: 'Példa Elek',
            startPlace: 'Budapest',
            endPlace: 'Budapest',
            startDate: '2023.10.11.',
            endDate: '2023.10.11.',
        },
    ]);
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    const { control, reset, handleSubmit, setValue } = useForm({
        defaultValues: {
            taskIdIn: [],
            onlyActives: false,
        },
    });

    const onSubmit = handleSubmit((data) => {});

    const onReset = () => {
        setValues({
            driverName: '',
            startDate: ''
        });
        setFiltersReset(true);
        setTransportations([]);
    };

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

    const deleteTransportation = async (id: string) => {
        //TODO
        try {
            const deleteTransportationResponse = await fetch(
                `http://localhost:3001/api/transportations/${id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getTransportationData = await deleteTransportationResponse.json();
            const getStatus = deleteTransportationResponse.status;
            console.log('getTransportationData', getTransportationData);
            console.log('getTransportationStatus', getStatus);
            //setCartTypes(getCarTypesData);
            return getTransportationData;
        } catch (error) {
            console.error(`Error deleting transportation with ID ${id}:`, error);
        }
    };

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
    };

    const submitData = async () => {
        try {
            setFiltersReset(false);
            const getResponse = await fetch(
                `http://localhost:3001/api/transportations/search?driverName=${values.driverName}&startDate=${values.startDate}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const searchTransportationsQuery = await getResponse.json();
            setTransportations(searchTransportationsQuery.content || []);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box>
            <PageHeader text={t('TEXT.TRANSPORTATIONS')}/>
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
                                    id="driverName"
                                    placeholder='Példa Éva'
                                    name='driverName'
                                    label={t('TRANSPORTATIONS.DRIVER_NAME')}
                                    value={values.driverName}
                                    onChange={handleChange('driverName')}
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
                                                    onClick={() => setValues({...values, driverName: ''})}
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
                                    id="startDate"
                                    placeholder='Példa Éva'
                                    name='startDate'
                                    label={t('TRANSPORTATIONS.START_DATE')}
                                    value={values.startDate}
                                    onChange={handleChange('startDate')}
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
                                                    onClick={() => setValues({...values, startDate: ''})}
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
                            <SaveButton text={t('TRANSPORTATIONS.NEW_TRANSPORTATION')}
                                        onClick={() => navigate(`/transportations/new/edit`)}/>
                        </Box>
                    </Box>
                </form>
            </FilterCard>

            <ContentCard>
                <Box sx={{display: 'flex', marginTop: 2, marginBottom: 10, height: 900}}>
                    <TransportationTableQuery
                        searchResults={
                            transportations
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.driverName.toLowerCase().includes(search);
                                })
                        }
                        selectionModel={selectionModel}
                        onSelectionChange={handleSelectionChange}
                        onDataChange={handleDataChange}
                        onHandleDelete={() => deleteTransportation(id)}
                    />
                </Box>
            </ContentCard>
        </Box>
    );
};

export default TransportationList;