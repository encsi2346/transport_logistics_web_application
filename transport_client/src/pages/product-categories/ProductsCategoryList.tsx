import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import {Box, FormControl, Grid, Input, InputAdornment} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard";
import GoodsTypeCard from "../../components/layout/GoodsTypeCard";
import {useTypeSafeTranslation} from "../../components/inputfield/hooks/useTypeSafeTranslation";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import SaveButton from "../../components/button/SaveButton";
import {useModal} from "@ebay/nice-modal-react";
import ProductCategoryAddDialog from "./ProductCategoryAddDialog";
import {useForm} from "react-hook-form";
import {carTypeEditFormSchema, CarTypeEditFormSchema} from "../car-types/schemas/car-type-edit-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";

const ProductsCategoryList = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const addProductCategoryDialog = useModal(ProductCategoryAddDialog);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([
        {
            id: 1,
            category: 'Kategória1',
            availability: 'Készleten',
        },
        {
            id: 2,
            category: 'Kategória3',
            availability: 'Készlethiány',
        },
        {
            id: 3,
            category: 'Kategória4',
            availability: 'Készleten',
        },
        {
            id: 4,
            category: 'Kategória5',
            availability: 'Készlethiány',
        },
        {
            id: 5,
            category: 'Kategória2',
            availability: 'Készleten',
        },
    ]);

    const {
        setValue,
        formState: { isValid },
    } = useForm<CarTypeEditFormSchema>({
        defaultValues: {
            carTypeName: '',
            carFunctionalDesign: '',
            performance: '',
            ownWeight: '',
            numberOfSeats: '',
            fuel: '',
            usefulWeight: '',
        },
        resolver: zodResolver(carTypeEditFormSchema()),
        mode: 'all',
    });

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
        const getStatus = getResponse.status;
        console.log('getProductCategoriesData', getProductCategoriesData);
        console.log('getUserStatus', getStatus);
        setCategories(getProductCategoriesData);
    }

    useEffect(() => {
        handleLoadProductCategories();
    }, []);

    return (
        <Box>
            <PageHeader text={t('TEXT.PRODUCT_CATEGORIES')}/>
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
                            id="category"
                            placeholder={t('PRODUCT_CATEGORIES.PRODUCT_CATEGORY')}
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
                            id="availability"
                            placeholder={t('PRODUCT_CATEGORIES.AVAILABILITY')}
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
                        <SaveButton text={t('PRODUCT_CATEGORIES.NEW_PRODUCT_CATEGORY')} onClick={openAddProductCategoryDialog} />
                    </Box>
                </Box>
            </FilterCard>

            <ContentCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Grid container rowSpacing={3} columnSpacing={-75} >
                        {categories
                            .filter((item) => {
                                return search.toLowerCase() === ''
                                    ? item
                                    : item.category.toLowerCase().includes(search);
                            })
                            .map((item, index) => {
                                return (
                                    <Grid item xs={3} key={item.id}>
                                        <GoodsTypeCard
                                            onClick={() => navigate(`/products-categories/${item.id}/products`)}
                                            id={item.id}
                                            category={item.category}
                                            availability={item.availability}
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default ProductsCategoryList;