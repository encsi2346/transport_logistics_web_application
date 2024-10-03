import {Box, FormControl, Input, InputAdornment} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import {useForm} from "react-hook-form";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import useSelection from "../../components/inputField/hooks/useSelection";
import SaveButton from "../../components/button/SaveButton";
import TransportationTableQuery from "./TransportationTableQuery";

const TransportationList = () => {
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
                            placeholder={t('TEXT.DRIVER_NAME')}
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
                            placeholder={t('TEXT.START_DATE')}
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
                        <SaveButton text={t('TEXT.NEW_TRANSPORTATION')} onClick={() => navigate(`/transportations/new/edit`)} />
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
                    />
                </Box>
            </ContentCard>
        </Box>
    );
};

export default TransportationList;