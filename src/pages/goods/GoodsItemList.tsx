import {Box, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import NewButton from "../../components/button/NewButton";
import NoBackgroundCard from "../../components/layout/NoBackgroundCard";
import GoodsTableComponent from "../../components/layout/GoodsTableComponent";

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