export const reducer = (state = {}, action) => {
    switch(action.type) {
        case 'HANDLE_CHANGE-NICKNAME': 
            return {...state, nickName: action.nickName}
        case 'HANDLE_CHANGE_PHONE':
            return {...state, phone: action.phone}
        default:
            return state;
    }
};