import { createStore, applyMiddleware } from 'redux';
import rootReducer from './RootReducer/index';
import thunk from 'redux-thunk';

export default createStore(rootReducer, applyMiddleware(thunk));