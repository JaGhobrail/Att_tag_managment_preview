import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import questionReducer from './questionSlice';

import investigationReducer from './investigationSlice';
import pageSectListReducer from './pageSectListSlice';


import authReducer from "./auth/reducers";



const store = configureStore({
    reducer: {
        question: questionReducer,
        investigation: investigationReducer,
        auth: authReducer,
        pageSectList: pageSectListReducer
    },
    middleware: [thunk],
});

export default store;
