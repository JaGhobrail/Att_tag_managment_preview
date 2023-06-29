import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';

export const getVendorNames = createAsyncThunk('shared/getVendors', async () => {
    const response = await axios.get('/api/vendors-name');
    const data = await response.data;
    return data.data
});



const initialState = {
    vendorsName: []
}

const slice = createSlice({
    name: 'sharedSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getVendorNames.fulfilled]: (state, action) => {
            state.vendorsName = action.payload
        }
    },
});


export const selectVendorsName = ({ common }) => {
    return common.shared.vendorsName
}
export default slice.reducer;
