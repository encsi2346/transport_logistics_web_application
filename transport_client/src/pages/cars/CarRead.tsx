import PageHeader from "../../components/text/PageHeader";
import BackgroundCard from "../../components/layout/BackgroundCard";
import {
    Box,
    SelectChangeEvent,
    useTheme
} from "@mui/material";
import {SyntheticEvent, useEffect, useState} from "react";
import NormalText from "../../components/text/NormalText";
import {useNavigate, useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CarTabData from "./CarTabData";
import CarTabDocuments from "./CarTabDocuments";
import CarTabService from "./CarTabService";
import CarTabErrorReport from "./CarTabErrorReport";
import usePagination from "../../components/inputField/hooks/usePagination";
import useSort from "../../components/inputField/hooks/useSort";
import useSelection from "../../components/inputField/hooks/useSelection";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const CarRead = ({ isEditing = false, isInputDisabled }: Props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);
    const [isProfilePage, setIsProfilePage] = useState(true);
    const [t, i18n] = useTranslation();

    const theme = useTheme();

    const [languageValue, setLanguageValue] = useState(null);

    const handleChangeLanguage = (event: SelectChangeEvent) => {
        setLanguageValue(event.target.value as string);
    }

    useEffect(() => {
        if (languageValue === null) {
            const language = localStorage.getItem('language');
            if (language) {
                setLanguageValue(language);
            }
        }
    }, []);

    useEffect(() => {
        if (languageValue === null) return;
        localStorage.setItem('language', languageValue);
        i18n.changeLanguage(languageValue)
            .then(() => {
                console.log('Language changed');
            })
            .catch((error) => {
                console.log(error);
            });
    }, [languageValue]);


    const [tabIndex, setTabIndex] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setTabIndex(newValue);
    };

    const [search, setSearch] = useState('');
    const [serviceData, setServiceData] = useState([
        {
            id: '#12',
            serviceDate: '2024.01.12. 11:30',
            serviceName: 'CsigaBiga Kft.',
            subject: 'Általános szervíz',
            driverName: 'Admin Anita',
            dateOfRecording: '2024.01.28',
            price: '125 000 Ft',
        },
    ]);
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

    const { pagination, handlePageChange, handlePageSizeChange } = usePagination(undefined, undefined, true);
    const { sort, sortParam, handleSortChange } = useSort({ sortBy: 'fullName', sortDir: 'asc' }, true);

    useEffect(() => {
        if (handleDataChange) {
            handleDataChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceData]);

    return (
        <Box>
            <BackgroundCard>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'space-between'}}>
                    <Box sx={{ display: 'block', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 5}}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <PageHeader text={'ABC-123'}/>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <NormalText text={'FIAT_DUCATO_MAXI_250_L3H2'} />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'inline', paddingLeft: 120}}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                            <NormalText text={'Megtett_km:_117_523km'} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                            <NormalText text={'Végrehajtott_szállítás:_17_szállítás'} />
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabIndex}>
                        <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Adatok" value="1" />
                                <Tab label="Dokumentumok" value="2" />
                                <Tab label="Szervíz" value="3" />
                                <Tab label="Hibabejelentés" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <CarTabData />
                        </TabPanel>
                        <TabPanel value="2">
                            <CarTabDocuments />
                        </TabPanel>
                        <TabPanel value="3">
                            <CarTabService
                                selectionModel={[]}
                                onSelectionChange={handleSelectionChange}
                                onDataChange={handleDataChange}
                                allowSelection={false}
                                 allowNavigation={true}
                                 showActions={false}
                                 data={
                                     serviceData
                                         .filter((item) => {
                                             return search.toLowerCase() === ''
                                                 ? item
                                                 : item.fullName.toLowerCase().includes(search);
                                         })
                                 }
                                 defaultPagination={pagination}
                                 defaultSort={sort}
                                 onPageChange={handlePageChange}
                                 onPageSizeChange={handlePageSizeChange}
                                 onSortChange={handleSortChange}
                            />
                        </TabPanel>
                        <TabPanel value="4">
                            <CarTabErrorReport />
                        </TabPanel>
                    </TabContext>
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default CarRead;