import type {GridActionsColDef, GridColDef, GridSelectionModel, GridSortModel} from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';
import {useTypeSafeTranslation} from "../../../components/inputfield/hooks/useTypeSafeTranslation";
import StyledDataGrid, {handleDataGridCellClick, sharedDataGridProps} from "../../../components/datatable/StyledDataGrid";
import {Pagination} from "../../../components/inputfield/hooks/usePagination";
import {Sort} from "../../../components/inputfield/hooks/useSort";
import {Box} from "@mui/material";
import CancelButton from "@/components/button/CancelButton";
import SaveButton from "@/components/button/SaveButton";

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

const CarTabService = ({
   data,
   selectionModel,
   defaultPagination,
   defaultSort,
   allowSelection = false,
   allowNavigation = true,
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
            headerName: 'Azonosító',
            width: 170,
        },
        {
            field: 'serviceDate',
            headerName: 'Szervíz időpontja',
            width: 250,
        },
        {
            field: 'serviceName',
            headerName: 'Szervíz neve',
            width: 250,
        },
        {
            field: 'subject',
            headerName: 'Tárgy',
            width: 150,
        },
        {
            field: 'driverName',
            headerName: 'Szállító kolléga',
            width: 200,
        },
        {
            field: 'dateOfRecording',
            headerName: 'Rögzítés dátuma',
            width: 200,
        },
        {
            field: 'price',
            headerName: 'Ár',
            width: 200,
        },
    ];

    return (
        <>
            <StyledDataGrid
                {...sharedDataGridProps}
                pagination
                rows={data ?? []}
                columns={columns}
                rowHeight={data?.length ? 60 : 120}
                rowCount={data?.length ?? 0}
                checkboxSelection={allowSelection}
                selectionModel={selectionModel ?? []}
                data-testid='user-table'
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
                        sortModel: [{ field: defaultSort?.sortBy ?? 'fullName', sort: defaultSort?.sortDir ?? 'asc' }],
                    },
                    pagination: { page: defaultPagination?.page, pageSize: defaultPagination?.pageSize },
                }}
            />

            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 10}}>
                <CancelButton text={t('TEXT.CANCEL')} onClick={() => navigate(-1)}/>
                <SaveButton text={t('TEXT.SAVE')} onClick={() => console.log('save')} />
            </Box>
        </>
    );
};

export default CarTabService;