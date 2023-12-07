import {Box, FormControl, Input, InputAdornment, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader.tsx";
import FilterCard from "../../components/layout/FilterCard.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import useSelection from "../../components/inputField/hooks/useSelection.tsx";
import {useForm} from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import SaveButton from "../../components/button/SaveButton.tsx";
import {carTypeEditFormSchema, CarTypeEditFormSchema} from "../car-type/schemas/car-type-edit-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useModal} from "@ebay/nice-modal-react";
import RequestTableQuery from "./RequestTableQuery.tsx";
import NewRequestAddDialog from "./NewRequestAddDialog.tsx";

const RequestList = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const addNewRequestDialog = useModal(NewRequestAddDialog);
    const [search, setSearch] = useState('');
    const [requests, setRequests] = useState([
        {
            id: '1111',
            fullName: 'Példa Elek',
            position: 'Sofőr',
        },
        {
            id: '1111',
            fullName: 'Példa Elek',
            position: 'Sofőr',
        },
        {
            id: '1111',
            fullName: 'Példa Elek',
            position: 'Sofőr',
        },
        {
            id: '1111',
            fullName: 'Példa Elek',
            position: 'Sofőr',
        },
        {
            id: '1111',
            fullName: 'Példa Elek',
            position: 'Sofőr',
        },
    ]);
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    const {
        control,
        setValue,
        reset,
        handleSubmit,
        formState: { isValid },
    } = useForm<CarTypeEditFormSchema>({
        defaultValues: {
            carTypeName: '',
            carFunctionalDesign: '',
            performance: '',
            ownWeight: '',
            numberOfSeats: '',
            fuel: '',
            usefulWeight: '',
        },
        resolver: zodResolver(carTypeEditFormSchema()),
        mode: 'all',
    });

    const openAddNewRequestDialog = () => {
        addNewRequestDialog
            .show({
                title: t('TEXT.ADD_NEW_REQUEST'),
                acceptText: t('TEXT.CREATE'),
            })
            .then((value) => {
                setValue('carTypes', value as string[]);
            })
            .catch(() => null);
    };

    const onSubmit = handleSubmit((data) => {});

    const onReset = () => {
        reset();
        onSubmit();
    };

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };


    return (
        <Box>
            <PageHeader text={t('TEXT.PERSONAL_REQUESTS')}/>
            <FilterCard>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'space-between'}}>
                    <FormControl sx={{
                        marginTop: 1,
                        marginBottom: 5,
                        marginLeft: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2
                    }}>
                        <Input
                            id="name"
                            placeholder="Search name"
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
                            id="position"
                            placeholder="Search position"
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
                        <SaveButton text={t('TEXT.ADD_NEW_REQUEST')} onClick={openAddNewRequestDialog} />
                    </Box>
                </Box>
            </FilterCard>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10, height: 900}}>
                    <RequestTableQuery
                        searchResults={
                            requests
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.fullName.toLowerCase().includes(search);
                                })
                        }
                        selectionModel={selectionModel}
                        onSelectionChange={handleSelectionChange}
                        onDataChange={handleDataChange}
                    />
                </Box>
            </ContentCard>
        </Box>
    );
};

export default RequestList;