import {Box, Fab, FormControl, Input, InputAdornment, TextField, Tooltip, useTheme} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import useSelection from "../../components/inputField/hooks/useSelection";
import {useForm} from "react-hook-form";
import ProductsTableQuery from "./ProductsTableQuery";
import SaveButton from "../../components/button/SaveButton";
import AddIcon from "@mui/icons-material/Add";
import {useModal} from "@ebay/nice-modal-react";
import CarAddDialog from "../cars/CarAddDialog";
import ProductItemAddDialog from "./ProductItemAddDialog";
import {toast, ToastContainer} from "react-toastify";
import UniqueIconButton from "../../components/button/UniqueIconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductsItemList = () => {
    const theme = useTheme();
    const { id } = useParams();
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const addProductsItemDialog = useModal(ProductItemAddDialog);
    const [search, setSearch] = useState('name');
    const [values, setValues] = useState({
        driverName: '',
        startDate: ''
    });
    const [filtersReset, setFiltersReset] = useState(false);
    const [products, setProducts] = useState([]);
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

    const { control, reset, handleSubmit, setValue } = useForm({
        defaultValues: {
            taskIdIn: [],
            onlyActives: false,
        },
    });

    const notify = ({text, type}) => {
        if (type === 'success') {
            toast.success(`${text}`, {
                position: "bottom-right"
            });
        } else if (type === 'warning') {
            toast.warning(`${text}`, {
                position: "bottom-right"
            });
        } else if (type === 'error') {
            toast.error(`${text}`, {
                position: "bottom-right"
            });
        }
    };

    const openAddProductsItemDialog = () => {
        addProductsItemDialog
            .show({
                title: t('PRODUCTS.ADD_NEW_PRODUCT'),
                acceptText: t('TEXT.CREATE'),
            })
            .then((value) => {
                setValue('products', value as string[]);
            })
            .catch(() => null);
    };

    const handleLoadPaginatedProducts = async () => {
        try {
            const params = new URLSearchParams({
                sortBy: search,
                page: String(page),
                limit: String(limit),
                category: id,
            });

            const response = await fetch(
                `http://localhost:3001/api/paginated-products?${params.toString()}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }

            const data = await response.json();
            setProducts(data.products || []);
            setPage(data.page);
            setLimit(data.limit);
            setPages(data.pages);
            setTotal(data.total);
        } catch (error) {
            console.error('Error loading paginated products:', error);
        }
    };

    useEffect(() => {
        handleLoadPaginatedProducts();
    }, [page, limit, search]);

    const handlePageChange = (newPage: any) => {
        setPage((newPage + 1)); // Convert to 1-based index and string
        handleLoadPaginatedProducts(); // Fetch data for the new page
    };

    const handlePageSizeChange = (newPageSize: any) => {
        setLimit(newPageSize); // Ensure limit remains a string
        setPage(1); // Reset to page 1 whenever limit changes
        handleLoadPaginatedProducts();
    };

    useEffect(() => {
        setPagination({
            page: page - 1, // Adjust for 0-based indexing
            pages: pages,
            pageSize: limit,
            total: total
        });
    }, [page, limit, pages, total]);

    useEffect(() => {
        if (products.length > 0) {
            products.map((product) => {
                if (product.status === 'out_of_stock') {
                    notify( { text:'OUT OF STOCK!', type: 'error'});
                }
            })
        }
    }, [products]);

    const onSubmit = handleSubmit((data) => {});

    const onReset = () => {
        setValues({
            driverName: '',
            startDate: ''
        });
        setFiltersReset(true);
        setTransportations([]);
    };

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
    };

    const submitData = async () => {
        try {
            setFiltersReset(false);
            const getResponse = await fetch(
                `http://localhost:3001/api/transportations/search?driverName=${values.driverName}&startDate=${values.startDate}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const searchTransportationsQuery = await getResponse.json();
            setTransportations(searchTransportationsQuery.content || []);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
            <PageHeader text={t('PRODUCTS.PRODUCTS')}/>
            <FilterCard>
                <form
                    autoComplete='off'
                    onSubmit={
                        async (e) => {
                            e.preventDefault();
                            submitData();
                        }}
                >
                    <Box sx={{display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'space-between'}}>
                        <Box sx={{
                            marginTop: 1,
                            marginBottom: 5,
                            marginLeft: 2,
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            gap: 4
                        }}>
                        <FormControl sx={{ width: { xs: '100%', sm: 'auto' } }}>
                            <TextField
                                id="category"
                                placeholder={t('PRODUCTS.PRODUCT_NAME')}
                                name='category'
                                label={t('PRODUCTS.PRODUCT_NAME')}
                                value={values.category}
                                onChange={handleChange('category')}
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
                <Box sx={{display: 'flex', marginTop: 2, marginBottom: 10, height: 550}}>
                    {/*<ProductsTableQuery
                        searchResults={
                            products
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.productName.toLowerCase().includes(search);
                                })
                        }
                    />*/}
                    <ProductsTableQuery
                            searchResults={products/*.filter((item) => {
                                return search.toLowerCase() === ''
                                    ? item
                                    : item.name.toLowerCase().includes(search);
                            })*/}
                            defaultPagination={pagination}
                            onPageChange={handlePageChange}
                            onPageSizeChange={handlePageSizeChange}
                    />

                    <Fab aria-label="add"
                         onClick={openAddProductsItemDialog}
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
            <ToastContainer />
        </Box>
    );
};

export default ProductsItemList;