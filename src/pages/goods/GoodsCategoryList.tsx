import PageHeader from "../../components/text/PageHeader.tsx";
import FilterCard from "../../components/layout/FilterCard.tsx";
import {Box, TextField} from "@mui/material";
import NewButton from "../../components/button/NewButton.tsx";
import NoBackgroundCard from "../../components/layout/NoBackgroundCard.tsx";
import GoodsTypeCard from "../../components/layout/GoodsTypeCard.tsx";

const GoodsCategoryList = () => {
    return (
        <Box>
            <PageHeader text={'Új autó hozzáadása'}/>
            <FilterCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <NewButton />
                    </Box>
                </Box>
            </FilterCard>
            <NoBackgroundCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <GoodsTypeCard category={'Kategória 1'} availability={'Készleten'}/>
                        <GoodsTypeCard category={'Kategória 1'} availability={'Készleten'}/>
                        <GoodsTypeCard category={'Kategória 1'} availability={'Készleten'}/>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <GoodsTypeCard category={'Kategória 1'} availability={'Készleten'}/>
                    </Box>
                </Box>
            </NoBackgroundCard>
        </Box>
    );
};

export default GoodsCategoryList;