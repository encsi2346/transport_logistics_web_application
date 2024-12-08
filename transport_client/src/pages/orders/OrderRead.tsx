import BackgroundCard from "../../components/layout/BackgroundCard";
import {
    Box,
    SelectChangeEvent, Typography,
    useTheme
} from "@mui/material";
import {SyntheticEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import usePagination from "../../components/inputField/hooks/usePagination";
import useSort from "../../components/inputField/hooks/useSort";
import useSelection from "../../components/inputField/hooks/useSelection";
import OrderTabMap from "./OrderTabMap";
import OrderTabComments from "./OrderTabComments";
import OrderTabDocuments from "./OrderTabDocuments";
import OrderTabDetails from "./OrderTabDetails";
import CarTabService from "../cars/tabs/CarTabService";
import OrderTabRoute from "./OrderTabRoute";
import ActionsButton from "../../components/layout/ActionsButton";
import MyBadge from "../../components/layout/MyBadge";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const OrderRead = ({ isEditing = false, isInputDisabled }: Props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);
    const [isProfilePage, setIsProfilePage] = useState(true);
    const [t, i18n] = useTranslation();
    const data = [
        {
            id: '1.',
            plannedArriving: '2024.01.30 08:00',
            actualArriving: '2024.01.30 08:00',
            address: 'Raktár 1000 Budapest Moszkva utca 15.',
            task: 'Bepakolás',
            km: '0 km',
            time: '0óra 0perc',
            plannedDeparture: '2024.01.30. 08:10',
            actualDeparture: '2024.01.30. 08:15',
            status: 'TELJESÍTVE'
        },
        {
            id: '2.',
            plannedArriving: '2024.01.30 08:00',
            actualArriving: '2024.01.30 08:00',
            address: 'Raktár 1000 Budapest Moszkva utca 15.',
            task: 'Bepakolás',
            km: '0 km',
            time: '0óra 0perc',
            plannedDeparture: '2024.01.30. 08:10',
            actualDeparture: '2024.01.30. 08:15',
            status: 'TELJESÍTVE'
        },
        {
            id: '3.',
            plannedArriving: '2024.01.30 08:00',
            actualArriving: '2024.01.30 08:00',
            address: 'Raktár 1000 Budapest Moszkva utca 15.',
            task: 'Bepakolás',
            km: '0 km',
            time: '0óra 0perc',
            plannedDeparture: '2024.01.30. 08:10',
            actualDeparture: '2024.01.30. 08:15',
            status: 'TELJESÍTVE'
        },
        {
            id: '4.',
            plannedArriving: '2024.01.30 08:00',
            actualArriving: '2024.01.30 08:00',
            address: 'Raktár 1000 Budapest Moszkva utca 15.',
            task: 'Bepakolás',
            km: '0 km',
            time: '0óra 0perc',
            plannedDeparture: '2024.01.30. 08:10',
            actualDeparture: '2024.01.30. 08:15',
            status: 'TELJESÍTVE'
        }
    ]

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


    const [tabIndex, setTabIndex] = useState('3');

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
                <Box sx={{display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: 10,
                        marginTop: 5,
                        marginBottom: 5,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 170 }}>
                                <Typography sx={{
                                    fontWeight: '700',
                                    fontSize: 40,
                                    color: '#DD1C13',
                                    marginRight: 5,
                                    letterSpacing: 1,
                                    textTransform: 'uppercase'
                                }}>
                                    #155
                                </Typography>
                                <MyBadge text={'folyamatban'} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ActionsButton text={'Műveletek'} />
                            </Box>
                        </Box>
                        <Box sx={{ marginTop: 2}}>
                            <Typography sx={{
                                color: '#A3A3A3',
                                fontSize: 20,
                                marginBottom: '2px'
                            }}>
                                Vik Kft.
                            </Typography>
                            <Typography sx={{
                                color: '#A3A3A3',
                                fontSize: 20,
                                marginBottom: '2px'
                            }}>
                                +3630111222
                            </Typography>
                            <Typography sx={{
                                color: '#A3A3A3',
                                fontSize: 20,
                                marginBottom: '2px'
                            }}>
                                vikkft@email.hu
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabIndex}>
                        <Box sx={{ borderBottom: 2, borderColor: '#A3A3A3'}}>
                            <TabList onChange={handleChange}>
                                <Tab label="Útvonal" value="1" sx={{ fontSize: 25 , color: '#DD1C13', textTransform: 'capitalize', paddingLeft: 5, paddingRight: 5, letterSpacing: '-1px'}}/>
                                <Tab label="Szállítmány" value="2" sx={{ fontSize: 25 , color: '#DD1C13', textTransform: 'capitalize', paddingLeft: 5, paddingRight: 5, letterSpacing: '-1px'}}/>
                                <Tab label="Részletek" value="3" sx={{ fontSize: 25 , color: '#DD1C13', textTransform: 'capitalize', paddingLeft: 5, paddingRight: 5, letterSpacing: '-1px'}}/>
                                <Tab label="Dokumentumok" value="4" sx={{ fontSize: 25 , color: '#DD1C13', textTransform: 'capitalize', paddingLeft: 5, paddingRight: 5, letterSpacing: '-1px'}}/>
                                <Tab label="Megjegyzések" value="5" sx={{ fontSize: 25 , color: '#DD1C13', textTransform: 'capitalize', paddingLeft: 5, paddingRight: 5, letterSpacing: '-1px'}}/>
                                <Tab label="Térkép" value="6" sx={{ fontSize: 25 , color: '#DD1C13', textTransform: 'capitalize', paddingLeft: 5, paddingRight: 5, letterSpacing: '-1px'}}/>
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <OrderTabRoute
                                data={data}
                                showActions={true}
                            />
                        </TabPanel>
                        <TabPanel value="2">
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
                        <TabPanel value="3">
                            <OrderTabDetails />
                        </TabPanel>
                        <TabPanel value="4">
                            <OrderTabDocuments />
                        </TabPanel>
                        <TabPanel value="5">
                            <OrderTabComments />
                        </TabPanel>
                        <TabPanel value="6">
                            <OrderTabMap />
                        </TabPanel>
                    </TabContext>
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default OrderRead;