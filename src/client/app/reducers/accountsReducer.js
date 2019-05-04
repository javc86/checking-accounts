const initialState = {
    list: null,
    saved: null,
    details: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ACCOUNTS':
            return {...state, list: action.payload.accounts};
        case 'GET_SAVED_ACCOUNT':
            return {...state, saved: action.payload.saved};
        case 'GET_ACCOUNT_DETAILS':
                return {...state, details: action.payload.details};
        default:
            return state;
    }
};
