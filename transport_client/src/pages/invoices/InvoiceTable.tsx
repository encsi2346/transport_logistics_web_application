import type { GridActionsColDef, GridColDef, GridSelectionModel, GridSortModel } from '@mui/x-data-grid';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import StyledDataGrid, {handleDataGridCellClick, sharedDataGridProps} from "../../components/dataTable/StyledDataGrid";
import {Pagination} from "../../components/inputField/hooks/usePagination";
import {Sort} from "../../components/inputField/hooks/useSort";
import {Box, Tooltip} from "@mui/material";
import {GridActionsCellItem, GridRowParams} from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import Popper, {PopperPlacementType} from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import NormalText from "../../components/text/NormalText";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useState} from "react";

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
const InvoiceTable = ({
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
                          onHandleDelete,
}: Props) => {
    const { id } = useParams();
    const { t } = useTypeSafeTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<PopperPlacementType>();

    const handleClick =
        (newPlacement: PopperPlacementType) =>
            (event: MouseEvent<HTMLButtonElement>) => {
                setAnchorEl(event.currentTarget);
                setOpen((prev) => placement !== newPlacement || !prev);
                setPlacement(newPlacement);
            };


    const columns: (GridColDef | GridActionsColDef)[] = [
        {
            field: 'id',
            headerName: `${t('INVOICES.ID')}`,
            width: 170,
        },
        {
            field: 'orderId',
            headerName: `${t('INVOICES.ORDER_ID')}`,
            width: 250,
        },
        {
            field: 'companyName',
            headerName: `${t('INVOICES.COMPANY_NAME')}`,
            width: 250,
        },
        {
            field: 'dateOfCreation',
            headerName: `${t('INVOICES.DATE_OF_CREATION')}`,
            width: 200,
        },
        {
            field: 'paymentDeadline',
            headerName: `${t('INVOICES.PAYMENT_DEADLINE')}`,
            width: 200,
        },
        {
            field: 'summary',
            headerName: `${t('INVOICES.SUMMARY')}`,
            width: 200,
        },
        {
            field: 'status',
            headerName: `${t('INVOICES.STATUS')}`,
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
                <Box>
                    <Popper
                        sx={{
                            zIndex: 1200,
                            borderRadius: '8px',
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        placement={placement}
                        transition
                    >
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                    <Box
                                        data-testid="edit-button"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '10px',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '4px',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                            },
                                        }}>
                                        <EditIcon width="18px" height="18px" sx={{ color: "#ff0000" }} />
                                        <NormalText text={t('TEXT.EDIT')} />
                                    </Box>
                                    <Box
                                        onClick={() => onHandleDelete(id)}
                                        data-testid="remove-button"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '10px',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '4px',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                            },
                                        }}
                                    >
                                        <DeleteIcon width="18px" height="18px" sx={{ color: "#ff0000" }} />
                                        <NormalText text={t('TEXT.REMOVE')} />
                                    </Box>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                    <GridActionsCellItem
                        key={`${id}_settings`}
                        icon={
                            <Tooltip title={t('TEXT.SETTINGS')}>
                                <MoreVertIcon width="50px" height="50px" sx={{ color: "#ff0000" }} />
                            </Tooltip>
                        }
                        label={t('TEXT.SETTINGS')}
                        data-testid="settings-button"
                        onClick={handleClick('right-end')}
                    />
                </Box>
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
    );
};

export default InvoiceTable;
