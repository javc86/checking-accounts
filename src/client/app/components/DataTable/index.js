import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import styles from './styles';

const DataTable = ({fields, rows}) => (
    <Paper style={styles.container}>
        <Table style={styles.table}>
        <TableHead>
            <TableRow>
                {fields.map((field, index) => (
                    <TableCell align="center" key={index + '-' + field.name}>
                        {field.desc}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map(row => (
                <TableRow key={row.id}>
                    {fields.map((field, index) => (
                        <TableCell align="center" key={index + '-' + row.id + '-' + field.name}>
                            {row[field.name]}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
        </Table>
    </Paper>
);

DataTable.propTypes = {
    headers: PropTypes.array,
    rows: PropTypes.array
};

export default DataTable;
