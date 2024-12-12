import {Box, Fab, FormControl, Grid, InputAdornment, TextField, Tooltip, useTheme} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import CarCard from "../../components/layout/CarCard";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import SaveButton from "../../components/button/SaveButton";
import AddIcon from "@mui/icons-material/Add";
import {useModal} from "@ebay/nice-modal-react";
import CarAddDialog from "./CarAddDialog";
import {useTypeSafeTranslation} from "../../hooks/useTypeSafeTranslation";
import UniqueIconButton from "../../components/button/UniqueIconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const CarList = () => {
    const theme = useTheme();
    const { id } = useParams();
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const addCarDialog = useModal(CarAddDialog);
    const [values, setValues] = useState({
        carId: '',
        name: '',
        type: '',
        licencePlate: '',
        numberOfRegistrationLicence: '',
        chassisNumber: '',
        yearOfProduction: '',
        dateOfFirstRegistration: '',
        images: '',
        dateOfDatabaseRegistration: '',
        dateOfLastTechnicalExamination: '',
        dateOfLastService: '',
        totalDrivenKm: '',
        totalTransport: '',
    });
    const [filtersReset, setFiltersReset] = useState(false);
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState('type');
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

    const openAddCarDialog = () => {
        addCarDialog
            .show({
                title: t('CAR.ADD_NEW_CAR'),
                acceptText: t('TEXT.CREATE'),
            })
            .then((value) => {
                setValue('carTypes', value as string[]);
            })
            .catch(() => null);
    };

    const handleLoadPaginatedCars = async () => {
        try {
            const params = new URLSearchParams({
                sortBy: search,
                page: String(page),
                limit: String(limit),
                type: id,
            });

            const response = await fetch(
                `http://localhost:3001/api/paginated-cars?${params.toString()}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }

            const data = await response.json();
            setCars(data.cars || []);
            setPage(data.page);
            setLimit(data.limit);
            setPages(data.pages);
            setTotal(data.total);
        } catch (error) {
            console.error('Error loading paginated products:', error);
        }
    };

    const handlePageChange = (newPage: any) => {
        setPage((newPage + 1)); // Convert to 1-based index and string
        handleLoadPaginatedCars(); // Fetch data for the new page
    };

    const handlePageSizeChange = (newPageSize: any) => {
        setLimit(newPageSize); // Ensure limit remains a string
        setPage(1); // Reset to page 1 whenever limit changes
        handleLoadPaginatedCars();
    };

    useEffect(() => {
        setPagination({
            page: page - 1, // Adjust for 0-based indexing
            pages: pages,
            pageSize: limit,
            total: total
        });
    }, [page, limit, pages, total]);

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
    };

    const onReset = () => {
        setValues({
            carId: '',
            name: '',
            type: '',
            licencePlate: '',
            numberOfRegistrationLicence: '',
            chassisNumber: '',
            yearOfProduction: '',
            dateOfFirstRegistration: '',
            images: '',
            dateOfDatabaseRegistration: '',
            dateOfLastTechnicalExamination: '',
            dateOfLastService: '',
            totalDrivenKm: '',
            totalTransport: '',
        });
        setFiltersReset(true);
        setCars([]);
    };

    useEffect(() => {
        handleLoadPaginatedCars();
    }, [page, limit, search, onReset]);


    const submitData = async () => {
        try {
            setFiltersReset(false);
            const getResponse = await fetch(
                `http://localhost:3001/api/type-of-transportation/${id}/car-types/${id}/cars/search?name=${values.name}&licencePlate=${values.licencePlate}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const searchCarTypesQuery = await getResponse.json();
            console.log('searchCarTypesQuery', searchCarTypesQuery);
            setCars(searchCarTypesQuery.content || []);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
            <PageHeader text={t('CAR.CARS')}/>
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
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: 3
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
                            <FormControl>
                                <TextField
                                    id="licencePlate"
                                    placeholder={t('CAR.LICENCE_PLATE')}
                                    name='licencePlate'
                                    label={t('CAR.LICENCE_PLATE')}
                                    value={values.licencePlate}
                                    onChange={handleChange('licencePlate')}
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
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Grid container rowSpacing={3} columnSpacing={-38}>
                        {cars
                            .map((item, index) => {
                                return (
                                    <Grid item xs={3} key={item.carId}>
                                        <CarCard
                                            onClick={() => navigate(`/type-of-transportation/${id}/car-types/${id}/cars/${item._id}`)}
                                            carId={item.carId}
                                            name={item.name}
                                            /*TODO: type={item.type}*/
                                            licencePlate={item.licencePlate}
                                            image={item.image}
                                            totalDrivenKm={item.totalDrivenKm}
                                            totalTransport={item.totalTransport}
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                    <Fab aria-label="add"
                         onClick={openAddCarDialog}
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
                        <AddIcon sx={{ width: { xs: '24px', sm: '40px' }, height: { xs: '24px', sm: '40px' } }} />
                    </Fab>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default CarList;