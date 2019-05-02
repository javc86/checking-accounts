const initialState = {
    accounts: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ACCOUNTS':
            return {...state, accounts: actions.payload.accounts};
        default:
            return state;
    }
};
