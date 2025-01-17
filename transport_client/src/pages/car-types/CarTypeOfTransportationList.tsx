import PageHeader from "../../components/text/PageHeader";
import {Box, Fab, Grid, Tooltip, useTheme} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useModal} from "@ebay/nice-modal-react";
import CarTypeOfTransportationCard from '../../components/layout/carTypeOfTransportationCard';
import AddIcon from "@mui/icons-material/Add";
import NewTypeOfTransportationAddDialog from "./NewTypeOfTransportationAddDialog";
import UniqueIconButton from "../../components/button/UniqueIconButton";
import EditIcon from '@mui/icons-material/Edit';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const CarTypeOfTransportationList = () => {
    const theme = useTheme();
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const addTypeOfTransportationDialog = useModal(NewTypeOfTransportationAddDialog);
    const [search, setSearch] = useState('');
    const [isEditing, setIsEditing] = useState(false);
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
        <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <PageHeader text={t('CAR_TYPES.CAR_TYPE_OF_TRANSPORTATIONS')}/>
                <Tooltip title={t('TEXT.EDIT')}>
                    <UniqueIconButton
                        onClick={() => setIsEditing(!isEditing)}
                        icon={isEditing ? <ClearRoundedIcon sx={{width: 25, height: 25}} /> : <EditIcon sx={{width: 25, height: 25}}/>}/>
                </Tooltip>
            </Box>
            <ContentCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Grid container rowSpacing={3} columnSpacing={-38}>
                        {typeOfTransportationList
                            .map((item, index) => {
                                return (
                                    <Grid item xs={5} key={item._id}>
                                        <CarTypeOfTransportationCard
                                            onClick={() => navigate(`/type-of-transportation/${item._id}/car-types`)}
                                            id={item._id}
                                            type={item.type}
                                            countOfCars={item.countOfCars}
                                            isEditing={isEditing}
                                            refreshParent={handleLoadTypeOfTransportation}
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                    <Fab aria-label="add"
                         data-testid='new-type-of-transportation-button'
                         onClick={openAddTypeOfTransportationDialog}
                         sx={{
                             margin: 0,
                             top: 'auto',
                             bottom: { xs: 16, sm: 32 },
                             right: { xs: 16, sm: 32 },
                             left: 'auto',
                             position: 'fixed',
                             width: { xs: '50px', sm: '60px' },
                             height: { xs: '50px', sm: '60px' },
                             backgroundColor: '#DD1C13' || `${theme.palette.component.dark}`,
                             color: '#ffffff'
                         }}
                    >
                        <AddIcon sx={{ width: { xs: '24px', sm: '40px' }, height: { xs: '24px', sm: '40px' } }}/>
                    </Fab>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default CarTypeOfTransportationList;