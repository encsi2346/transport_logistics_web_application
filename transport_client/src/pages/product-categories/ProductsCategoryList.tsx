import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import {Box, Fab, FormControl, Grid, Input, InputAdornment, TextField, Tooltip, useTheme} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard";
import ProductCategoryCard from "../../components/layout/ProductCategoryCard";
import {useTypeSafeTranslation} from "../../components/inputfield/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import SaveButton from "../../components/button/SaveButton";
import {useModal} from "@ebay/nice-modal-react";
import ProductCategoryAddDialog from "./ProductCategoryAddDialog";
import AddIcon from "@mui/icons-material/Add";
import UniqueIconButton from "../../components/button/UniqueIconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductsCategoryList = () => {
    const theme = useTheme();
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const addProductCategoryDialog = useModal(ProductCategoryAddDialog);
    const [search, setSearch] = useState('');
    const [values, setValues] = useState({
        productCategoryId: '',
        name: '',
        description: '',
        status: '',
    });
    const [filtersReset, setFiltersReset] = useState(false);
    const [categories, setCategories] = useState([]);

    const openAddProductCategoryDialog = () => {
        addProductCategoryDialog
            .show({
                title: t('PRODUCT_CATEGORIES.NEW_PRODUCT_CATEGORY'),
                acceptText: t('TEXT.CREATE'),
                resolveText: t('TEXT.CANCEL')
            })
            .then((value) => {
                if (value._id) {
                    // If the modal returns an ID, update the existing type
                    updateProductCategory(value._id, {
                        productCategoryId: value.productCategoryId,
                        name: value.name,
                        description: value.description,
                        status: value.status
                    });
                } else {
                    // Otherwise, create a new type of transportation
                    createProductCategory({
                        productCategoryId: value.productCategoryId,
                        name: value.name,
                        description: value.description,
                        status: value.status,
                    });
                }
                handleLoadProductCategories();
            })
            .catch(() => null);
    };

    const handleLoadProductCategories = async () => {
        const getResponse = await fetch(
            `http://localhost:3001/api/product-categories`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getProductCategoriesData = await getResponse.json();
        setCategories(getProductCategoriesData);
    }

    useEffect(() => {
        handleLoadProductCategories();
    }, []);


    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
    };

    const onReset = () => {
        setValues({
            driverName: '',
            startDate: ''
        });
        setFiltersReset(true);
        setCategories([]);
    };

    const submitData = async () => {
        try {
            setFiltersReset(false);
            const getResponse = await fetch(
                `http://localhost:3001/api/product-categories/search?category=${values.category}&availability=${values.availability}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const searchCategoriesQuery = await getResponse.json();
            setCategories(searchCategoriesQuery.content || []);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleProductStatusList = async () => {
        const getResponse = await fetch(
            "http://localhost:3001/api/productStatus",
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getProductStatusList = await getResponse.json();
        //const getStatus = getResponse.status;
        console.log('ProductStatus', getProductStatusList);

        const formattedProductStatusList = getProductStatusList.map(productStatus => ({
            value: productStatus,
            label: productStatus.charAt(0).toUpperCase() + productStatus.slice(1)
        }));
        console.log('formattedProductStatusList', formattedProductStatusList);
        setProductStatusList(formattedProductStatusList);
    }

    useEffect(() => {
        handleProductStatusList();
    }, [])

    const getProductCategory = async (id: string) => {
        try {
            const getProductCategoryResponse = await fetch(
                `http://localhost:3001/api/product-categories/${id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getProductCategoryData = await getProductCategoryResponse.json();
            const getStatus = getProductCategoryResponse.status;
            console.log('getProductCategoryData', getProductCategoryData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
        } catch (error) {
            console.error('Error get product category:', error);
        }
    }

    const createProductCategory = async (data: any) => {
        try {
            const createProductCategoryResponse = await fetch(
                `http://localhost:3001/api/product-categories/addProductCategory`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getProductCategoryData = await createProductCategoryResponse.json();
            const getStatus = createProductCategoryResponse.status;
            console.log('getProductCategoryData', getProductCategoryData);
            console.log('getUserStatus', getStatus);
            setCategories(getProductCategoryData);
            return getProductCategoryData;
        } catch (error) {
            console.error('Error creating product category:', error);
        }
    };

    const updateProductCategory = async (id: string, data: any) => {
        try {
            const updatedProductCategoryResponse = await fetch(
                `http://localhost:3001/api/product-categories/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getProductCategoryData = await updatedProductCategoryResponse.json();
            const getStatus = updatedProductCategoryResponse.status;
            console.log('getProductCategoryData', getProductCategoryData);
            console.log('getUserStatus', getStatus);
            setCategories(getProductCategoryData);
            return getProductCategoryData;
        } catch (error) {
            console.error(`Error updating product category with ID ${id}:`, error);
        }
    };

    const deleteProductCategory = async (id: string) => {
        //TODO
        try {
            const deleteProductCategoryResponse = await fetch(
                `http://localhost:3001/api/product-categories/${id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getProductCategoryData = await deleteProductCategoryResponse.json();
            const getStatus = deleteProductCategoryResponse.status;
            console.log('getProductCategoryData', getProductCategoryData);
            console.log('getUserStatus', getStatus);
            setCategories(getProductCategoryData);
            return getProductCategoryData;
        } catch (error) {
            console.error(`Error deleting product category with ID ${id}:`, error);
        }
    };

    return (
        <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
            <PageHeader text={t('TEXT.PRODUCT_CATEGORIES')}/>
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
                                    id="name"
                                    placeholder={t('PRODUCT_CATEGORIES.PRODUCT_CATEGORY')}
                                    name='name'
                                    label={t('PRODUCT_CATEGORIES.PRODUCT_CATEGORY')}
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
                                    <UniqueIconButton onClick={onReset} icon={<DeleteIcon sx={{ width: '25px', height: '25px' }} />}/>
                                </Tooltip>
                            </div>
                        </Box>
                    </Box>
                </form>
            </FilterCard>

            <ContentCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Grid container rowSpacing={3} columnSpacing={-75}>
                        {categories
                            .filter((item) => {
                                return search.toLowerCase() === ''
                                    ? item
                                    : item.name.toLowerCase().includes(search);
                            })
                            .map((item, index) => {
                                return (
                                    <Grid item xs={4} key={item.id}>
                                        <ProductCategoryCard
                                            onClick={() => navigate(`/products-categories/${item._id}/products`)}
                                            id={item._id}
                                            name={item.name}
                                            status={item.status}
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                    <Fab aria-label="add"
                         data-testid='add-new-product-category-button'
                         onClick={openAddProductCategoryDialog}
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

export default ProductsCategoryList;