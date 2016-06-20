import { combineReducers } from 'redux'
import login from './reducers/login';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    login,
    routing: routerReducer
});