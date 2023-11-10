import PageHeader from "../../components/text/PageHeader.tsx";
import FilterCard from "../../components/layout/FilterCard.tsx";
import {Box, TextField} from "@mui/material";
import NoBackgroundCard from "../../components/layout/NoBackgroundCard.tsx";
import CarTypeCard from "../../components/layout/CarTypeCard.tsx";

const CarTypeList = () => {
    return (
        <Box>
            <PageHeader text={'Új autó hozzáadása'}/>
            <FilterCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </Box>
                </Box>
            </FilterCard>
            <NoBackgroundCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <CarTypeCard carType={'Fiat Ducato'}/>
                        <CarTypeCard carType={'Fiat Ducato'}/>
                        <CarTypeCard carType={'Fiat Ducato'}/>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <CarTypeCard carType={'Fiat Ducato'}/>
                    </Box>
                </Box>
            </NoBackgroundCard>
        </Box>
    );
};

export default CarTypeList;