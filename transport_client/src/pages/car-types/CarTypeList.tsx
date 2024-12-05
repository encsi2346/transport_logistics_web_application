import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import {Box, Fab, FormControl, Grid, Input, InputAdornment, TextField} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard";
import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import SaveButton from "../../components/button/SaveButton";
import {useModal} from "@ebay/nice-modal-react";
import CarTypeAddDialog from "./CarTypeAddDialog";
import CarTypeCard from "../../components/layout/CarTypeCard";
import AddIcon from '@mui/icons-material/Add';


const CarTypeList = () => {
    const { id } = useParams();
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const addCarTypeDialog = useModal(CarTypeAddDialog);
    const [values, setValues] = useState({
        carTypeId: '',
        brand: '',
        typeName: '',
        design: '',
        performance: '',
        selfWeight: '',
        usefulWeight: '',
        numberOfSeats: '',
        fuel: '',
        vontatas: '',
        height: '',
        szelesseg: '',
        long: '',
        carTypeOfTransportationId: '',
    });
    const [filtersReset, setFiltersReset] = useState(false);
    const [search, setSearch] = useState('typeName');
    const [carTypes, setCartTypes] = useState([]);
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

    const handleLoadPaginatedCarTypes = async () => {
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
    }, [page, limit, pages, total]);

    const openAddCarTypeDialog = () => {
        addCarTypeDialog
            .show({
                title: t('CAR_TYPES.ADD_NEW_CAR_TYPE'),
                acceptText: t('TEXT.CREATE'),
            })
            .then((value) => {
                setValue('carTypes', value as string[]);
            })
            .catch(() => null);
    };

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
    };

    const onReset = () => {
        setValues({
            carTypeId: '',
            brand: '',
            typeName: '',
            design: '',
            performance: '',
            selfWeight: '',
            usefulWeight: '',
            numberOfSeats: '',
            fuel: '',
            vontatas: '',
            height: '',
            szelesseg: '',
            long: '',
            carTypeOfTransportationId: '',
        });
        setFiltersReset(true);
        setCartTypes([]);
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
            <PageHeader text={t('TEXT.CAR_TYPES')}/>
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
                                    id="brand"
                                    placeholder='Példa Éva'
                                    name='brand'
                                    label={t('CAR_TYPES.BRAND')}
                                    value={values.brand}
                                    onChange={handleChange('brand')}
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
                                                    onClick={() => setValues({...values, brand: ''})}
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
                            {/* <FormControl>
                                <TextField
                                    id="fuel"
                                    placeholder='Példa Éva'
                                    name='fuel'
                                    label={t('CAR_TYPES.FUEL')}
                                    value={values.fuel}
                                    onChange={handleChange('fuel')}
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
                                                    onClick={() => setValues({...values, fuel: ''})}
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
                                    id="numberOfSeats"
                                    placeholder='Példa Éva'
                                    name='numberOfSeats'
                                    label={t('CAR_TYPES.NUMBER_OF_SEATS')}
                                    value={values.numberOfSeats}
                                    onChange={handleChange('numberOfSeats')}
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
                                                    onClick={() => setValues({...values, numberOfSeats: ''})}
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
                            </FormControl>*/}
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
                        {carTypes
                            .map((item, index) => {
                                return (
                                    <Grid item xs={3} key={item._id}>
                                        <CarTypeCard
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
                            })}
                    </Grid>
                    <Fab aria-label="add"
                         onClick={openAddCarTypeDialog}
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

export default CarTypeList;