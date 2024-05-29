import {Box, FormControl, Input, InputAdornment} from "@mui/material";
import PageHeader from "../../components/text/PageHeader.tsx";
import FilterCard from "../../components/layout/FilterCard.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import useSelection from "../../components/inputField/hooks/useSelection.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import InvoiceTableQuery from "./InvoiceTableQuery.tsx";

const InvoiceList = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [invoices, setInvoices] = useState([
        {
            id: '2014-01-115',
            orderId: '#155',
            companyName: 'VIK Kft.',
            dateOfCreation: '2024.01.28',
            paymentDeadline: '2024.01.31',
            summary: '1500 EUR',
            status: 'fizetve',
        },
        {
            id: '2014-01-116',
            orderId: '#156',
            companyName: 'VIK Kft.',
            dateOfCreation: '2024.01.28',
            paymentDeadline: '2024.01.31',
            summary: '1500 EUR',
            status: 'új',
        },
        {
            id: '2014-01-117',
            orderId: '#157',
            companyName: 'VIK Kft.',
            dateOfCreation: '2024.01.28',
            paymentDeadline: '2024.01.31',
            summary: '1500 EUR',
            status: 'törölve',
        },
        {
            id: '2014-01-118',
            orderId: '#158',
            companyName: 'VIK Kft.',
            dateOfCreation: '2024.01.28',
            paymentDeadline: '2024.01.31',
            summary: '1500 EUR',
            status: 'fizetésre vár',
        },
        {
            id: '2014-01-119',
            orderId: '#159',
            companyName: 'VIK Kft.',
            dateOfCreation: '2024.01.28',
            paymentDeadline: '2024.01.31',
            summary: '1500 EUR',
            status: 'fizetve',
        },
    ]);
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

    return (
        <Box>
            <PageHeader text={t('TEXT.USERS')}/>
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
                            id="name"
                            placeholder="Search name"
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
                            id="position"
                            placeholder="Search position"
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
                        <SaveButton text={'Új dokumentum feltöltése'} />
                    </Box>
                </Box>
            </FilterCard>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10, height: 900}}>
                    <InvoiceTableQuery
                        searchResults={
                            invoices
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.documentName.toLowerCase().includes(search);
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

export default InvoiceList;