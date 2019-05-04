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

const onGetSavedAccount = saved => ({
    type: 'GET_SAVED_ACCOUNT',
    payload: {saved}
});

export const getSavedAccount = body => (
    async dispatch => {
        try {
            // const response = await fetch(config.url + '/clients');
            // const clients = (await response.json()).rows;
            return dispatch(onGetSavedAccount(null));
        } catch (error) {
            console.log(error);
        }
    }
);
