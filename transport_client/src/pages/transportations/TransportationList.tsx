import {Box, Fab, FormControl, Input, InputAdornment, TextField, Tooltip, useTheme} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import {useForm} from "react-hook-form";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import useSelection from "../../components/inputField/hooks/useSelection";
import TransportationTableQuery from "./TransportationTableQuery";
import AddIcon from "@mui/icons-material/Add";
import UniqueIconButton from "../../components/button/UniqueIconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const TransportationList = () => {
    const theme = useTheme();
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
        <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
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
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'space-between'
                    }}>
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
                                    <UniqueIconButton onClick={onReset} icon={<DeleteIcon sx={{ width: '25px', height: '25px' }}/>}/>
                                </Tooltip>
                            </div>
                        </Box>
                    </Box>
                </form>
            </FilterCard>

            <ContentCard>
                <Box sx={{
                    display: 'flex',
                    marginTop: 2,
                    marginBottom: 10,
                    height: 550
                }}>
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

export default TransportationList;