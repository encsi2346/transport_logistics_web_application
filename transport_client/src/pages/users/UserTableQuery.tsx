import type { GridSelectionModel } from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import usePagination from "../../components/inputField/hooks/usePagination";
import useSort from "../../components/inputField/hooks/useSort";
import UserTable from "./UserTable";
import {Box, Grid} from "@mui/material";
import CarTypeCard from "@/components/layout/CarTypeCard";
import ContentCard from "@/components/layout/ContentCard";
import UserCard from "@/components/layout/UserCard";
import {useTypeSafeTranslation} from "@/components/inputfield/hooks/useTypeSafeTranslation";
import {useLocation, useNavigate} from "react-router-dom";

interface Props {
    selectionModel?: GridSelectionModel;
    onSelectionChange?: (selectionModel: GridSelectionModel) => void;
    onDataChange?: () => void;
    allowSelection?: boolean;
    allowNavigation?: boolean;
    showActions?: boolean;
    enableQueryParams?: boolean;
    searchResults?: string[];
}

const UserTableQuery = ({
    selectionModel = [],
    onSelectionChange,
    onDataChange,
    allowSelection = false,
    allowNavigation = true,
    showActions = true,
    enableQueryParams = true,
    searchResults,
}: Props) => {
    const { t } = useTypeSafeTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { pagination, handlePageChange, handlePageSizeChange } = usePagination(undefined, undefined, enableQueryParams);
    const { sort, sortParam, handleSortChange } = useSort({ sortBy: 'fullName', sortDir: 'asc' }, enableQueryParams);
    const [search, setSearch] = useState('');
    const [userList, setUserList] = useState([
        {
            id: 1,
            fullName: 'Példa Károly',
            position: 'Sofőr',
            phoneNumber: '+36301234567',
            image: ''
        },
        {
            id: 2,
            fullName: 'Példa Károly',
            position: 'Sofőr',
            phoneNumber: '+36301234567',
            image: ''
        },
        {
            id: 3,
            fullName: 'Példa Károly',
            position: 'Sofőr',
            phoneNumber: '+36301234567',
            image: ''
        },
        {
            id: 4,
            fullName: 'Példa Károly',
            position: 'Sofőr',
            phoneNumber: '+36301234567',
            image: ''
        },
        {
            id: 5,
            fullName: 'Példa Károly',
            position: 'Sofőr',
            phoneNumber: '+36301234567',
            image: ''
        },
    ]);


    useEffect(() => {
        if (onDataChange) {
            onDataChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResults]);

    return (
        <>
        {/*<UserTable
                allowSelection={allowSelection}
                allowNavigation={allowNavigation}
                showActions={showActions}
                data={searchResults}
                selectionModel={selectionModel}
                defaultPagination={pagination}
                defaultSort={sort}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                onSortChange={handleSortChange}
                onSelectionChange={onSelectionChange}
            />*/}

            <ContentCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Grid container rowSpacing={3} columnSpacing={-38} >
                        {/* //TODO: lapozást megvalósítani vagy infinitscrollt */}
                        {searchResults
                            ?.filter((item) => {
                                return search.toLowerCase() === ''
                                    ? item
                                    : item.fullName.toLowerCase().includes(search);
                            })
                            .map((item, index) => {
                                return (
                                    <Grid item xs={4} key={item._id}>
                                        <UserCard
                                            onClick={() => navigate(`/users/${item._id}`)}
                                            id={item._id}
                                            fullName={item.email}
                                            position={item.position}
                                            phoneNumber={item.phoneNumber}
                                            image={item.image}
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                </Box>
            </ContentCard>
        </>

    );
};

export default UserTableQuery;
