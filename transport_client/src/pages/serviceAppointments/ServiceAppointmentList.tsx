import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import {Box, Fab, FormControl, Grid, Input, InputAdornment, TextField, Tooltip} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard";
import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {useModal} from "@ebay/nice-modal-react";
import AddIcon from '@mui/icons-material/Add';
import UniqueIconButton from "../../components/button/UniqueIconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CompanyCard from "../../components/layout/CompanyCard";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useTypeSafeTranslation} from "../../hooks/useTypeSafeTranslation";
import ServiceAppointmentAddDialog from "./ServiceAppointmentAddDialog";

const ServiceAppointmentList = () => {
    const { id } = useParams();
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const addServiceAppointmentDialog = useModal(ServiceAppointmentAddDialog);
    const [values, setValues] = useState({
        serviceAppointmentId: '',
        appointment: '',
        nameOfServiceCompany: '',
        driverName: '',
        dateOfRecording: '',
        grossSumPrice: '',
        netSumPrice: '',
        VAT: '',
        title: '',
        description: '',
        reparation: '',
        car: ''
    });
    const [filtersReset, setFiltersReset] = useState(false);
    const [search, setSearch] = useState('typeName');
    const [serviceAppointments, setServiceAppoointments] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({
        page: page - 1,
        pages: pages,
        pageSize: limit,
        total: total
    });

    /*const handleLoadPaginatedCarTypes = async () => {
        try {
            const params = new URLSearchParams({
                sortBy: search,
                page: String(page),
                limit: String(limit),
                typeOfTransportation: id,
            });

            const response = await fetch(
                `http://localhost:3001/api/paginated-car-type?${params.toString()}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }

            const data = await response.json();
            setCartTypes(data.carTypes || []);
            setPage(data.page);
            setLimit(data.limit);
            setPages(data.pages);
            setTotal(data.total);
        } catch (error) {
            console.error('Error loading paginated products:', error);
        }
    };

    useEffect(() => {
        handleLoadPaginatedCarTypes();
    }, [page, limit, search]);

    const handlePageChange = (newPage: any) => {
        setPage((newPage + 1)); // Convert to 1-based index and string
        handleLoadPaginatedCarTypes(); // Fetch data for the new page
    };

    const handlePageSizeChange = (newPageSize: any) => {
        setLimit(newPageSize); // Ensure limit remains a string
        setPage(1); // Reset to page 1 whenever limit changes
        handleLoadPaginatedCarTypes();
    };

    useEffect(() => {
        setPagination({
            page: page - 1, // Adjust for 0-based indexing
            pages: pages,
            pageSize: limit,
            total: total
        });
    }, [page, limit, pages, total]);*/

    const openAddServiceAppointmentDialog = () => {
        addServiceAppointmentDialog
            .show({
                title: t('SERVICE_APPOINTMENTS.ADD_NEW_SERVICE_APPOINTMENT'),
                acceptText: t('TEXT.CREATE'),
            })
            .then((value) => {
                setValue('serviceAppointments', value as string[]);
            })
            .catch(() => null);
    };

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
    };

    const onReset = () => {
        setValues({
            serviceAppointmentId: '',
            appointment: '',
            nameOfServiceCompany: '',
            driverName: '',
            dateOfRecording: '',
            grossSumPrice: '',
            netSumPrice: '',
            VAT: '',
            title: '',
            description: '',
            reparation: '',
            car: '',
        });
        setFiltersReset(true);
        setServiceAppointments([]);
    };

    const submitData = async () => {
        try {
            setFiltersReset(false);
            const getResponse = await fetch(
                `http://localhost:3001/api/car-types/search?brand=${values.brand}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            console.log('Brand value:', values.brand);
            const searchCarTypesQuery = await getResponse.json();
            setCartTypes(searchCarTypesQuery.content || []);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box>
            <PageHeader text={t('TEXT.SERVICES')}/>
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
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: 3
                    }}>
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
                                    id="nameOfServiceCompany"
                                    placeholder={t('SERVICE_APPOINTMENTS.NAME_OF_SERVICE_COMPANY')}
                                    name='nameOfServiceCompany'
                                    label={t('SERVICE_APPOINTMENTS.NAME_OF_SERVICE_COMPANY')}
                                    value={values.nameOfServiceCompany}
                                    onChange={handleChange('nameOfServiceCompany')}
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
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Grid container rowSpacing={3} columnSpacing={-38}>
                        {/*ServiceAppointments
                            .map((item, index) => {
                                return (
                                    <Grid item xs={3} key={item._id}>
                                        <CompanyCard
                                            onClick={() => navigate(`/type-of-transportation/${id}/car-types/${item._id}/cars`)}
                                            carTypeId={item.carTypeId}
                                            brand={item.brand}
                                            typeName={item.typeName}
                                            design={item.design}
                                            usefulWeight={item.usefulWeight}
                                            height={item.height}
                                            szelesseg={item.szelesseg}
                                            long={item.long}
                                        />
                                    </Grid>
                                );
                            })*/}
                    </Grid>
                    <Fab aria-label="add"
                         onClick={openAddServiceAppointmentDialog}
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

export default ServiceAppointmentList;