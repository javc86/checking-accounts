import mysql from 'mysql';
import {config} from '../config';

const clientsActions = {};

clientsActions.list = () => (
    new Promise((resolve, reject) => {
        const cn = mysql.createConnection(config);

        cn.connect();

        const query = 'SELECT * FROM clients';

        cn.query(query, (err, rows, fields) => {
            if (err) {
                const errorJson = JSON.parse(JSON.stringify(err));
                resolve(JSON.stringify({error: errorJson.sqlMessage}));
                cn.end();
            } else {
                const newRows = rows.map(row => {
                    const dniCuit = row.dni ? row.dni + ' / ' + row.cuit : row.cuit;
                    const nombreRazonSocialAnioInicio = (row.dni !== null ?
                                    row.name + ' ' + row.lastname :
                                        row.business_name + ' / AÑO DE INICIO ' + row.start_year).toUpperCase();
                    return {
                        id: row.id,
                        dniCuit,
                        nombreRazonSocialAnioInicio,
                        tipo: row.type === 0 ? 'NATURAL' : 'JURÍDICO'
                    };
                });

                resolve(JSON.stringify({rows: newRows}));
                cn.end();
            }
        });
    })
);

clientsActions.save = data => (
    new Promise((resolve, reject) => {

        const cn = mysql.createConnection(config);

        cn.connect();

        let query = `SELECT * FROM clients WHERE cuit = ${data.cuit}`;

        if(data.dni && data.dni !== '') query += ` OR dni = ${data.dni}`;

        cn.query(query, (err, result) => {
            if (err) {
                const errorJson = JSON.parse(JSON.stringify(err));
                resolve(JSON.stringify({error: errorJson.sqlMessage}));
            } else if (result && result.length > 0 && (data.id === null || data.id === undefined)) {
                resolve(JSON.stringify({error: 'El titula ya existe en la base de datos'}));
                cn.end();
            } else {
                if (!data.id || (data.id && data.id === null)) {
                    query = `INSERT INTO clients (dni, cuit, name, lastname, business_name, start_year, type)
                                    VALUES (
                                        ${data.dni && data.dni !== null && data.dni !== '' && data.type === 0 ? data.dni : null},
                                        ${data.cuit},
                                        ${data.name && data.name !== null && data.name !== '' && data.type === 0 ? '\'' + data.name + '\'' : null},
                                        ${data.lastname && data.lastname !== null && data.lastname !== '' && data.type === 0 ? '\'' + data.lastname + '\'' : null},
                                        ${data.business_name && data.business_name !== null && data.business_name !== '' && data.type === 1 ? '\'' + data.business_name + '\'' : null},
                                        ${data.start_year && data.start_year !== null && data.start_year !== '' && data.type === 1 ? data.start_year : null},
                                        ${data.type}
                                    );`;
                } else {
                    query = `UPDATE clients
                                SET cuit = ${data.cuit}, type = ${data.type}`;

                    if (data.dni) query += `, dni = ${data.dni && data.dni !== null && data.dni !== '' && data.type === 0 ? data.dni : null}`;
                    if (data.name) query += `, name = ${data.name && data.name !== null && data.name !== '' && data.type === 0 ? '\'' + data.name + '\'' : null}`;
                    if (data.lastname) query += `, lastname = ${data.lastname && data.lastname !== null && data.lastname !== '' && data.type === 0 ? '\'' + data.lastname + '\'' : null}`;
                    if (data.business_name) query += `, business_name = ${data.business_name && data.business_name !== null && data.business_name !== '' && data.type === 1 ? '\'' + data.business_name + '\'' : null}`;
                    if (data.start_year) query += `, start_year = ${data.start_year && data.start_year !== null && data.start_year !== '' && data.type === 1 ? data.start_year : null}`;

                    query += ` WHERE id = ${data.id};`;
                }

                cn.query(query, (err, result) => {
                    if (err) {
                        const errorJson = JSON.parse(JSON.stringify(err));
                        resolve(JSON.stringify({error: errorJson.sqlMessage}));
                    }

                    resolve(JSON.stringify({result: 1}));
                });
                cn.end();
            }
        });
    })
);

clientsActions.details = id => (
    new Promise((resolve, reject) => {
        const cn = mysql.createConnection(config);

        cn.connect();

        const query = 'SELECT * FROM clients WHERE id = ' + id;

        cn.query(query, (err, result, fields) => {
            if (err) {
                const errorJson = JSON.parse(JSON.stringify(err));
                resolve(JSON.stringify({error: errorJson.sqlMessage}));
            }

            resolve(JSON.stringify({result: result.length > 0 ? result[0] : {}}));
        });

        cn.end();
    })
);

clientsActions.delete = id => (
    new Promise((resolve, reject) => {
        const cn = mysql.createConnection(config);

        cn.connect();

        let query = `SELECT COUNT(*) as total FROM clients c
                        INNER JOIN accounts a ON c.id = a.client_id
                        INNER JOIN movements m ON a.id = m.account_id
                        WHERE c.id = ` + id;

        cn.query(query, (err, result) => {
            if (err) {
                const errorJson = JSON.parse(JSON.stringify(err));
                resolve(JSON.stringify({error: errorJson.sqlMessage}));
                cn.end();
            }else if (result[0].total > 0) {
                resolve(JSON.stringify({error: 'No se puede eliminar el Titular porque tiene movimientos asociados a su cuenta'}));
                cn.end();
            } else {
                query = 'DELETE FROM clients WHERE id = ' + id;

                cn.query(query, (err) => {
                    if (err) {
                        const errorJson = JSON.parse(JSON.stringify(err));
                        resolve(JSON.stringify({error: errorJson.sqlMessage}));
                    }

                    resolve(JSON.stringify({result: 1}));
                });

                cn.end();
            }
        });
    })
);

export default clientsActions;
