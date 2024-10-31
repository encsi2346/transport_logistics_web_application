import {Box, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useTypeSafeTranslation} from "../../components/inputfield/hooks/useTypeSafeTranslation";

const CarList = () => {
    const { id } = useParams();
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [values, setValues] = useState({
        brand: '',
        fuel: '',
        numberOfSeats: ''
    });
    const [filtersReset, setFiltersReset] = useState(false);
    const [carTypes, setCartTypes] = useState([
        {
            id: 1,
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5',
            licencePlate: 'AAA-123',
            image: '',
            countOfTransportation: 18,
            carTypeOfTransportationId: 2,
        },
        {
            id: 2,
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5',
            licencePlate: 'BBB-123',
            image: '',
            countOfTransportation: 3,
            carTypeOfTransportationId: 2,
        },
        {
            id: 3,
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5',
            licencePlate: 'CCC-123',
            image: '',
            countOfTransportation: 9,
            carTypeOfTransportationId: 2,
        },
        {
            id: 4,
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5',
            licencePlate: 'DDD-123',
            image: '',
            countOfTransportation: 12,
            carTypeOfTransportationId: 2,
        },
        {
            id: 5,
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5',
            licencePlate: 'EEE-123',
            image: '',
            countOfTransportation: 14,
            carTypeOfTransportationId: 2,
        },
    ]);

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
        </Box>
    );
};

export default CarList;