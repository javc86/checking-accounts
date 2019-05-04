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
        }
    }
);
