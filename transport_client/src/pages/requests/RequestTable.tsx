import type { GridActionsColDef, GridColDef, GridSelectionModel, GridSortModel } from '@mui/x-data-grid';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import StyledDataGrid, {handleDataGridCellClick, sharedDataGridProps} from "../../components/dataTable/StyledDataGrid";
import {Pagination} from "../../components/inputField/hooks/usePagination";
import {Sort} from "../../components/inputField/hooks/useSort";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Box, Tooltip} from "@mui/material";
import {GridActionsCellItem, GridRowParams} from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import Popper, {PopperPlacementType} from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import NormalText from "../../components/text/NormalText";
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
    onHandleDelete?: (id: string) => void;
}

const RequestTable = ({
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
            headerName: `${t('REQUEST.ID')}`,
            width: 170,
        },
        {
            field: 'fullName',
            headerName: `${t('REQUEST.FULL_NAME')}`,
            width: 250,
        },
        {
            field: 'position',
            headerName: `${t('REQUEST.POSITION')}`,
            width: 250,
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
            data-testid='request-table'
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

export default RequestTable;
