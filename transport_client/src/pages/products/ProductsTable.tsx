import type { GridActionsColDef, GridColDef, GridSelectionModel, GridSortModel } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';
import StyledDataGrid, {handleDataGridCellClick, sharedDataGridProps} from "../../components/dataTable/StyledDataGrid";
import {Pagination} from "../../components/inputField/hooks/usePagination";
import {Sort} from "../../components/inputField/hooks/useSort";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Tooltip} from "@mui/material";
import {GridActionsCellItem, GridRowParams} from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";

interface Props {
    data?: string[];
    selectionModel?: GridSelectionModel;
    defaultPagination?: Pagination;
    defaultSort?: Sort | null;
    allowSelection?: boolean;
    allowNavigation?: boolean;
    showActions?: boolean;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    onSortChange: (pageSize: GridSortModel) => void;
    onSelectionChange?: (selection: GridSelectionModel) => void;
}

const ProductsTable = ({
   data,
   selectionModel,
   defaultPagination,
   defaultSort,
   allowSelection = false,
   allowNavigation = true,
   showActions = true,
   onPageChange,
   onPageSizeChange,
   onSortChange,
   onSelectionChange,
}: Props) => {
    const { t } = useTypeSafeTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const columns: (GridColDef | GridActionsColDef)[] = [
        {
            field: '_id',
            headerName: `${t('PRODUCTS.ID')}`,
            width: 170,
        },
        {
            field: 'name',
            headerName: `${t('PRODUCTS.PRODUCT_NAME')}`,
            width: 250,
        },
        {
            field: 'status',
            headerName: `${t('PRODUCTS.STATUS')}`,
            width: 250,
        },
    ];

    if (showActions) {
        columns.push({
            field: 'actions',
            headerName: t('TEXT.ACTIONS'),
            type: 'actions',
            width: 300,
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key={`${params.id}_open`}
                    icon={
                        <Tooltip title={t('TEXT.EDIT')}>
                            <EditIcon width="16px" height="16px" sx={{ color: "#ff0000"}}/>
                        </Tooltip>
                    }
                    label={t('TEXT.EDIT')}
                    data-testid='edit-button'
                />,
                <GridActionsCellItem
                    key={`${params.id}_open`}
                    icon={
                        <Tooltip title={t('TEXT.VIEW')}>
                            <ArrowRightIcon width="16px" height="16px" sx={{ color: "#ff0000"}}/>
                        </Tooltip>
                    }
                    label={t('TEXT.VIEW')}
                    data-testid='open-button'
                />,
            ],
        });
    }

    return (
        <StyledDataGrid
            {...sharedDataGridProps}
            pagination
            rows={data ?? []}
            columns={columns}
            getRowId={(row) => row._id}
            rowHeight={data?.length ? 60 : 120}
            rowCount={data?.length ?? 0}
            checkboxSelection={allowSelection}
            selectionModel={selectionModel ?? []}
            data-testid='products-table'
            onCellClick={(params, event) =>
                allowNavigation ? handleDataGridCellClick(params, event, navigate, location.search) : null
            }
            pageSize={data?.length ?? 10}
            onPageChange={(page) => onPageChange(page)}
            onPageSizeChange={(pageSize) => onPageSizeChange(pageSize)}
            onSortModelChange={(model) => onSortChange(model)}
            onSelectionModelChange={(selectionModel) => {
                if (onSelectionChange) {
                    onSelectionChange(selectionModel);
                }
            }}
            initialState={{
                sorting: {
                    sortModel: [{ field: defaultSort?.sortBy ?? 'name', sort: defaultSort?.sortDir ?? 'asc' }],
                },
                pagination: { page: defaultPagination?.page, pageSize: defaultPagination?.pageSize },
            }}
        />
    );
};

export default ProductsTable;
