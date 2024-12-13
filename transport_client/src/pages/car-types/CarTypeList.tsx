import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import {Box, Fab, FormControl, Grid, Input, InputAdornment, TextField, Tooltip, useTheme} from "@mui/material";
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
import UniqueIconButton from "../../components/button/UniqueIconButton";
import DeleteIcon from "@mui/icons-material/Delete";


const CarTypeList = () => {
    const { id } = useParams();
    const theme = useTheme();
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
        <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
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
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        marginTop: 1,
                        marginBottom: 5,
                        marginLeft: 2,
                        gap: 4,
                        paddingRight: 5
                    }}>
                            <FormControl sx={{ width: { xs: '100%', sm: 'auto' } }}>
                                <TextField
                                    id="brand"
                                    placeholder={t('CAR_TYPES.BRAND')}
                                    name='brand'
                                    label={t('CAR_TYPES.BRAND')}
                                    value={values.brand}
                                    onChange={handleChange('brand')}
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
                        <AddIcon sx={{ width: { xs: '24px', sm: '40px' }, height: { xs: '24px', sm: '40px' } }}/>
                    </Fab>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default CarTypeList;