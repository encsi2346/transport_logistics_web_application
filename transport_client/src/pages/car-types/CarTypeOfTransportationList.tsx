import PageHeader from "../../components/text/PageHeader";
import {Box, Fab, Grid} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useModal} from "@ebay/nice-modal-react";
import CarTypeOfTransportationCard from '../../components/layout/carTypeOfTransportationCard';
import AddIcon from "@mui/icons-material/Add";
import NewTypeOfTransportationAddDialog from "./NewTypeOfTransportationAddDialog";

const CarTypeOfTransportationList = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const addTypeOfTransportationDialog = useModal(NewTypeOfTransportationAddDialog);
    const [search, setSearch] = useState('');
    const [typeOfTransportationList, setTypeOfTransportationList] = useState([]);
    const [values, setValues] = useState({
        _id: '',
        type: '',
        countOfCars: ''
    });

    const handleLoadTypeOfTransportation = async () => {
        const getResponse = await fetch(
            `http://localhost:3001/api/type-of-transportation`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getTypeOfTransportationData = await getResponse.json();
        setTypeOfTransportationList(getTypeOfTransportationData);
    }

    useEffect(() => {
        handleLoadTypeOfTransportation();
    }, []);

    const createTypeOfTransportation = async (data: any) => {
        try {
            const createTypeOfTransportationResponse = await fetch(
                `http://localhost:3001/api/type-of-transportation/addCarTypeOfTransportation`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getTypeOfTransportationData = await createTypeOfTransportationResponse.json();
            const getStatus = createTypeOfTransportationResponse.status;
            console.log('getTypeOfTransportationData', getTypeOfTransportationData);
            console.log('getUserStatus', getStatus);
            setTypeOfTransportationList(getTypeOfTransportationData);
            return getTypeOfTransportationData;
        } catch (error) {
            console.error('Error creating type of transportation:', error);
        }
    };

    const updateTypeOfTransportation = async (id: string, data: any) => {
        try {
            const updatedTypeOfTransportationResponse = await fetch(
                `http://localhost:3001/api/type-of-transportation/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getTypeOfTransportationData = await updatedTypeOfTransportationResponse.json();
            const getStatus = updatedTypeOfTransportationResponse.status;
            console.log('getTypeOfTransportationData', getTypeOfTransportationData);
            console.log('getUserStatus', getStatus);
            setTypeOfTransportationList(getTypeOfTransportationData);
            return getTypeOfTransportationData;
        } catch (error) {
            console.error(`Error updating type of transportation with ID ${id}:`, error);
        }
    };

    const openAddTypeOfTransportationDialog = () => {
        addTypeOfTransportationDialog
            .show({
                title: t('TYPE_OF_TRANSPORTATION.ADD_NEW_TYPE_OF_TRANSPORTATION'),
                acceptText: t('TEXT.CREATE'),
                resolveText: t('TEXT.CANCEL')
            })
            .then((value) => {
                if (value._id) {
                    // If the modal returns an ID, update the existing type
                    updateTypeOfTransportation(value._id, {
                        carTypeOfTransportationId: value.carTypeOfTransportationId,
                        type: value.type,
                        countOfCars: value.countOfCars
                    });
                } else {
                    // Otherwise, create a new type of transportation
                    createTypeOfTransportation({
                        carTypeOfTransportationId: value.carTypeOfTransportationId,
                        type: value.type,
                        countOfCars: value.countOfCars
                    });
                }
                handleLoadTypeOfTransportation();
            })
            .catch(() => null);
    };

    return (
        <Box>
            <PageHeader text={t('CAR_TYPES.CAR_TYPE_OF_TRANSPORTATIONS')}/>
            <ContentCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Grid container rowSpacing={3} columnSpacing={-38} >
                        {typeOfTransportationList
                            .map((item, index) => {
                                return (
                                    <Grid item xs={5} key={item._id}>
                                        <CarTypeOfTransportationCard
                                            onClick={() => navigate(`/type-of-transportation/${item._id}/car-types`)}
                                            id={item.carTypeOfTransportationId}
                                            type={item.type}
                                            countOfCars={item.countOfCars}
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                    <Fab aria-label="add"
                         onClick={openAddTypeOfTransportationDialog}
                         sx={{
                             margin: 0,
                             top: 'auto',
                             right: '40px',
                             bottom: '40px',
                             left: 'auto',
                             position: 'fixed',
                             width: '70px',
                             height: '70px',
                             backgroundColor: '#a40500',
                             color: '#ffffff'
                         }}
                    >
                        <AddIcon sx={{ width: '40px', height: '40px'}}/>
                    </Fab>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default CarTypeOfTransportationList;