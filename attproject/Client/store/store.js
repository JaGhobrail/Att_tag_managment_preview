import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import questionReducer from './questionSlice';

import investigationReducer from './investigationSlice';


import authReducer from "./auth/reducers";



const store = configureStore({
  reducer: {
    question: questionReducer,
    investigation: investigationReducer,
    auth: authReducer,
  },
  middleware: [thunk],
});

export default store;
