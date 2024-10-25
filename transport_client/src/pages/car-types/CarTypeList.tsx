import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import {Box, FormControl, Grid, Input, InputAdornment} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard";
import CarTypeCard from "../../components/layout/CarTypeCard";
import {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {useLocation, useNavigate} from "react-router-dom";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import SaveButton from "../../components/button/SaveButton";
import {useModal} from "@ebay/nice-modal-react";
import CarTypeAddDialog from "./CarTypeAddDialog";
import {useForm} from "react-hook-form";
import {carTypeEditFormSchema, CarTypeEditFormSchema} from "./schemas/car-type-edit-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";

const CarTypeList = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const addCarTypeDialog = useModal(CarTypeAddDialog);
    const [search, setSearch] = useState('');
    const [carTypes, setCartTypes] = useState([
        {
            id: 1,
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5',
            licencePlate: 'AAA-123',
            image: '',
            countOfTransportation: 18
        },
        {
            id: 2,
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5',
            licencePlate: 'BBB-123',
            image: '',
            countOfTransportation: 3
        },
        {
            id: 3,
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5',
            licencePlate: 'CCC-123',
            image: '',
            countOfTransportation: 9
        },
        {
            id: 4,
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5',
            licencePlate: 'DDD-123',
            image: '',
            countOfTransportation: 12
        },
        {
            id: 5,
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5',
            licencePlate: 'EEE-123',
            image: '',
            countOfTransportation: 14
        },
    ]);

    const {
        setValue,
        formState: { isValid },
    } = useForm<CarTypeEditFormSchema>({
        defaultValues: {
            carTypeId: '',
            brand: '',
            typeName: '',
            design: '',
            performance: '',
            selfWeight: null,
            usefulWeight: null,
            numberOfSeats: null,
            fuel: null,
            vontatas: null,
            height: null,
            szelesseg: null,
            long: null
        },
        resolver: zodResolver(carTypeEditFormSchema()),
        mode: 'all',
    });

    const handleLoadCarTypes = async () => {
        const getResponse = await fetch(
            'http://localhost:3001/api/car-types',
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getCarTypesData = await getResponse.json();
        const getStatus = getResponse.status;
        console.log('getCarTypesData', getCarTypesData);
        console.log('getUserStatus', getStatus);
        setCartTypes(getCarTypesData);
    }

    useEffect(() => {
        handleLoadCarTypes();
    }, []);

    const openAddCarTypeDialog = () => {
        addCarTypeDialog
            .show({
                title: t('CAR_TYPES.ADD_NEW_CAR_TYPE'),
                acceptText: t('TEXT.CREATE'),
            })
            .then((value) => {
                setValue('carTypes', value as string[]);
            })
            .catch(() => null);
    };

    return (
        <Box>
            <PageHeader text={t('TEXT.CAR_TYPES')}/>
            <FilterCard>
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

            <ContentCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Grid container rowSpacing={3} columnSpacing={-38} >
                        {carTypes
                            .filter((item) => {
                                return search.toLowerCase() === ''
                                    ? item
                                    : item.brand.toLowerCase().includes(search);
                            })
                            .map((item, index) => {
                                return (
                                    <Grid item xs={3} key={item.subType}>
                                        <CarTypeCard
                                            onClick={() => navigate(`/type-of-transportation/${item.typeid}/car-types/${item.id}`)}
                                            id={item.id}
                                            brand={item.brand}
                                            type={item.type}
                                            subType={item.subType}
                                            licencePlate={item.licencePlate}
                                            image={item.image}
                                            countOfTransportation={item.countOfTransportation}
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default CarTypeList;