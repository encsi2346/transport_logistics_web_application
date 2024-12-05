import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import {Box, Fab, FormControl, Grid, Input, InputAdornment, TextField} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard";
import GoodsTypeCard from "../../components/layout/GoodsTypeCard";
import {useTypeSafeTranslation} from "../../components/inputfield/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import SaveButton from "../../components/button/SaveButton";
import {useModal} from "@ebay/nice-modal-react";
import ProductCategoryAddDialog from "./ProductCategoryAddDialog";
import AddIcon from "@mui/icons-material/Add";

const ProductsCategoryList = () => {
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
            })
            .then((value) => {
                setValue('carTypes', value as string[]);
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

    return (
        <Box>
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
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'space-between'}}>
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
                                    id="category"
                                    placeholder='Példa Éva'
                                    name='name'
                                    label={t('PRODUCT_CATEGORIES.PRODUCT_CATEGORY')}
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
                                    id="availability"
                                    placeholder='Példa Éva'
                                    name='status'
                                    label={t('PRODUCT_CATEGORIES.AVAILABILITY')}
                                    value={values.status}
                                    onChange={handleChange('status')}
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
                                                    onClick={() => setValues({...values, status: ''})}
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
                    <Grid container rowSpacing={3} columnSpacing={-75}>
                        {categories
                            .filter((item) => {
                                return search.toLowerCase() === ''
                                    ? item
                                    : item.name.toLowerCase().includes(search);
                            })
                            .map((item, index) => {
                                return (
                                    <Grid item xs={3} key={item.id}>
                                        <GoodsTypeCard
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
                         onClick={openAddProductCategoryDialog}
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

export default ProductsCategoryList;