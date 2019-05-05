const initialState = {
    list: null,
    saved: null,
    details: null,
    deleted: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CLIENTS':
            return {...state, list: action.payload.clients};
        case 'GET_SAVED_CLIENT':
            return {...state, saved: action.payload.saved};
        case 'GET_CLIENT_DETAILS':
                return {...state, details: action.payload.details};
        case 'GET_DELETED_CLIENT':
                return {...state, deleted: action.payload.deleted};
        default:
            return state;
    }
};
