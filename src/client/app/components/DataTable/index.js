import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

import styles from './styles';

const DataTable = ({fields, rows}) => (
    <Paper style={styles.container}>
        <Table style={styles.table}>
        <TableHead>
            <TableRow>
                {fields.map((field, index) => (
                    <TableCell align="center" key={index + '-' + field.name}>
                        {field.desc.toUpperCase()}
                    </TableCell>
                ))}
                <TableCell align="center">
                    ACCIONES
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.length > 0 && rows.map(row => (
                <TableRow key={row.id}>
                    {fields.map((field, index) => (
                        <TableCell align="center" key={index + '-' + row.id + '-' + field.name}>
                            {row[field.name]}
                        </TableCell>
                    ))}
                    <TableCell align="center">
                        <Fab size="small" aria-label="Add" style={styles.btnDelete}>
                            <DeleteIcon fontSize="small"/>
                        </Fab>
                        <Fab size="small" aria-label="Add" style={styles.btnView}>
                            <VisibilityIcon fontSize="small"/>
                        </Fab>
                    </TableCell>
                </TableRow>
            ))}
            {rows.length === 0 && <TableRow>
                <TableCell align="center" colSpan={fields.length + 1}>
                    NO HAY DATA
                </TableCell>
            </TableRow>}
        </TableBody>
        </Table>
    </Paper>
);

DataTable.propTypes = {
    headers: PropTypes.array,
    rows: PropTypes.array
};

export default DataTable;
