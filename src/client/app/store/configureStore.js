import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducers from '../reducers';

const configureStore = (initialState) => {
    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(thunk, promise)
    );

    return store;
};

export default createStore;
