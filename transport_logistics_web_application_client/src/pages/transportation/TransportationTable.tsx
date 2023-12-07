import type { GridActionsColDef, GridColDef, GridSelectionModel, GridSortModel } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import StyledDataGrid, {handleDataGridCellClick, sharedDataGridProps} from "../../components/dataTable/StyledDataGrid.tsx";
import {Pagination} from "../../components/inputField/hooks/usePagination.tsx";
import {Sort} from "../../components/inputField/hooks/useSort.tsx";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Tooltip} from "@mui/material";
import {GridActionsCellItem, GridRowParams} from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';

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

const TransportationTable = ({
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
            field: 'id',
            headerName: `${t('TEXT.ID')}`,
            width: 170,
        },
        {
            field: 'driverName',
            headerName: `${t('TEXT.DRIVER_NAME')}`,
            width: 200,
        },
        {
            field: 'startPlace',
            headerName: `${t('TEXT.START_PLACE')}`,
            width: 200,
        },
        {
            field: 'endPlace',
            headerName: `${t('TEXT.END_PLACE')}`,
            width: 200,
        },
        {
            field: 'startDate',
            headerName: `${t('TEXT.START_DATE')}`,
            width: 200,
        },
        {
            field: 'endDate',
            headerName: `${t('TEXT.END_DATE')}`,
            width: 200,
        },
    ];

    if (showActions) {
        columns.push({
            field: 'actions',
            headerName: t('TEXT.ACTIONS'),
            type: 'actions',
            width: 200,
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key={`${params.id}_open`}
                    icon={
                        <Tooltip title={t('TEXT.EDIT')}>
                            <EditIcon width="16px" height="16px" sx={{ color: "#ff0000"}}/>
                        </Tooltip>
                    }
                    label={t('TEXT.EDIT')}
                    //onClick={}
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
                    //onClick={}
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
            rowHeight={data?.length ? 60 : 120}
            rowCount={data?.length ?? 0}
            checkboxSelection={allowSelection}
            selectionModel={selectionModel ?? []}
            data-testid='transportation-table'
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
                    sortModel: [{ field: defaultSort?.sortBy ?? 'startDate', sort: defaultSort?.sortDir ?? 'asc' }],
                },
                pagination: { page: defaultPagination?.page, pageSize: defaultPagination?.pageSize },
            }}
        />
    );
};

export default TransportationTable;
