import {Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import {sharedDataGridProps} from "../../components/datatable/StyledDataGrid";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useTypeSafeTranslation} from "../../components/inputfield/hooks/useTypeSafeTranslation";
import {GridActionsCellItem, GridActionsColDef, GridColDef, GridRowParams} from "@mui/x-data-grid";
import OrderDataGrid from "../../components/datatable/OrderDataGrid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from "@mui/icons-material/Clear";
import React, {useState} from "react";

interface Props {
    data?: any[];
    showActions?: boolean;
}

const OrderTabRoute = ({
    data,
    showActions = true,
}: Props) => {
    const { id } = useParams();
    const { t } = useTypeSafeTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        routeId: '',
        status: 'waiting',
    });
    const [rows, setRows] = useState(data || []);

    const handleRowStateChange = (rowId: string | number, newStatus: string) => {
        const updatedRows = rows.map((row) =>
            row.id === rowId ? { ...row, status: newStatus } : row
        );
        setRows(updatedRows);
    };

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
    };

    const columns: (GridColDef | GridActionsColDef)[] = [
        {
            field: 'id',
            headerName: '',
            width: 170,
        },
        {
            field: 'plannedArriving',
            headerName: 'Tervezett érkezés',
            width: 150,
        },
        {
            field: 'actualArriving',
            headerName: 'Valós érkezés',
            width: 150,
        },
        {
            field: 'address',
            headerName: 'Cím',
            width: 250,
        },
        {
            field: 'task',
            headerName: 'Feladat',
            width: 250,
        },
        {
            field: 'km',
            headerName: 'Levezetetett km',
            width: 100,
        },
        {
            field: 'time',
            headerName: 'Levezetett óra',
            width: 100,
        },
        {
            field: 'plannedDeparture',
            headerName: 'Tervezett indulás',
            width: 150,
        },
        {
            field: 'actualDeparture',
            headerName: 'Valós indulás',
            width: 150,
        },
        {
            field: 'status',
            headerName: 'Állapot',
            width: 200,
        },
    ];

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let submitData = data as any;
        console.log('submitData', submitData);
    };

    const options = [
        {
            value: "missing",
            label: "Kihagyva",
            style: {
                fontWeight: 'normal',
                fontSize: '18px',
                color: '#ffffff',
                backgroundColor: '#ff0000',
                borderRadius: 45,
                width: 120,
                textAlign: 'center',
                paddingTop: 1,
                paddingBottom: 1,
            },
        },
        {
            value: "uploaded",
            label: "Teljesítve",
            style: {
                fontWeight: 'normal',
                fontSize: '18px',
                color: '#ffffff',
                backgroundColor: '#23ef00',
                borderRadius: 45,
                width: 120,
                textAlign: 'center',
                paddingTop: 1,
                paddingBottom: 1,
            },
        },
        {
            value: "in_generation",
            label: "Folyamatban",
            style: {
                fontWeight: 'normal',
                fontSize: '18px',
                color: '#ffffff',
                backgroundColor: '#00d7e4',
                borderRadius: 45,
                width: 120,
                textAlign: 'center',
                paddingTop: 1,
                paddingBottom: 1,
            },
        },
        {
            value: "waiting",
            label: "Várakozás",
            style: {
                fontWeight: 'normal',
                fontSize: '18px',
                color: '#ffffff',
                backgroundColor: '#A3A3A3',
                borderRadius: 45,
                width: 120,
                textAlign: 'center',
                paddingTop: 1,
                paddingBottom: 1,
            },
        },
    ];

//TODO: selector
    if (showActions) {
        columns.push({
            field: 'actions',
            headerName: t('TEXT.ACTIONS'),
            type: 'actions',
            width: 200,
            renderCell: (params: GridRowParams) => {
                return (
                    <form
                        autoComplete='off'
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel>{t('Állapot')}</InputLabel>
                            <Select
                                label={null}
                                id="status"
                                data-testid='status-input'
                                value={values.status}
                                onChange={handleChange('status')}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: 45,
                                    color: '#000000',
                                    height: 40,
                                    width: 150,
                                    fontSize: '18px',
                                    padding: 0,
                                    paddingTop: 1,
                                    paddingBottom: 1,
                                    fontWeight: 'normal',
                                    '&:hover': {
                                        backgroundColor: '#ececec',
                                    },
                                    '& fieldset': { border: 'none' },
                                    '& .MuiSelect-icon': { display: 'none' },
                                }}
                                renderValue={(value) => {
                                    const selectedOption = options.find(option => option.value === value);
                                    return selectedOption ? (
                                        <Box sx={selectedOption.style}>{selectedOption.label}</Box>
                                    ) : null;
                                }}
                            >
                                {options.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                        sx={{
                                            padding: 0,
                                            marginBottom: 1,
                                            border: 'none',
                                            height: 40,
                                            width: 120,
                                            fontSize: '15px',
                                            backgroundColor: option.style.backgroundColor,
                                            color: option.style.color,
                                            borderRadius: 45,
                                            paddingTop: 1,
                                            paddingBottom: 1,
                                            fontWeight: 'normal',
                                            '&:hover': {
                                                backgroundColor: `${option.style.backgroundColor}b3`,
                                                padding: 0,
                                                width: 120,
                                                textAlign: 'center',
                                                paddingTop: 1,
                                                paddingBottom: 1,
                                                fontWeight: 'normal',
                                                fontSize: '18px',
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: `${option.style.backgroundColor}b3`,
                                            },
                                        }}
                                    >
                                        <Box sx={option.style}>{option.label}</Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </form>
                );
            },
        });
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexGrow: 1 }}>
            <OrderDataGrid
                {...sharedDataGridProps}
                pagination
                rows={data ?? []}
                columns={columns}
                rowHeight={data?.length ? 60 : 120}
                rowCount={data?.length ?? 0}
                data-testid='user-table'
                pageSize={data?.length ?? 10}
                sx={{ height: 600 }}
            />
        </Box>
    );
};

export default OrderTabRoute;