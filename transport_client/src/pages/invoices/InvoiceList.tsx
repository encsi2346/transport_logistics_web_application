import {Box, Fab, FormControl, Input, InputAdornment, TextField, Tooltip} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import useSelection from "../../components/inputField/hooks/useSelection";
import SaveButton from "../../components/button/SaveButton";
import InvoiceTableQuery from "./InvoiceTableQuery";
import {useForm} from "react-hook-form";
import {documentEditFormSchema, DocumentEditFormSchema} from "@/pages/documents/schemas/document-edit-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {InvoiceEditFormSchema, invoiceEditFormSchema} from "@/pages/invoices/schemas/invoice-edit-form-schema";
import AddIcon from "@mui/icons-material/Add";
import UniqueIconButton from "../../components/button/UniqueIconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const InvoiceList = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [values, setValues] = useState({
        name: '',
        orderId: ''
    });
    const [filtersReset, setFiltersReset] = useState(false);
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
    const [invoiceStatusList, setInvoiceStatusList] = useState([]);

    /*const handleInvoiceStatusList = async () => {
        const getResponse = await fetch(
            "http://localhost:3001/api/invoiceStatus",
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getInvoiceStatusList = await getResponse.json();
        //const getStatus = getResponse.status;
        console.log('InvoiceStatus', getInvoiceStatusList);

        const formattedInvoiceStatusTypeList = getInvoiceStatusList.map(invoiceState => ({
            value: invoiceState,
            label: invoiceState.charAt(0).toUpperCase() + invoiceState.slice(1)
        }));
        console.log('formattedInvoiceStatusTypeList', formattedInvoiceStatusTypeList);
        setInvoiceStatusList(formattedInvoiceStatusTypeList);
    }

    useEffect(() => {
        handleInvoiceStatusList();
    }, [])*/

    const {
        control,
        setValue,
        reset,
        handleSubmit,
        formState: { isValid },
    } = useForm<InvoiceEditFormSchema>({
        defaultValues: {
            invoiceId: '',
            orderId: '',
            companyId: '',
            dateOfCreation: null,
            deadlineForPayment: null,
            price: null,
            status: null,
        },
        resolver: zodResolver(invoiceEditFormSchema()),
        mode: 'all',
    });

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

    /*const getInvoices = async () => {
        try {
            const getInvoiceResponse = await fetch(
                `http://localhost:3001/api/invoices`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getInvoicesData = await getInvoiceResponse.json();
            const getStatus = getInvoiceResponse.status;
            console.log('getInvoicesData', getInvoicesData);
            console.log('getUserStatus', getStatus);
            setInvoices(getInvoicesData);
        } catch (error) {
            console.error('Error get all invoice:', error);
        }
    }

    const getInvoice = async (id: string) => {
        try {
            const getInvoiceResponse = await fetch(
                `http://localhost:3001/api/invoices/${id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getInvoiceData = await getInvoiceResponse.json();
            const getStatus = getInvoiceResponse.status;
            console.log('getInvoiceData', getInvoiceData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
        } catch (error) {
            console.error('Error get invoice:', error);
        }
    }

    const createInvoice = async (data: any) => {
        try {
            const createInvoiceResponse = await fetch(
                `http://localhost:3001/api/invoices/addInvoice`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getInvoiceData = await createInvoiceResponse.json();
            const getStatus = createInvoiceResponse.status;
            console.log('getInvoiceData', getInvoiceData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
            return getInvoiceData;
        } catch (error) {
            console.error('Error creating invoice:', error);
        }
    };

    const updateInvoice = async (id: string, data: any) => {
        try {
            const updatedInvoiceResponse = await fetch(
                `http://localhost:3001/api/invoices/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getInvoiceData = await updatedInvoiceResponse.json();
            const getStatus = updatedInvoiceResponse.status;
            console.log('getInvoiceData', getInvoiceData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
            return getInvoiceData;
        } catch (error) {
            console.error(`Error updating invoice with ID ${id}:`, error);
        }
    };

    const deleteInvoice = async (id: string) => {
        //TODO
        try {
            const deleteInvoiceResponse = await fetch(
                `http://localhost:3001/api/invoices/${id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getInvoiceData = await deleteInvoiceResponse.json();
            const getStatus = deleteInvoiceResponse.status;
            console.log('getInvoiceData', getInvoiceData);
            console.log('getUserStatus', getStatus);
            //setCartTypes(getCarTypesData);
            return getInvoiceData;
        } catch (error) {
            console.error(`Error deleting invoice with ID ${id}:`, error);
        }
    };

    useEffect(() => {
        getInvoices();
    }, []);*/

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
    };

    const onReset = () => {
        setValues({
            name: '',
            orderId: ''
        });
        setFiltersReset(true);
        setInvoices([]);
    };

    const submitData = async () => {
        try {
            setFiltersReset(false);
            const getResponse = await fetch(
                `http://localhost:3001/api/product-categories/search?name=${values.name}&orderId=${values.orderId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const searchInvoicesQuery = await getResponse.json();
            setInvoices(searchInvoicesQuery.content || []);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box>
            <PageHeader text={t('INVOICES.INVOICES')}/>
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
                            gap: 2
                        }}>
                            <FormControl>
                                <TextField
                                    id="name"
                                    placeholder={t('INVOICES.COMPANY_NAME')}
                                    name='name'
                                    label={t('INVOICES.COMPANY_NAME')}
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
                                    <UniqueIconButton onClick={onReset} icon={<DeleteIcon sx={{width: '50px'}}/>}/>
                                </Tooltip>
                            </div>
                        </Box>
                    </Box>
                </form>
            </FilterCard>

            <ContentCard>
                <Box sx={{display: 'flex', marginTop: 2, marginBottom: 10, height: 900}}>
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
                    <Fab aria-label="add"
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

export default InvoiceList;