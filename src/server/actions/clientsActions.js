import cn from '../config';

const clientsActions = {};

clientsActions.list = () => (
    new Promise((resolve, reject) => {
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
                const dniCuit = row.dni ? row.dni + '/' + row.cuit : row.cuit;
                const nombreRazonSocialAnioInicio = row.dni ?
                                row.name.toUpperCase() + ' ' + row.lastname.toUpperCase() :
                                    row.business_name.toUpperCase() + ' / AÑO DE INICIO ' + row.start_year;
                return {
                    id: row.id,
                    dniCuit,
                    nombreRazonSocialAnioInicio,
                    tipo: row.type ? 'NATURAL' : 'JURÍDICO'
                };
            });

            resolve(JSON.stringify({rows: newRows}));
        });
    })
);

export default clientsActions;
