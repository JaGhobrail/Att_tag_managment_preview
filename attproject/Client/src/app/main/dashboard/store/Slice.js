import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOverview = createAsyncThunk('dashboardApp/getOverview', async () => {
  const response = await axios.get('/api/dashboards/finance/widgets');
  const data = await response.data;

  return data;
});

export const getWeekly = createAsyncThunk('dashboardApp/getWeekly', async () => {
  const response = await axios.get('/api/dashboards/project/widgets');
  const data = await response.data;

  return data;
});

const slice = createSlice({
  name: 'dashboardApp',
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

export const selectOverview = ({ dashboardApp }) => {
  return dashboardApp.dashboardApp.overview
};
export const selectWeekly = ({ dashboardApp }) => {
  return dashboardApp.dashboardApp.weekly
};

export default slice.reducer;
