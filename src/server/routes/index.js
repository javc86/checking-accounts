import express from 'express';
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

api.post('/clients/save', (req, res) => {
    res.send('lista de cuentas corriente');
});

api.post('/clients/save/:id', (req, res) => {
    res.send('lista de cuentas corriente');
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
