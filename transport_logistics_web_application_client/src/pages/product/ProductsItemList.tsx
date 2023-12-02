import {Box, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader.tsx";
import FilterCard from "../../components/layout/FilterCard.tsx";
import NewButton from "../../components/button/NewButton.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import GoodsTableComponent from "../../components/layout/GoodsTableComponent.tsx";

const ProductsItemList = () => {
    return (
        <Box>
            <PageHeader text={'Raktárkészlet'}/>
            <FilterCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <NewButton />
                    </Box>
                </Box>
            </FilterCard>
            <ContentCard>
                <GoodsTableComponent />
            </ContentCard>
        </Box>
    );
};

export default ProductsItemList;