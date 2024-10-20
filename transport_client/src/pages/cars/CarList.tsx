import {Box, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import CarTableComponent from "../../components/layout/CarTableComponent";
import {useEffect} from "react";

const CarList = () => {

    const handleLoadCars = async () => {
        const getResponse = await fetch(
            `http://localhost:3001/api/cars`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getCarsData = await getResponse.json();
        const getStatus = getResponse.status;
        console.log('getCarsData', getCarsData);
        console.log('getUserStatus', getStatus);
        //setCars(getCarsData);
    }

    useEffect(() => {
        handleLoadCars();
    }, []);

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