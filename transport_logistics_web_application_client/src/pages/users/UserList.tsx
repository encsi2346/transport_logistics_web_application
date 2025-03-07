import {Box, FormControl, Input, InputAdornment} from "@mui/material";
import PageHeader from "../../components/text/PageHeader.tsx";
import FilterCard from "../../components/layout/FilterCard.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import UserTableQuery from "./UserTableQuery.tsx";
import useSelection from "../../components/inputField/hooks/useSelection.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";

const UserList = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([
        {
            id: '1111',
            fullName: 'Példa Elek',
            position: 'Sofőr',
            drivingLicenceCategories: 'A1, A2, B, C',
            validityDateOfDrivingLicence: '2025.12.03'
        },
        {
            id: '1112',
            fullName: 'Példa Teodor',
            position: 'Sofőr',
            drivingLicenceCategories: 'B, C',
            validityDateOfDrivingLicence: '2025.12.03'
        },
        {
            id: '1113',
            fullName: 'Példa Kálmán',
            position: 'Sofőr',
            drivingLicenceCategories: 'B, C, D',
            validityDateOfDrivingLicence: '2024.08.02'
        },
        {
            id: '1114',
            fullName: 'Példa Tivadar',
            position: 'Sofőr',
            drivingLicenceCategories: 'B, C',
            validityDateOfDrivingLicence: '2025.11.21'
        },
        {
            id: '1115',
            fullName: 'Példa Zoltán',
            position: 'Sofőr',
            drivingLicenceCategories: 'B',
            validityDateOfDrivingLicence: '2025.12.03'
        },
    ]);
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

    return (
        <Box>
            <PageHeader text={t('TEXT.USERS')}/>
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
                        <SaveButton text={t('TEXT.NEW_USER')} onClick={() => navigate(`/users/new`)} />
                    </Box>
                </Box>
            </FilterCard>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10, height: 900}}>
                    <UserTableQuery
                        searchResults={
                            users
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

export default UserList;