import express from 'express';

const api = express.Router();

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
