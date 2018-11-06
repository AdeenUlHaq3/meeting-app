export const handleChange = (e) => {
    if(e.target.name === 'nickName')
        return {
            type: 'HANDLE_CHANGE_NICKNAME',
            [e.target.name]: e.target.value
        };
    else
        return{
            type: 'HANDLE_CHANGE_PHONE',
            [e.target.name]: e.target.value
        }
};