import {Box, Fab, FormControl, Grid, InputAdornment, TextField} from "@mui/material";
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

const CarList = () => {
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

    useEffect(() => {
        handleLoadPaginatedCars();
    }, [page, limit, search]);

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
            setCars(searchCarTypesQuery.content || []);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box>
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
                                    id="name"
                                    placeholder='Példa Éva'
                                    name='name'
                                    label={t('CAR.NAME')}
                                    value={values.name}
                                    onChange={handleChange('name')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{color: '#000000'}}/>
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <ClearIcon
                                                    sx={{color: '#000000', cursor: 'pointer'}}
                                                    onClick={() => setValues({...values, name: ''})}
                                                />
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        backgroundColor: `#ffffff`,
                                        borderRadius: '18px',
                                        color: `#000000`,
                                        textDecoration: 'none',
                                        height: 40,
                                        width: 250,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        fontSize: "15px",
                                        "& fieldset": {border: 'none'},
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    id="licencePlate"
                                    placeholder='Példa Éva'
                                    name='licencePlate'
                                    label={t('CAR.LICENCE_PLATE')}
                                    value={values.licencePlate}
                                    onChange={handleChange('licencePlate')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{color: '#000000'}}/>
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <ClearIcon
                                                    sx={{color: '#000000', cursor: 'pointer'}}
                                                    onClick={() => setValues({...values, licencePlate: ''})}
                                                />
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        backgroundColor: `#ffffff`,
                                        borderRadius: '18px',
                                        color: `#000000`,
                                        textDecoration: 'none',
                                        height: 40,
                                        width: 250,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        fontSize: "15px",
                                        "& fieldset": {border: 'none'},
                                    }}
                                />
                            </FormControl>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <SaveButton onClick={onReset} text={t('TEXT.CLEAR_FILTER')}/>
                                <SaveButton type='submit' text={t('TEXT.FILTER')}/>
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
                        <AddIcon sx={{ width: '40px', height: '40px'}} />
                    </Fab>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default CarList;