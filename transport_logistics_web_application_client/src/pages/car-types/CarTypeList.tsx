import PageHeader from "../../components/text/PageHeader.tsx";
import FilterCard from "../../components/layout/FilterCard.tsx";
import {Box, FormControl, Grid, Input, InputAdornment} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import CarTypeCard from "../../components/layout/CarTypeCard.tsx";
import {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {useLocation, useNavigate} from "react-router-dom";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import {useModal} from "@ebay/nice-modal-react";
import CarTypeAddDialog from "./CarTypeAddDialog.tsx";
import {useForm} from "react-hook-form";
import {carTypeEditFormSchema, CarTypeEditFormSchema} from "./schemas/car-type-edit-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";

const CarTypeList = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const addCarTypeDialog = useModal(CarTypeAddDialog);
    const [search, setSearch] = useState('');
    const [carTypes, setCartTypes] = useState([
        {
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5'
        },
        {
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5'
        },
        {
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5'
        },
        {
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5'
        },
        {
            brand: 'Fiat',
            type: 'Ducato',
            subType: 'MAXI 250 L3H2 2.3 MJet 3.5'
        },
    ]);

    const {
        setValue,
        formState: { isValid },
    } = useForm<CarTypeEditFormSchema>({
        defaultValues: {
            carTypes: '',
        },
        resolver: zodResolver(carTypeEditFormSchema()),
        mode: 'all',
    });


    const openAddCarTypeDialog = () => {
        addCarTypeDialog
            .show({
                title: t('TEXT.ADD_NEW_CAR_TYPE'),
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
                            placeholder={t('TEXT.SEARCH_BRAND')}
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
                            placeholder={t('TEXT.SEARCH_FUEL')}
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
                            placeholder={t('TEXT.SEARCH_OF_SEATS')}
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
                        <SaveButton text={t('TEXT.ADD_NEW_CAR_TYPE')} onClick={openAddCarTypeDialog} />
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
                                    <Grid item xs={4} key={item.subType}>
                                        <CarTypeCard brand={item.brand} type={item.type} subType={item.subType}/>
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