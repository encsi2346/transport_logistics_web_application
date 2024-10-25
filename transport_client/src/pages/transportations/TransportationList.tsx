import {Box, FormControl, Input, InputAdornment} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import {useForm} from "react-hook-form";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
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
        reset();
        onSubmit();
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

    return (
        <Box>
            <PageHeader text={t('TEXT.TRANSPORTATIONS')}/>
            <FilterCard>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'space-between'}}>
                    <FormControl sx={{
                        marginTop: 1,
                        marginBottom: 5,
                        marginLeft: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2
                    }}>
                        <Input
                            id="driverName"
                            placeholder={t('TRANSPORTATIONS.DRIVER_NAME')}
                            autoFocus
                            onChange={(e) => setSearch(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon sx={{color: '#000000'}}/>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end" onClick={() => setSearch('')}>
                                    <ClearIcon sx={{color: '#000000', cursor: 'pointer'}}/>
                                </InputAdornment>
                            }
                            disableUnderline={true}
                            sx={{
                                backgroundColor: `#ffffff`,
                                borderRadius: '13px',
                                color: `#000000`,
                                textDecoration: 'none',
                                height: 40,
                                width: 250,
                                fontSize: "15px",
                                paddingLeft: 1,
                                paddingRight: 1
                            }}
                        />
                        <Input
                            id="startDate"
                            placeholder={t('TRANSPORTATIONS.START_DATE')}
                            autoFocus
                            onChange={(e) => setSearch(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon sx={{color: '#000000'}}/>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end" onClick={() => setSearch('')}>
                                    <ClearIcon sx={{color: '#000000', cursor: 'pointer'}}/>
                                </InputAdornment>
                            }
                            disableUnderline={true}
                            sx={{
                                backgroundColor: `#ffffff`,
                                borderRadius: '13px',
                                color: `#000000`,
                                textDecoration: 'none',
                                height: 40,
                                width: 250,
                                fontSize: "15px",
                                paddingLeft: 1,
                                paddingRight: 1
                            }}
                        />
                    </FormControl>
                    <Box sx={{ display: 'inline', paddingLeft: 85}}>
                        <SaveButton text={t('TRANSPORTATIONS.NEW_TRANSPORTATION')} onClick={() => navigate(`/transportations/new/edit`)} />
                    </Box>
                </Box>
            </FilterCard>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10, height: 900}}>
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