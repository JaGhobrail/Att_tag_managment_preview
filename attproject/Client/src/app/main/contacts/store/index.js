import { combineReducers } from '@reduxjs/toolkit';
import users from './contactsSlice';
import user from './contactSlice';

const reducer = combineReducers({
    users,
    user,
});

export default reducer;
