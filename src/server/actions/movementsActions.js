import mysql from 'mysql';
import moment from 'moment';
import {config} from '../config';

const movementsActions = {};

movementsActions.save = data => (
    new Promise((resolve, reject) => {

        const cn = mysql.createConnection(config);

        cn.connect();

        let query = `SELECT * FROM accounts WHERE number = ${data.account}`;

        cn.query(query, (err, result) => {
            if (err) {
                const errorJson = JSON.parse(JSON.stringify(err));
                resolve(JSON.stringify({error: errorJson.sqlMessage}));
                cn.end();
            }else if (result && result.length === 0) {
                resolve(JSON.stringify({error: 'La cuenta no existe en la base de datos'}));
                cn.end();
            } else {
                if (result[0].currency === 0 && data.type === 0 && parseFloat(data.amount) > 1000) {
                    resolve(JSON.stringify({error: 'La cuenta es en Pesos, por lo que no puede tener un descubierto mayor a 1000 Pesos'}));
                    cn.end();
                } else if (result[0].currency === 1 && data.type === 0 && parseFloat(data.amount) > 300) {
                    resolve(JSON.stringify({error: 'La cuenta es en Dolares, por lo que no puede tener un descubierto mayor a 300 Dolares'}));
                    cn.end();
                } else if (result[0].currency === 2 && data.type === 0 && parseFloat(data.amount) > 150) {
                    resolve(JSON.stringify({error: 'La cuenta es en Euros, por lo que no puede tener un descubierto mayor a 150 Euros'}));
                    cn.end();
                } else if (data.type === 0 && parseFloat(data.amount) > result[0].balance) {
                    resolve(JSON.stringify({error: 'La cuenta es no tiene fondos suficientes para realizar la transacción'}));
                    cn.end();
                } else {
                    const newBalance = data.type === 0 ? result[0].balance - parseFloat(data.amount) : result[0].balance + parseFloat(data.amount);

                    query = `UPDATE accounts SET balance = ${newBalance} WHERE number = ${data.account}`;

                    cn.query(query, err => {
                        if (err) {
                            const errorJson = JSON.parse(JSON.stringify(err));
                            resolve(JSON.stringify({error: errorJson.sqlMessage}));
                        }

                        query = `INSERT INTO movements (account_id, type, description, amount)
                                    VALUES (
                                        ${result[0].id},
                                        ${data.type},
                                        '${data.description}',
                                        ${data.amount}
                                    );`;

                        cn.query(query, err => {
                            if (err) {
                                const errorJson = JSON.parse(JSON.stringify(err));
                                resolve(JSON.stringify({error: errorJson.sqlMessage}));
                            }

                            resolve(JSON.stringify({result: 1}));
                        });

                        cn.end();
                    });
                }
            }
        });
    })
);

export default movementsActions;
