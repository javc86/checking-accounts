const initialState = {
    list: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CLIENTS':
            return {...state, list: action.payload.clients};
        default:
            return state;
    }
};
