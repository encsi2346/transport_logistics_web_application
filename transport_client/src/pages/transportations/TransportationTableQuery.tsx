import type { GridSelectionModel } from '@mui/x-data-grid';
import {useEffect} from 'react';
import usePagination from "../../components/inputField/hooks/usePagination";
import useSort from "../../components/inputField/hooks/useSort";
import TransportationTable from "./TransportationTable";
import {useParams} from "react-router-dom";

interface Props {
    selectionModel?: GridSelectionModel;
    onSelectionChange?: (selectionModel: GridSelectionModel) => void;
    onDataChange?: () => void;
    allowSelection?: boolean;
    allowNavigation?: boolean;
    showActions?: boolean;
    enableQueryParams?: boolean;
    searchResults?: string[];
    onHandleDelete?: (id: string) => void;
}

const TransportationTableQuery = ({
    selectionModel = [],
    onSelectionChange,
    onDataChange,
    allowSelection = false,
    allowNavigation = true,
    showActions = true,
    enableQueryParams = true,
    searchResults,
    onHandleDelete,
}: Props) => {
    const { id } = useParams();
    const { pagination, handlePageChange, handlePageSizeChange } = usePagination(undefined, undefined, enableQueryParams);
    const { sort, sortParam, handleSortChange } = useSort({ sortBy: 'startDate', sortDir: 'asc' }, enableQueryParams);

    useEffect(() => {
        if (onDataChange) {
            onDataChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResults]);

    return (
        <TransportationTable
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
            onHandleDelete={onHandleDelete(id)}
        />
    );
};

export default TransportationTableQuery;
