import {Box, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader.tsx";
import FilterCard from "../../components/layout/FilterCard.tsx";
import NewButton from "../../components/button/NewButton.tsx";
import NoBackgroundCard from "../../components/layout/NoBackgroundCard.tsx";
import GoodsTableComponent from "../../components/layout/GoodsTableComponent.tsx";

const GoodsItemList = () => {
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
            <NoBackgroundCard>
                <GoodsTableComponent />
            </NoBackgroundCard>
        </Box>
    );
};

export default GoodsItemList;