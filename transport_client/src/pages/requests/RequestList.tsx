import {Box, FormControl, Input, InputAdornment} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useSelection from "../../components/inputField/hooks/useSelection";
import {useForm} from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import SaveButton from "../../components/button/SaveButton";
import {carTypeEditFormSchema, CarTypeEditFormSchema} from "../car-types/schemas/car-type-edit-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useModal} from "@ebay/nice-modal-react";
import RequestTableQuery from "./RequestTableQuery";
import NewRequestAddDialog from "./NewRequestAddDialog";

const RequestList = () => {
    const { id } = useParams();
    const { t } = useTypeSafeTranslation();
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

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

    const handleLoadRequests = async () => {
        const getResponse = await fetch(
            `http://localhost:3001/api/requests`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getRequestsData = await getResponse.json();
        const getStatus = getResponse.status;
        console.log('getRequestsData', getRequestsData);
        console.log('getUserStatus', getStatus);
        setRequests(getRequestsData);
    }

    useEffect(() => {
        handleLoadRequests();
    }, []);

    const deleteRequest = async (id: string) => {
        //TODO
        try {
            const deleteRequestResponse = await fetch(
                `http://localhost:3001/api/requests/${id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getRequestData = await deleteRequestResponse.json();
            const getStatus = deleteRequestResponse.status;
            console.log('getRequestData', getRequestData);
            console.log('getRequestStatus', getStatus);
            //setCartTypes(getCarTypesData);
            return getRequestData;
        } catch (error) {
            console.error(`Error deleting request with ID ${id}:`, error);
        }
    };

    return (
        <Box>
            <PageHeader text={t('REQUEST.PERSONAL_REQUESTS')}/>
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
                            placeholder={t('REQUEST.FULL_NAME')}
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
                            placeholder={t('REQUEST.POSITION')}
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
                        <SaveButton text={t('REQUEST.NEW_REQUESTS')} onClick={openAddNewRequestDialog} />
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
                        onHandleDelete={() => deleteRequest(id)}
                    />
                </Box>
            </ContentCard>
        </Box>
    );
};

export default RequestList;