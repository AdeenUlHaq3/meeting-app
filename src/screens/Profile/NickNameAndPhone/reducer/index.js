export const reducer = (state = {}, action) => {
    switch(action.type) {
        case "Redirect To User": 
            return {...state, user: action.user}
        default:
            return state;
    }
};