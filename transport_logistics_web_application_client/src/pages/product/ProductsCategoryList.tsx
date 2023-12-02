import PageHeader from "../../components/text/PageHeader.tsx";
import FilterCard from "../../components/layout/FilterCard.tsx";
import {Box, FormControl, Grid, Input, InputAdornment} from "@mui/material";
import NewButton from "../../components/button/NewButton.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import GoodsTypeCard from "../../components/layout/GoodsTypeCard.tsx";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const ProductsCategoryList = () => {
    const { t } = useTypeSafeTranslation();
    const location = useLocation();
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([
        {
            category: 'Kategória1',
            availability: 'Készleten',
        },
        {
            category: 'Kategória3',
            availability: 'Készlethiány',
        },
        {
            category: 'Kategória4',
            availability: 'Készleten',
        },
        {
            category: 'Kategória5',
            availability: 'Készlethiány',
        },
        {
            category: 'Kategória2',
            availability: 'Készleten',
        },
    ]);

    return (
        <Box>
            <PageHeader text={t('TEXT.PRODUCT_CATEGORIES')}/>
            <FilterCard>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
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
                            placeholder="Search category"
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
                            placeholder="Search availability"
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
                    <NewButton />
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
                                    <Grid item xs={4} key={item.category}>
                                        <GoodsTypeCard category={item.category} availability={item.availability}/>
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