import type { GridSelectionModel } from '@mui/x-data-grid';
import {useEffect} from 'react';
import usePagination, {Pagination} from "../../components/inputField/hooks/usePagination";
import useSort from "../../components/inputField/hooks/useSort";
import ProductsTable from "./ProductsTable";

interface Props {
    selectionModel?: GridSelectionModel;
    onSelectionChange?: (selectionModel: GridSelectionModel) => void;
    defaultPagination?: Pagination;
    onDataChange?: () => void;
    allowSelection?: boolean;
    allowNavigation?: boolean;
    showActions?: boolean;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    enableQueryParams?: boolean;
    searchResults?: string[];
}

const ProductsTableQuery = ({
    selectionModel = [],
    onSelectionChange,
    onDataChange,
    defaultPagination,
    allowSelection = false,
    allowNavigation = true,
    showActions = true,
    onPageChange,
    onPageSizeChange,
    enableQueryParams = true,
    searchResults,
}: Props) => {
    //const { pagination, handlePageChange, handlePageSizeChange } = usePagination(undefined, undefined, enableQueryParams);
    const { sort, sortParam, handleSortChange } = useSort({ sortBy: 'productName', sortDir: 'asc' }, enableQueryParams);

    useEffect(() => {
        if (onDataChange) {
            onDataChange();
        }
        console.log('pagination-query', defaultPagination);
        console.log('searchResults', searchResults);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResults, defaultPagination]);

    return (
        <ProductsTable
            allowSelection={allowSelection}
            allowNavigation={allowNavigation}
            showActions={showActions}
            data={searchResults}
            selectionModel={selectionModel}
            defaultPagination={defaultPagination}
            defaultSort={sort}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            onSortChange={handleSortChange}
            onSelectionChange={onSelectionChange}
        />
    );
};

export default ProductsTableQuery;
