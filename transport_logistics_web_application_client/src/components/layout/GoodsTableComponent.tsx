import {useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";

const GoodsTableComponent = () => {

    const columns = [
        { id: 'id', label: 'Azonosító', minWidth: 170 },
        { id: 'name', label: 'Név', minWidth: 100 },
        { id: 'piece', label: 'Darabszám', minWidth: 100 },
        {
            id: 'percentage',
            label: 'Százalék',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2) + ' %',
        },
        { id: 'status', label: 'Állapot', minWidth: 100 },
    ];

    const createData = (id, name, piece, percentage, status) => {
        return { id, name, piece, percentage, status };
    }

    const rows = [
        createData('12345678', 'Termék1', 1200/60, 5, 'Készlethiány'),
        createData('12345678', 'Termék1', 1200/60, 5, 'Készlethiány'),
        createData('12345678', 'Termék1', 1200/60, 5, 'Készlethiány'),
        createData('12345678', 'Termék1', 1200/60, 5, 'Készlethiány'),
        createData('12345678', 'Termék1', 1200/60, 5, 'Készlethiány'),
        createData('12345678', 'Termék1', 1200/60, 5, 'Készlethiány'),
        createData('12345678', 'Termék1', 1200/60, 5, 'Készlethiány'),
        createData('12345678', 'Termék1', 1200/60, 5, 'Készlethiány'),
        createData('12345678', 'Termék1', 1200/60, 5, 'Készlethiány'),
        createData('12345678', 'Termék1', 1200/60, 5, 'Készlethiány'),
        createData('12345678', 'Termék1', 1200/60, 5, 'Készlethiány'),
        createData('12345678', 'Termék1', 1200/60, 5, 'Készlethiány'),
        createData('12345678', 'Termék1', 1200/60, 5, 'Készlethiány'),
        createData('12345678', 'Termék1', 1200/60, 5, 'Készlethiány'),
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={'center'}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={'center'}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default GoodsTableComponent;