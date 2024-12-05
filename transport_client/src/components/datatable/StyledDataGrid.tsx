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
    '& .MuiDataGrid-columnSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeaders': {
        //backgroundColor:  useSelector((state) => state.mode) === 'light' ? '#DD1C13' : "#a40500" ,
        border: 'none',
        paddingLeft: 20,
        display: 'block',
        justifyContent: 'center',
        textAlign: 'center',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        textOverflow: 'clip',
        whiteSpace: 'break-spaces',
        lineHeight: 1.2,
        color: '#000000', //color: useSelector((state) => state.mode) === 'light' ? '#ffffff' : 'rgb(255,255,255)',
        fontWeight: '500',
        fontSize: 18,
        textTransform: 'camelCase',
    },
    '& .MuiDataGrid-columnHeader': {
        boxShadow: '-13px 0px 0px -12px rgba(0, 0, 0, 0.06)',
        textAlign: 'center',
        justifyContent: 'center',
        display: 'block',
    },
    '& .MuiDataGrid-columnHeaderTitleContainer': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    '& .MuiDataGrid-columnHeaderTitleContainer .MuiIconButton-root': {
        fontWeight: '900',
    },

    '& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-sortIcon': {
        fontWeight: '900',
    },
    '& .MuiDataGrid-cell': {
        border: 'none',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    "& .MuiDataGrid-row": {
        backgroundColor: useSelector((state) => state.mode) === 'light' ? '#ffffff' : "#c5c5c5",
        borderRadius: '8px',
        width: '1500px',
        paddingTop: 35,
        paddingBottom: 35,
        paddingLeft: 20,
        marginTop: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000000',
        fontSize: 17,
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
    },
    "& .MuiDataGrid-row:hover": {
        backgroundColor: "#d73f3b", //'linear-gradient(to bottom, #d73f3b, #a40500)',
        borderRadius: '8px',
        paddingTop: 40,
        paddingBottom: 40,
        transform: 'translateY(-10px)',
        color: '#ffffff',
        cursor: 'pointer',
    },
    '& .MuiDataGrid-cell:focus, ': {
        outline: 'none',
    },
    '& .MuiDataGrid-cell:focus-within': {
        outline: 'none',
    },
    '.MuiDataGrid-root': {
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        display: 'block',
    },
    '.MuiDataGrid-virtualScroller': {
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    '.MuiDataGrid-viewport': {
        display: 'block',
        justifyContent: 'center',
        width: '100%',
    },
    '.MuiDataGrid-window': {
        display: 'block',
        justifyContent: 'center',
        width: '100%',
    },
})) as typeof DataGrid;

export default StyledDataGrid;

export const sharedDataGridProps = {
    autoHeight: true,
    autoWidth: true,
    height: '100%',
    width: '100%',
    checkboxSelection: false,
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
    event: MuiEvent<MouseEvent>,
    navigate: NavigateFunction,
    queryParams?: any
) => {
    if (params.field === '__check__' || params.field === 'actions') {
        return;
    }
    event.defaultMuiPrevented = true;
    navigate(String(params.row.id), { state: { queryParams } });
};
