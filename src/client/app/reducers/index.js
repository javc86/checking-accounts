import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import homeState from './homeReducer';

const rootReducer = history => combineReducers({
    router: connectRouter(history),
    homeState
});

export default rootReducer;
