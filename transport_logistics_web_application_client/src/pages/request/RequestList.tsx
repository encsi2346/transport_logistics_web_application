import {Box, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader.tsx";
import FilterCard from "../../components/layout/FilterCard.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import RequestTableComponent from "../../components/layout/RequestTableComponent.tsx";

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
            <ContentCard>
                <RequestTableComponent />
            </ContentCard>
        </Box>
    );
};

export default RequestList;