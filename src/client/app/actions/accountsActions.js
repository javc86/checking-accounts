import fetch from 'node-fetch';
import config from '../config';

const onGetAccounts = accounts => ({
    type: 'GET_ACCOUNTS',
    payload: {accounts}
});

export const getAccounts = () => (
    async dispatch => {
        try {
            const response = await fetch(config.url + '/accounts');
            const accounts = (await response.json()).rows;
            return dispatch(onGetAccounts(accounts));
        } catch (error) {
            console.log(error);
        }
    }
);

const onGetClientsWithoutAccount = clients => ({
    type: 'GET_CLIENTS_WITHOUT_ACCOUNT',
    payload: {clients}
});

export const getClientsWithoutAccount = () => (
    async dispatch => {
        try {
            const response = await fetch(config.url + '/clientswithoutaccount');
            const clients = (await response.json()).rows;
            return dispatch(onGetClientsWithoutAccount(clients));
        } catch (error) {
            console.log(error);
        }
    }
);

const onGetSavedAccount = saved => ({
    type: 'GET_SAVED_ACCOUNT',
    payload: {saved}
});

export const getSavedAccount = (body, callback) => (
    async dispatch => {
        try {
            const response = await fetch(config.url + '/accounts/save', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            const saved = (await response.json());
            callback(saved);
            return dispatch(onGetSavedAccount(saved));
        } catch (error) {
            console.log(error);
        }
    }
);

const onGetDetailAccount = details => ({
    type: 'GET_ACCOUNT_DETAILS',
    payload: {details}
});

export const getDetailAccount = id => (
    async dispatch => {
        try {
            const response = await fetch(config.url + '/accounts/' + id);
            const details = (await response.json()).result;
            return dispatch(onGetDetailAccount(details));
        } catch (error) {
            console.log(error);
        }
    }
);

const onDeleteAccount = deleted => ({
    type: 'GET_DELETED_ACCOUNT',
    payload: {deleted}
});

export const getDeleteAccount = (id, callback) => (
    async dispatch => {
        try {
            const response = await fetch(config.url + '/accounts/delete/' + id);
            const deleted = (await response.json());
            callback();
            return dispatch(onDeleteAccount(deleted));
        } catch (error) {
            console.log(error);
        }
    }
);
