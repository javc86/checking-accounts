import fetch from 'node-fetch';
import config from '../config';

const onGetClients = clients => ({
    type: 'GET_CLIENTS',
    payload: {clients}
});

export const getClients = () => (
    async dispatch => {
        try {
            const response = await fetch(config.url + '/clients');
            const clients = (await response.json()).rows;
            return dispatch(onGetClients(clients));
        } catch (error) {
            console.log(error);
            return dispatch(onGetClients([]));
        }
    }
);

const onGetSavedClient = saved => ({
    type: 'GET_SAVED_CLIENT',
    payload: {saved}
});

export const getSavedClient = (body, callback) => (
    async dispatch => {
        try {
            const response = await fetch(config.url + '/clients/save', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            const saved = (await response.json());
            callback(saved, body.dni);
            return dispatch(onGetSavedClient(saved));
        } catch (error) {
            console.log(error);
        }
    }
);

const onGetDetailClient = details => ({
    type: 'GET_CLIENT_DETAILS',
    payload: {details}
});

export const getDetailClient = id => (
    async dispatch => {
        try {
            const response = await fetch(config.url + '/clients/' + id);
            const details = (await response.json()).result;
            return dispatch(onGetDetailClient(details));
        } catch (error) {
            console.log(error);
        }
    }
);

const onDeleteClient = deleted => ({
    type: 'GET_DELETED_CLIENT',
    payload: {deleted}
});

export const getDeleteClient = (id, callback) => (
    async dispatch => {
        try {
            const response = await fetch(config.url + '/clients/delete/' + id);
            const deleted = (await response.json());
            callback();
            return dispatch(onDeleteClient(deleted));
        } catch (error) {
            console.log(error);
        }
    }
);
