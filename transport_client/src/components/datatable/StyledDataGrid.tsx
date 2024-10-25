import { styled } from '@mui/material/styles';
import type { GridCellParams, GridFeatureMode, MuiEvent } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import type { NavigateFunction } from 'react-router-dom';
import {useSelector} from "react-redux";
import CustomPagination from "@/components/datatable/CustomPagination";

const StyledDataGrid = styled(DataGrid)(() => ({
    border: 0,

    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor:  useSelector((state) => state.mode) === 'light' ? '#DD1C13' : "#a40500" ,
        border: 'none',
        borderRadius: '25px',
        paddingLeft: 20,
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        textOverflow: 'clip',
        whiteSpace: 'break-spaces',
        lineHeight: 1.2,
        color: useSelector((state) => state.mode) === 'light' ? '#ffffff' : 'rgb(255,255,255)',
        fontWeight: 'regular',
        fontSize: 15,
        textTransform: 'uppercase',
    },
    '& .MuiDataGrid-columnHeader': {
        boxShadow: '-13px 0px 0px -12px rgba(0, 0, 0, 0.06)',
        textAlign: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    '& .MuiDataGrid-cell': {
        border: 'none',
        padding: '0 16px',
    },
    '& .MuiDataGrid-cell.vertical-top': {
        alignItems: 'flex-start',
        paddingTop: '10px',
    },
    '& .MuiDataGrid-cell.vertical-padding': {
        alignItems: 'flex-start',
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    '& .MuiDataGrid-cell.no-padding': {
        paddingLeft: 0,
        paddingRight: 0,
    },
    '& .MuiDataGrid-cell.vertical-padding-center': {
        paddingTop: '15px',
        paddingBottom: '15px',
    },
    "& .MuiDataGrid-row": {
        backgroundColor: useSelector((state) => state.mode) === 'light' ? '#ffffff' : "#c5c5c5",
        borderRadius: '25px',
        width: '100%',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
        marginTop:10,
        display: 'flex',
        alignItems: 'center',
        color: '#000000',
        fontSize: 15,
        cursor: 'pointer',
    },
    "& .MuiDataGrid-row:hover": {
        backgroundColor: useSelector((state) => state.mode) === 'light' ? '#b7b7b7' : "#a4a4a4",
        borderRadius: '25px',
    },
    '& .MuiDataGrid-cell:focus, ': {
        outline: 'none',
    },
    '& .MuiDataGrid-cell:focus-within': {
        outline: 'none',
    },
    '& .MuiDataGrid-columnHeaderTitleContainer ': {
        outline: 'none',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0,
    },
})) as typeof DataGrid;

export default StyledDataGrid;

export const sharedDataGridProps = {
    autoHeight: true,
    autoWidth: true,
    height: '100%',
    width: '100%',
    checkboxSelection: true,
    disableSelectionOnClick: true,
    disableColumnMenu: true,
    rowsPerPageOptions: [10, 25, 50, 75, 100],
    sortingMode: 'server' as GridFeatureMode,
    paginationMode: 'server' as GridFeatureMode,
    components: {
        Pagination: CustomPagination,
    },
};

export const handleDataGridCellClick = (
    params: GridCellParams,
    event: MuiEvent<React.MouseEvent>,
    navigate: NavigateFunction,
    queryParams?: any
) => {
    if (params.field === '__check__' || params.field === 'actions') {
        return;
    }
    event.defaultMuiPrevented = true;
    navigate(String(params.row.id), { state: { queryParams } });
};
