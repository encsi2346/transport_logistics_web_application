import {Box, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import NoBackgroundCard from "../../components/layout/NoBackgroundCard";
import RequestTableComponent from "../../components/layout/RequestTableComponent";

const RequestList = () => {
    return (
        <Box>
            <PageHeader text={'Egyedi kérések'}/>
            <FilterCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </Box>
                </Box>
            </FilterCard>
            <NoBackgroundCard>
                <RequestTableComponent />
            </NoBackgroundCard>
        </Box>
    );
};

export default RequestList;