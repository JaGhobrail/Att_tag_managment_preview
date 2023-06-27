import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOverview = createAsyncThunk('vendorsApp/getOverview', async () => {
  const response = await axios.get('/api/dashboards/finance/widgets');
  const data = await response.data;

  return data;
});

export const getWeekly = createAsyncThunk('vendorsApp/getWeekly', async () => {
  const response = await axios.get('/api/dashboards/project/widgets');
  const data = await response.data;

  return data;
});

const slice = createSlice({
  name: 'vendorsApp',
  initialState: {
    overview: null,
    weekly: null
  },
  reducers: {},
  extraReducers: {
    [getOverview.fulfilled]: (state, action) => {
      state.overview = action.payload
    },
    [getWeekly.fulfilled]: (state, action) => {
      state.weekly = action.payload
    },
  },
});

export const selectOverview = ({ vendorsApp }) => {
  return vendorsApp.vendorsApp.overview
};
export const selectWeekly = ({ vendorsApp }) => {
  return vendorsApp.vendorsApp.weekly
};

export default slice.reducer;
