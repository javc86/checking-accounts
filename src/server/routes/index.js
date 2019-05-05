import express from 'express';
import _ from 'lodash';
import moment from 'moment';
import clientsActions from '../actions/clientsActions';

const api = express.Router();

api.get('/clients', async (req, res) => {
    try {
        const response = await clientsActions.list();
        res.send(JSON.parse(response));
    } catch (error) {
        res.send({error: error});
    }
});

api.get('/clients/:id', async (req, res) => {
    try {
        const response = await clientsActions.details(req.params.id);
        res.send(JSON.parse(response));
    } catch (error) {
        res.send({error: error});
    }
});

api.post('/clients/save', async (req, res) => {
    try {
        let save = true;
        if(_.isEmpty(req.body)) {
            res.send({error: 'Data del cliente vacia'});
            save = false;
        }

        if(req.body.type === undefined || (
                req.body.type !== undefined && (req.body.type === '' || req.body.type === null || (req.body.type !== 0 && req.body.type !== 1))
            )
        ) {
            res.send({error: 'No está definido el \'type\' de Titular (0 para Natural o 1 para Jurídico)'});
            save = false;
        }

        if(parseInt(req.body.type) === 0 && (
                (req.body.dni === undefined || (
                    req.body.dni !== undefined && (req.body.dni === '' || req.body.dni === null || !/^[0-9]*$/.test(req.body.dni))
                )) ||
                (req.body.cuit === undefined || (
                    req.body.cuit !== undefined && (req.body.cuit === '' || req.body.cuit === null || !/^[0-9]*$/.test(req.body.cuit))
                )) ||
                (!req.body.name || (req.body.name && (req.body.name === '' || req.body.name === null))) ||
                (!req.body.lastname || (req.body.lastname && (req.body.lastname === '' || req.body.lastname === null)))
            )
        ) {
            res.send({error: 'Para el titular Natural debe definir \'dni\' (solo numérico), \'cuit\' (solo numérico), \'name\' y \'lastname\''});
            save = false;
        }

        if(parseInt(req.body.type) === 1 && (
                (req.body.cuit === undefined || (
                    req.body.cuit !== undefined && (req.body.cuit === '' || req.body.cuit === null || !/^[0-9]*$/.test(req.body.cuit))
                )) ||
                (!req.body.business_name || (req.body.business_name && (req.body.business_name === '' || req.body.business_name === null))) ||
                (req.body.start_year === undefined || (
                    req.body.start_year !== undefined && (req.body.start_year === '' || req.body.start_year === null || !/^[0-9]*$/.test(req.body.start_year))
                ))
            )
        ) {
            res.send({error: 'Para el titular Jurídico debe definir \'cuit\' (solo numérico), \'business_name\' y \'start_year\' (solo numérico)'});
            save = false;
        }
        if (req.body.name && req.body.name.length > 80) {
            res.send({error: 'El atributo \'name\' solo puede tener un máximo de 80 caracteres'});
            save = false;
        }
        if (req.body.lastname && req.body.lastname.length > 255) {
            res.send({error: 'El atributo \'lastname\' solo puede tener un máximo de 255 caracteres'});
            save = false;
        }
        if (req.body.business_name && req.body.business_name.length > 100) {
            res.send({error: 'El atributo \'business_name\' solo puede tener un máximo de 100 caracteres'});
            save = false;
        }
        if (req.body.start_year && req.body.start_year.toString().length !== 4) {
            res.send({error: 'El atributo \'start_year\' solo puede tener 4 dígitos'});
            save = false;
        }
        if (parseInt(req.body.start_year) > parseInt(moment().format('YYYY')) || parseInt(req.body.start_year) < parseInt(moment().format('YYYY')) - 100) {
            res.send({error: 'El atributo \'start_year\' solo puede estar en el rango de ' + (moment().format('YYYY') - 100) + ' y ' + moment().format('YYYY')});
            save = false;
        }

        if (save) {
            const response = await clientsActions.save(req.body);
            res.send(JSON.parse(response));
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

api.get('/clients/delete/:id', async (req, res) => {
    try {
        const response = await clientsActions.delete(req.params.id);
        res.send(JSON.parse(response));
    } catch (error) {
        res.send({error: error});
    }
});

api.get('/accounts', (req, res) => {
    res.send('lista de cuentas corriente');
});

api.post('/accounts/save', (req, res) => {
    res.send('Creando cuenta');
});

api.get('/accounts/:id', (req, res) => {
    res.send('Detalle de la cuenta corriente');
});

api.get('/accounts/delete/:id', (req, res) => {
    res.send('Eliminar cuenta');
});

api.post('/movements/save', (req, res) => {
    res.send('Creando cuenta');
});

export default api;
