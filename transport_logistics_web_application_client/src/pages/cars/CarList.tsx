import {Box, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import CarTableComponent from "../../components/layout/CarTableComponent";

const CarList = () => {
    return (
        <Box>
            <PageHeader text={'Új autó hozzáadása'}/>
            <FilterCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </Box>
                </Box>
            </FilterCard>
            <ContentCard>
                <CarTableComponent />
            </ContentCard>
        </Box>
    );
};

export default CarList;