import mysql from 'mysql';
import config from '../config';

const clientsActions = {};

clientsActions.list = () => (
    new Promise((resolve, reject) => {
        const cn = mysql.createConnection(config);

        cn.connect();

        const query = 'SELECT * FROM clients';

        cn.query(query, (err, rows, fields) => {
            if (err) {
                const errorJson = JSON.parse(JSON.stringify(err));
                resolve(JSON.stringify({
                    error: {
                        code: errorJson.code,
                        message: errorJson.sqlMessage
                    }
                }));
            }

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
        });

        cn.end();
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
                resolve(JSON.stringify({
                    error: {
                        code: errorJson.code,
                        message: errorJson.sqlMessage
                    }
                }));
            }

            if (result && result.length > 0) {
                resolve(JSON.stringify({error: 'El titula ya existe en la base de datos'}));
                cn.end();
            } else {
                if (!data.id || (data.id && data.id === null)) {
                    query = `INSERT INTO clients (dni, cuit, name, lastname, business_name, start_year, type)
                                    VALUES (
                                        ${data.dni && data.dni !== '' ? data.dni : null},
                                        ${data.cuit},
                                        ${data.name && data.name !== '' ? '\'' + data.name + '\'' : null},
                                        ${data.lastname && data.lastname !== '' ? '\'' + data.lastname + '\'' : null},
                                        ${data.business_name && data.business_name !== '' ? '\'' + data.business_name + '\'' : null},
                                        ${data.start_year && data.start_year !== '' ? data.start_year : null},
                                        ${data.type}
                                    );`;
                } else {
                    query = `UPDATE clients
                                SET cuit = ${data.cuit}, type = ${data.type}
                                    dni = ${data.dni},

                                    name = ${data.name},
                                    lastname = ${data.lastname},
                                    business_name = ${data.business_name},
                                    start_year = ${data.start_year}
                                WHERE id = ${data.id};`;

                    if (data.dni) query += `, dni = ${data.dni}`;
                    if (data.name) query += `, name = ${data.name}`;
                    if (data.lastname) query += `, lastname = ${data.lastname}`;
                    if (data.business_name) query += `, business_name = ${data.business_name}`;
                    if (data.start_year) query += `, start_year = ${data.start_year}`;

                    query += ` WHERE id = ${data.id};`;
                }
                console.log('query', query);

                cn.query(query, (err, result) => {
                    if (err) {
                        const errorJson = JSON.parse(JSON.stringify(err));
                        resolve(JSON.stringify({
                            error: {
                                code: errorJson.code,
                                message: errorJson.sqlMessage
                            }
                        }));
                    }

                    resolve(JSON.stringify({result: 1}));
                });

                cn.end();
            }
        });
    })
);

export default clientsActions;
