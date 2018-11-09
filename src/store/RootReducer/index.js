import { combineReducers } from 'redux';
import { reducer as nickNameAndPhoneReducer } from '../../screens/Profile/NickNameAndPhone/reducer';

export default combineReducers({
    nickNameAndPhoneReducer,
});