import {Box, Fab, FormControl, Input, InputAdornment} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useLocation, useNavigate} from "react-router-dom";
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

const ProductsItemList = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const addProductsItemDialog = useModal(ProductItemAddDialog);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([
        {
            id: 1,
            productName: 'Termék1',
            availability: 'Készleten',
        },
        {
            id: 2,
            productName: 'Termék2',
            availability: 'Készlethiány',
        },
        {
            id: 3,
            productName: 'Termék3',
            availability: 'Készleten',
        },
        {
            id: 4,
            productName: 'Termék4',
            availability: 'Készlethiány',
        },
        {
            id: 5,
            productName: 'Termék5',
            availability: 'Készleten',
        },
    ]);

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

    const handleLoadProducts = async () => {
        const getResponse = await fetch(
            `http://localhost:3001/api/products`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getProductsData = await getResponse.json();
        const getStatus = getResponse.status;
        console.log('getProductsData', getProductsData);
        console.log('getUserStatus', getStatus);
        //setProducts(getProductsData);
    }

    useEffect(() => {
        handleLoadProducts();
    }, []);

    return (
        <Box>
            <PageHeader text={t('PRODUCTS.PRODUCTS')}/>
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
                            placeholder={t('PRODUCTS.PRODUCT_NAME')}
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
                            placeholder={t('PRODUCTS.AVAILABILITY')}
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
                </Box>
            </FilterCard>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10, height: 900}}>
                    <ProductsTableQuery
                        searchResults={
                            products
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.productName.toLowerCase().includes(search);
                                })
                        }
                    />
                    <Fab aria-label="add"
                         onClick={openAddProductsItemDialog}
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

export default ProductsItemList;