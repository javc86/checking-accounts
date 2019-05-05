import mysql from 'mysql';
import config from '../config';

const accountsActions = {};

accountsActions.list = () => (
    new Promise((resolve, reject) => {
        const cn = mysql.createConnection(config);

        cn.connect();

        const query = `SELECT a.*, c.name, c.lastname, c.dni, c.business_name
                        FROM accounts a INNER JOIN clients c ON a.client_id = c.id`;

        cn.query(query, (err, rows, fields) => {
            if (err) {
                const errorJson = JSON.parse(JSON.stringify(err));
                resolve(JSON.stringify({error: errorJson.sqlMessage}));
            }

            const newRows = rows.map(row => {
                const client = (row.dni !== null ? row.name + ' ' + row.lastname : row.business_name).toUpperCase();

                let currency = 'Pesos';
                if (row.currency === 1) currency = 'Dolares';
                if (row.currency === 2) currency = 'Euros';

                return {
                    id: row.id,
                    client,
                    number: row.number,
                    currency,
                    balance: row.balance
                };
            });

            resolve(JSON.stringify({rows: newRows}));
        });

        cn.end();
    })
);

accountsActions.clientsWithoutAccount = () => (
    new Promise((resolve, reject) => {
        const cn = mysql.createConnection(config);

        cn.connect();

        const query = `SELECT c.* FROM clients c
                        LEFT JOIN accounts a ON c.id = a.client_id
                        WHERE a.client_id IS NULL`;

        cn.query(query, (err, rows, fields) => {
            if (err) {
                const errorJson = JSON.parse(JSON.stringify(err));
                resolve(JSON.stringify({error: errorJson.sqlMessage}));
            }

            const newRows = rows.map(row => {
                const dniCuit = row.dni ? row.dni + ' / ' + row.cuit : row.cuit;
                const desc = (row.cuit + ' ' + (
                                row.dni !== null ? row.name + ' ' + row.lastname : row.business_name
                            )).toUpperCase();
                return {
                    id: row.id,
                    desc
                };
            });

            resolve(JSON.stringify({rows: newRows}));
        });

        cn.end();
    })
);

accountsActions.save = data => (
    new Promise((resolve, reject) => {

        const cn = mysql.createConnection(config);

        cn.connect();

        let query = `SELECT * FROM accounts WHERE number = ${data.number}`;

        cn.query(query, (err, result) => {
            if (err) {
                const errorJson = JSON.parse(JSON.stringify(err));
                resolve(JSON.stringify({error: errorJson.sqlMessage}));
            }

            if (result && result.length > 0 && (data.id === null || data.id === undefined)) {
                resolve(JSON.stringify({error: 'La cuenta ya existe en la base de datos'}));
                cn.end();
            } else {
                query = `INSERT INTO accounts (client_id, number, currency, balance)
                                VALUES (
                                    ${data.client_id},
                                    ${data.number},
                                    ${data.currency},
                                    ${data.balance}
                                );`;

                console.log('query', query);

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

accountsActions.details = id => (
    new Promise((resolve, reject) => {
        const cn = mysql.createConnection(config);

        cn.connect();

        let query = `SELECT c.*, a.* FROM clients c
                        INNER JOIN accounts a ON c.id = a.client_id
                        WHERE  a.id = ${id}`;

        cn.query(query, (err1, result1, fields) => {
            if (err1) {
                const errorJson = JSON.parse(JSON.stringify(err1));
                resolve(JSON.stringify({error: errorJson.sqlMessage}));
                cn.end();
            } else if (result1.length > 0) {

                let currency = 'Pesos';
                if (result1[0].currency === 1) currency = 'Dolares';
                if (result1[0].currency === 2) currency = 'Euros'

                const account = {
                    id: result1[0].id,
                    dniCuit: result1[0].dni ? result1[0].dni + ' / ' + result1[0].cuit : result1[0].cuit,
                    desc: (result1[0].dni !== null ? result1[0].name + ' ' + result1[0].lastname : result1[0].business_name).toUpperCase(),
                    number: result1[0].number,
                    currency,
                    balance: result1[0].balance
                }

                query = `SELECT * FROM movements WHERE  account_id = ${result1[0].id} ORDER BY date DESC`;

                cn.query(query, (err2, result2, fields) => {
                    if (err2) {
                        const errorJson = JSON.parse(JSON.stringify(err2));
                        resolve(JSON.stringify({error: errorJson.sqlMessage}));
                        cn.end();
                    } else {
                        const dataJson = {
                            account: account,
                            movements: result2
                        }

                        resolve(JSON.stringify({result: dataJson}));
                        cn.end();
                    }
                });
            } else {
                resolve(JSON.stringify({error: 'El ID de la cuenta consultada no existe'}));
                cn.end();
            }
        });

    })
);

export default accountsActions;
