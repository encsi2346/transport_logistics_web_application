import {Box, Fab, FormControl, Input, InputAdornment, TextField, Tooltip} from "@mui/material";
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
import AddIcon from "@mui/icons-material/Add";
import UniqueIconButton from "../../components/button/UniqueIconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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
                                    placeholder={t('TRANSPORTATIONS.DRIVER_NAME')}
                                    name='driverName'
                                    label={t('TRANSPORTATIONS.DRIVER_NAME')}
                                    value={values.driverName}
                                    onChange={handleChange('driverName')}
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
                                    <UniqueIconButton onClick={onReset} icon={<DeleteIcon sx={{ width: '50px'}}/>}/>
                                </Tooltip>
                            </div>
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
                    <Fab aria-label="add"
                         onClick={() => navigate(`/transportations/new/edit`)}
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

export default TransportationList;