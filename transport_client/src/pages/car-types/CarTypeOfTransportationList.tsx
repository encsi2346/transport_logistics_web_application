import PageHeader from "../../components/text/PageHeader";
import {Box, Fab, Grid} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard";
import React, {useState} from "react";
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
    const [typeOfTransportationList, setTypeOfTransportationList] = useState([
        {
            carTypeOfTransportationId: 1,
            type: 'Ponyvás szállítás',
            countOfCars: 12
        },
        {
            carTypeOfTransportationId: 2,
            type: 'Hűtött szállítás',
            countOfCars: 8
        },
        {
            carTypeOfTransportationId: 3,
            type: 'Folyékony szállítás',
            countOfCars: 2
        },
        {
            carTypeOfTransportationId: 4,
            type: 'Jármű szállítás',
            countOfCars: 6
        },
        {
            carTypeOfTransportationId: 5,
            type: 'Konténeres szállítás',
            countOfCars: 5
        },
        {
            carTypeOfTransportationId: 6,
            type: 'Kisteherautó',
            countOfCars: 52
        },
    ]);

    const openAddTypeOfTransportationDialog = () => {
        addTypeOfTransportationDialog
            .show({
                title: t('TYPE_OF_TRANSPORTATION.ADD_NEW_TYPE_OF_TRANSPORTATION'),
                acceptText: t('TEXT.CREATE'),
            })
            .then((value) => {
                setValue('carTypeOfTransportations', value as string[]);
            })
            .catch(() => null);
    };

    return (
        <Box>
            <PageHeader text={t('CAR_TYPES.CAR_TYPE_OF_TRANSPORTATIONS')}/>
            {/*<FilterCard>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 3}}>
                    <FormControl sx={{
                        marginTop: 1,
                        marginBottom: 5,
                        marginLeft: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2
                    }}>
                        <Input
                            id="brand"
                            placeholder={t('CAR_TYPES.BRAND')}
                            autoFocus
                            onChange={(e) => setSearch(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon sx={{color: '#000000'}}/>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end" onClick={() => setSearch('')}>
                                    <ClearIcon sx={{color: '#000000', cursor: 'pointer'}}/>
                                </InputAdornment>
                            }
                            disableUnderline={true}
                            sx={{
                                backgroundColor: `#ffffff`,
                                borderRadius: '13px',
                                color: `#000000`,
                                textDecoration: 'none',
                                height: 40,
                                width: 250,
                                fontSize: "15px",
                                paddingLeft: 1,
                                paddingRight: 1
                            }}
                        />
                        <Input
                            id="fuel"
                            placeholder={t('CAR_TYPES.FUEL')}
                            autoFocus
                            onChange={(e) => setSearch(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon sx={{color: '#000000'}}/>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end" onClick={() => setSearch('')}>
                                    <ClearIcon sx={{color: '#000000', cursor: 'pointer'}}/>
                                </InputAdornment>
                            }
                            disableUnderline={true}
                            sx={{
                                backgroundColor: `#ffffff`,
                                borderRadius: '13px',
                                color: `#000000`,
                                textDecoration: 'none',
                                height: 40,
                                width: 250,
                                fontSize: "15px",
                                paddingLeft: 1,
                                paddingRight: 1
                            }}
                        />
                        <Input
                            id="numberOfSeats"
                            placeholder={t('CAR_TYPES.NUMBER_OF_SEATS')}
                            autoFocus
                            onChange={(e) => setSearch(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon sx={{color: '#000000'}}/>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end" onClick={() => setSearch('')}>
                                    <ClearIcon sx={{color: '#000000', cursor: 'pointer'}}/>
                                </InputAdornment>
                            }
                            disableUnderline={true}
                            sx={{
                                backgroundColor: `#ffffff`,
                                borderRadius: '13px',
                                color: `#000000`,
                                textDecoration: 'none',
                                height: 40,
                                width: 250,
                                fontSize: "15px",
                                paddingLeft: 1,
                                paddingRight: 1
                            }}
                        />
                    </FormControl>
                    <Box sx={{ display: 'inline', paddingLeft: 85}}>
                        <SaveButton text={t('CAR_TYPES.ADD_NEW_CAR_TYPE')} onClick={openAddCarTypeDialog} />
                    </Box>
                </Box>
            </FilterCard>
            TODO: a szállítási típusokon(ezek szállítási típusok) belül nyissa meg a cartypeot(ezek konkrét autótípusok) és azon belül a konkrét autókat(ezek vannak rendszámozva)
            */}

            <ContentCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Grid container rowSpacing={3} columnSpacing={-38} >
                        {typeOfTransportationList
                            .map((item, index) => {
                                return (
                                    <Grid item xs={5} key={item.carTypeOfTransportationId}>
                                        <CarTypeOfTransportationCard
                                            onClick={() => navigate(`/type-of-transportation/${item.carTypeOfTransportationId}/car-types`)}
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