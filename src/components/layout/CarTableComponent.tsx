import {useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";

const CarTableComponent = () => {

    const columns = [
        { id: 'licensePlate', label: 'Rendszám', minWidth: 170 },
        { id: 'type', label: 'Típus', minWidth: 100 },
        {
            id: 'usefulWeight',
            label: 'Hasznos teher',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2) + ' kg',
        },
    ];

    const createData = (licensePlate, type, usefulWeight) => {
        return { licensePlate, type, usefulWeight };
    }

    const rows = [
        createData('AAA-000', 'Fiat Ducato Maxi 250 L3H2 2.3 MJet 3.5', 900),
        createData('AAA-000', 'Fiat Ducato Maxi 250 L3H2 2.3 MJet 3.5', 900),
        createData('AAA-000', 'Fiat Ducato Maxi 250 L3H2 2.3 MJet 3.5', 900),
        createData('AAA-000', 'Fiat Ducato Maxi 250 L3H2 2.3 MJet 3.5', 900),
        createData('AAA-000', 'Fiat Ducato Maxi 250 L3H2 2.3 MJet 3.5', 900),
        createData('AAA-000', 'Fiat Ducato Maxi 250 L3H2 2.3 MJet 3.5', 900),
        createData('AAA-000', 'Fiat Ducato Maxi 250 L3H2 2.3 MJet 3.5', 900),
        createData('AAA-000', 'Fiat Ducato Maxi 250 L3H2 2.3 MJet 3.5', 900),
        createData('AAA-000', 'Fiat Ducato Maxi 250 L3H2 2.3 MJet 3.5', 900),
        createData('AAA-000', 'Fiat Ducato Maxi 250 L3H2 2.3 MJet 3.5', 900),
        createData('AAA-000', 'Fiat Ducato Maxi 250 L3H2 2.3 MJet 3.5', 900),
        createData('AAA-000', 'Fiat Ducato Maxi 250 L3H2 2.3 MJet 3.5', 900),

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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.licensePlate}>
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

export default CarTableComponent;