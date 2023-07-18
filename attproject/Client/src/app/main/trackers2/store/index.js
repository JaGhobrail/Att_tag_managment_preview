import { combineReducers } from '@reduxjs/toolkit';
import trackersApp from './Slice';

const reducer = combineReducers({
  trackersApp,
});

export default reducer;
