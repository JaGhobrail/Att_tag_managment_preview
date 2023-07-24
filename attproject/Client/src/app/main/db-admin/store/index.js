import { combineReducers } from '@reduxjs/toolkit';
import dbAdmin from './Slice';

const reducer = combineReducers({
    dbAdmin,
});

export default reducer;
