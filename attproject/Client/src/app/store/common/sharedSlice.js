import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';

export const getVendorNames = createAsyncThunk('shared/getVendors', async () => {
    const response = await axios.get('/api/vendors-name');
    const data = await response.data;
    return data.data
});

export const getUnits = createAsyncThunk('shared/getUnits', async () => {
    const response = await axios.get('/api/units');
    const data = await response.data;
    return data.data.data
});

export const getUserRoles = createAsyncThunk('shared/getUserRoles', async () => {
    const response = await axios.get('/api/user-roles');
    const data = await response.data;
    return data.data
});



const initialState = {
    vendorsName: [],
    units: [],
    userRoles: []
}

const slice = createSlice({
    name: 'sharedSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getVendorNames.fulfilled]: (state, action) => {
            state.vendorsName = action.payload
        },
        [getUnits.fulfilled]: (state, action) => {
            state.units = action.payload
        },
        [getUserRoles.fulfilled]: (state, action) => {
            state.userRoles = action.payload
        }


    },
});


export const selectVendorsName = ({ common }) => {
    return common.shared.vendorsName
}

export const selectUnits = ({ common }) => {
    return common.shared.units
}
export const selectUserRoles = ({ common }) => {
    return common.shared.userRoles
}
export default slice.reducer;
