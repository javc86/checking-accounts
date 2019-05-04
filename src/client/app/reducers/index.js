import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import clientsState from './clientsReducer';
import accountsState from './accountsReducer';

const rootReducer = history => combineReducers({
    router: connectRouter(history),
    clientsState,
    accountsState
});

export default rootReducer;
