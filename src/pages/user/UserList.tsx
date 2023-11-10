import {Box, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import NoBackgroundCard from "../../components/layout/NoBackgroundCard";
import UserTableComponent from "../../components/layout/UserTableComponent";

const UserList = () => {
    return (
        <Box>
            <PageHeader text={'Alkalmazottak'}/>
            <FilterCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </Box>
                </Box>
            </FilterCard>
            <NoBackgroundCard>
                <UserTableComponent />
            </NoBackgroundCard>
        </Box>
    );
};

export default UserList;