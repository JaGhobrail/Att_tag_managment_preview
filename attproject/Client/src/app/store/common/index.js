import { combineReducers } from '@reduxjs/toolkit';
import dialog from './dialogSlice';
import message from './messageSlice';
import navbar from './navbarSlice';
import navigation from './navigationSlice';
import settings from './settingsSlice';
import shared from './sharedSlice';

const commonReducers = combineReducers({
    navigation,
    settings,
    navbar,
    message,
    dialog,
    shared,

});

export default commonReducers;
