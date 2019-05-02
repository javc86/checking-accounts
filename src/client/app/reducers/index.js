import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import clientsState from './clientsReducer';

const rootReducer = history => combineReducers({
    router: connectRouter(history),
    clientsState
});

export default rootReducer;
