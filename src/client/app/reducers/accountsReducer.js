const initialState = {
    list: null,
    saved: null,
    details: null,
    clients: [],
    deleted: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ACCOUNTS':
            return {...state, list: action.payload.accounts};
        case 'GET_SAVED_ACCOUNT':
            return {...state, saved: action.payload.saved};
        case 'GET_ACCOUNT_DETAILS':
                return {...state, details: action.payload.details};
        case 'GET_CLIENTS_WITHOUT_ACCOUNT':
                return {...state, clients: action.payload.clients};
        case 'GET_DELETED_ACCOUNT':
                return {...state, deleted: action.payload.deleted};
        default:
            return state;
    }
};
