import React, { useContext, useEffect, useState } from 'react';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, useMediaQuery } from '@mui/material';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { GlobalContext } from '../../services/global.context';
import useFetch from '../../services/hooks/useFetch';
import EditarCartilla from './EditarCartilla';
import EliminarCartilla from './EliminarCartilla';
import { useNavigate } from 'react-router-dom';




const TablaCartilla = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');
    const [search, setSearch] = useState('');
    const { state } = useContext(GlobalContext);
    const { get } = useFetch()

    useEffect(() => {
        get('Aula', 'GET_AULAS', {})
        get('Materia', 'GET_MATERIAS', {})
        get('Cartilla', 'GET_CARTILLAS', {
            filter: {
                cartilla_aula: {
                    _eq: state.alumno?.alumno_aula.aula_id
                }
            },
            sort: ['sort','-date_created']
        })
    }, [])

    const columns = [
        { id: 'cartilla_titulo', label: 'Título', minWidth: 170 },
        { id: 'cartilla_descripcion', label: 'Descripción', minWidth: 170 },
        {
            id: 'cartilla_materia',
            label: 'Materia',
            minWidth: 170,
            align: 'right',
        },
        // {
        //     id: 'cartilla_aula',
        //     label: 'Aula',
        //     minWidth: 170,
        //     align: 'right',
        // },
        {
            id: 'date_created',
            label: 'Fecha',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'acciones',
            label: 'Acciones',
            minWidth: 170,
            align: 'right',
        },

    ]

    const [rows, setRows] = useState([])


    useEffect(() => {
        // Actualizar las filas cada vez que hay cambios en alumnos o aulas
        setRows(
            state.cartillas?.map((cartilla) => {
                // const aula = state.aulas.find(aula => aula.aula_id === cartilla.cartilla_aula);
                const materia = state.materias.find(materia => materia.materia_id === cartilla.cartilla_materia);
                // Obtener día, mes y año
                const fecha = new Date(cartilla.date_created)
                const dia = fecha.getDate()
                const mes = fecha.getMonth() + 1 // Los meses son indexados desde 0
                const año = fecha.getFullYear()

                // Formatear la fecha en "dd-mm-yyyy"
                const fechaFormateada = (dia < 10 ? '0' : '') + dia + '-' + (mes < 10 ? '0' : '') + mes + '-' + año
                return {
                    id: cartilla.cartilla_id,
                    cartilla_titulo: cartilla.cartilla_titulo,
                    cartilla_descripcion: cartilla.cartilla_descripcion,
                    cartilla_aula_id: cartilla.cartilla_aula.aula_id,
                    cartilla_materia_id: cartilla.cartilla_materia.materia_id,
                    cartilla_file: cartilla.cartilla_file,
                    // cartilla_aula: aula?.aula_nombre,
                    date_created: fechaFormateada,
                    cartilla_materia: materia?.materia_nombre,

                };
            })
        );
    }, [state.cartillas]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSort = (columnId) => {
        const isAsc = orderBy === columnId && order === 'asc';
        setOrderBy(columnId);
        setOrder(isAsc ? 'desc' : 'asc');
    };

    const sortedRows = () => {
        // Variable para almacenar las filas filtradas
        let filteredRows = rows

        // Si hay un término de búsqueda, filtrar las filas
        if (search) {
            filteredRows = rows.filter((row) =>
                // Comprobar si algún valor en alguna de las columnas coincide con el término de búsqueda
                columns.some((column) =>
                    String(row[column.id]).toLowerCase().includes(search.toLowerCase())
                )
            )
        }

        // Si hay una columna por la cual ordenar y una dirección de ordenamiento,
        // ordenar las filas, de lo contrario, devolver las filas filtradas
        if (orderBy && order) {
            return filteredRows.slice().sort((a, b) => {
                const itemA = a[orderBy]
                const itemB = b[orderBy]

                // Comparar los valores y determinar la dirección de ordenamiento
                if (order === 'asc') {
                    return itemA < itemB ? -1 : 1
                } else {
                    return itemB < itemA ? -1 : 1
                }
            })
        }

        // Si no hay una columna por la cual ordenar, devolver las filas filtradas
        return filteredRows
    }

    const searcher = (e) => {
        setSearch(e.target.value);
        setPage(0)
    };

    const isDesktop = useMediaQuery('(min-width:900px)')
    return isDesktop ? (
        // TABLA DESKTOP
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ m: '12px', display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField id="search" label="Buscar" variant="outlined" onChange={searcher} value={search} autoComplete="off" sx={{ width: { xs: '100%', sm: 300, md: 300 }, mr: 2, mb: { xs: 2, sm: 0 } }} />
            </Box>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns?.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={() => handleSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows()
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            ?.map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} >
                                    {columns?.map((column) => (
                                        <TableCell key={column.id} align={column.align} sx={{ padding: 2 }}>
                                            {(() => {
                                                // console.log(row)
                                                if (column.id === 'acciones') {
                                                    return (
                                                        <>
                                                            <IconButton component={'a'} color='' aria-label='Ver Cartilla' size='large' target="_blank" href={`https://xer.pascalito.com.ar/assets/${row.cartilla_file}`}>
                                                                <RemoveRedEyeSharpIcon />
                                                            </IconButton>
                                                        </>
                                                    );

                                                } else {
                                                    return row[column.id];
                                                }
                                            })()}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={state.cartillas?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    ) : (
        // TABLA MOBILE
        <Paper sx={{ width: '100%', overflowX: 'auto' }}>
            <Box sx={{ m: '12px' }}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField id="search" label="Buscar" variant="outlined" onChange={searcher} value={search} autoComplete="off" sx={{ width: { xs: '100%', sm: 300, md: 300 }, mr: 2, mb: { xs: 2, sm: 0 } }} />
                </Box>
                <TableContainer>
                    <Table aria-label="sticky table">
                        <TableBody>
                            {sortedRows()
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                ?.map((row, index) => (
                                    columns?.map((column) => (
                                        <TableRow role="checkbox" tabIndex={-1} key={`${row.id}-${column.id}`} sx={{ backgroundColor: `${index % 2 === 0 && '#f0efef'}`, width: '100%' }}>
                                            <TableCell
                                                key={column.id}
                                                align='left'
                                                sx={{ fontWeight: 500 }}
                                            >
                                                <TableSortLabel
                                                    active={orderBy === column.id}
                                                    direction={orderBy === column.id ? order : 'asc'}
                                                    onClick={() => handleSort(column.id)}
                                                >
                                                    {column.label}
                                                </TableSortLabel>
                                            </TableCell>

                                            {(() => {
                                                if (column.id === 'acciones') {
                                                        return (
                                                            <TableCell
                                                                align='right'
                                                            >
                                                                <IconButton component={'a'} color='' aria-label='Ver Cartilla' size='large' target="_blank" href={`https://xer.pascalito.com.ar/assets/${row.cartilla_file}`}>
                                                                    <RemoveRedEyeSharpIcon />
                                                                </IconButton>
                                                            </TableCell>
                                                        )                                
                                                } else {
                                                    return <TableCell align='right'> {row[column.id]} </TableCell>
                                                }
                                            })()}
                                        </TableRow>
                                    ))
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={state.cartillas?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    labelRowsPerPage="Filas :"
                    sx={{ mb: '12px' }}
                />
            </Box>
        </Paper>
    )
};

export default TablaCartilla;
