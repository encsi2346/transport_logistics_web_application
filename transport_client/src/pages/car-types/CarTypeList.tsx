import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import {Box, FormControl, Grid, Input, InputAdornment, TextField} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard";
import CarTypeCard from "../../components/layout/CarTypeCard";
import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import SaveButton from "../../components/button/SaveButton";
import {useModal} from "@ebay/nice-modal-react";
import CarTypeAddDialog from "./CarTypeAddDialog";
import {useForm} from "react-hook-form";
import {carTypeEditFormSchema, CarTypeEditFormSchema} from "./schemas/car-type-edit-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";

const CarTypeList = () => {
    const { id } = useParams();
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const addCarTypeDialog = useModal(CarTypeAddDialog);
    const [search, setSearch] = useState('');
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

    /*const {
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
    });*/

    const handleLoadCarTypes = async () => {
        const getResponse = await fetch(
            `http://localhost:3001/api/type-of-transportation/${id}/car-types`,
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

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
    };

    const onReset = () => {
        setValues({
            brand: '',
            fuel: '',
            numberOfSeats: ''
        });
        setFiltersReset(true);
        setCartTypes([]);
    };

    const submitData = async () => {
        try {
            setFiltersReset(false);
            const getResponse = await fetch(
                `http://localhost:3001/api/type-of-transportation/${id}/car-types/search?brand=${values.brand}&fuel=${values.fuel}&numberOfSeats=${values.numberOfSeats}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const searchCarTypesQuery = await getResponse.json();
            setCartTypes(searchCarTypesQuery.content || []);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box>
            <PageHeader text={t('TEXT.CAR_TYPES')}/>
            <FilterCard>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 3}}>
                    <Box sx={{
                        marginTop: 1,
                        marginBottom: 5,
                        marginLeft: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4
                    }}>
                        <FormControl>
                            <TextField
                                id="brand"
                                placeholder='Példa Éva'
                                name='brand'
                                label={t('CAR_TYPES.BRAND')}
                                value={values.brand}
                                onChange={handleChange('brand')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{color: '#000000'}}/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ClearIcon
                                                sx={{color: '#000000', cursor: 'pointer'}}
                                                onClick={() => setValues({...values, brand: ''})}
                                            />
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    backgroundColor: `#ffffff`,
                                    borderRadius: '18px',
                                    color: `#000000`,
                                    textDecoration: 'none',
                                    height: 40,
                                    width: 250,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: "15px",
                                    "& fieldset": {border: 'none'},
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="fuel"
                                placeholder='Példa Éva'
                                name='fuel'
                                label={t('CAR_TYPES.FUEL')}
                                value={values.fuel}
                                onChange={handleChange('fuel')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{color: '#000000'}}/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ClearIcon
                                                sx={{color: '#000000', cursor: 'pointer'}}
                                                onClick={() => setValues({...values, fuel: ''})}
                                            />
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    backgroundColor: `#ffffff`,
                                    borderRadius: '18px',
                                    color: `#000000`,
                                    textDecoration: 'none',
                                    height: 40,
                                    width: 250,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: "15px",
                                    "& fieldset": {border: 'none'},
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="numberOfSeats"
                                placeholder='Példa Éva'
                                name='numberOfSeats'
                                label={t('CAR_TYPES.NUMBER_OF_SEATS')}
                                value={values.numberOfSeats}
                                onChange={handleChange('numberOfSeats')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{color: '#000000'}}/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ClearIcon
                                                sx={{color: '#000000', cursor: 'pointer'}}
                                                onClick={() => setValues({...values, numberOfSeats: ''})}
                                            />
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    backgroundColor: `#ffffff`,
                                    borderRadius: '18px',
                                    color: `#000000`,
                                    textDecoration: 'none',
                                    height: 40,
                                    width: 250,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: "15px",
                                    "& fieldset": {border: 'none'},
                                }}
                            />
                        </FormControl>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <SaveButton onClick={onReset} text={t('TEXT.CLEAR_FILTER')}/>
                            <SaveButton type='submit' text={t('TEXT.FILTER')}/>
                        </div>
                    </Box>
                    <Box sx={{display: 'inline', alignItems: 'center', paddingLeft: 20}}>
                        <SaveButton text={t('CAR_TYPES.ADD_NEW_CAR_TYPE')} onClick={openAddCarTypeDialog}/>
                    </Box>
                </Box>
            </FilterCard>

            <ContentCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Grid container rowSpacing={3} columnSpacing={-38} >
                        {carTypes
                            .map((item, index) => {
                                return (
                                    <Grid item xs={3} key={item.subType}>
                                        <CarTypeCard
                                            onClick={() => navigate(`/type-of-transportation/${id}/car-types/${item.id}`)}
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