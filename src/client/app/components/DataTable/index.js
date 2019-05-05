import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import _ from 'lodash';

import styles from './styles';

const DataTable = ({fields, rows, module, deleteData, actions}) => (
    <Paper style={styles.container}>
        <Table style={styles.table}>
        <TableHead>
            <TableRow>
                {fields.map((field, index) => (
                    <TableCell align="center" key={index + '-' + field.name}>
                        {field.desc.toUpperCase()}
                    </TableCell>
                ))}
                {actions && !_.isEmpty(actions) && (
                    <TableCell align="center">
                        ACCIONES
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
        <TableBody>
            {rows !== null && rows.length > 0 && rows.map(row => (
                <TableRow key={row.id}>
                    {fields.map((field, index) => (
                        <TableCell align="center" key={index + '-' + row.id + '-' + field.name}>
                            {row[field.name]}
                        </TableCell>
                    ))}
                    {actions && !_.isEmpty(actions) && (
                        <TableCell align="center">
                            {actions.edit && (
                                <Link to={`/${module}/edit/${row.id}`}>
                                    <Fab size="small" aria-label="Add" style={styles.btnEdit}>
                                        <EditIcon fontSize="small"/>
                                    </Fab>
                                </Link>
                            )}
                            {actions.view && (
                                <Link to={`/${module}/details/${row.id}`}>
                                    <Fab size="small" aria-label="Add" style={styles.btnView}>
                                        <VisibilityIcon fontSize="small"/>
                                    </Fab>
                                </Link>
                            )}
                            {actions.delete && (
                                <Fab size="small" aria-label="Add" style={styles.btnDelete} onClick={e => deleteData(e, row.id)}>
                                    <DeleteIcon fontSize="small"/>
                                </Fab>
                            )}
                        </TableCell>
                    )}
                </TableRow>
            ))}
            {rows === null && (
                <TableRow>
                    <TableCell align="center" colSpan={fields.length + 1}>
                        BUSCANDO DATA...
                    </TableCell>
                </TableRow>
            )}
            {rows !== null && rows.length === 0 && (
                <TableRow>
                    <TableCell align="center" colSpan={fields.length + 1}>
                        NO HAY DATA
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
        </Table>
    </Paper>
);

DataTable.propTypes = {
    fields: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    module: PropTypes.string,
    deleteData: PropTypes.func,
    actions: PropTypes.object
};

export default DataTable;
