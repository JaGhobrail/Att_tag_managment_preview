import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';

export const getItems = createAsyncThunk('trackersApp/getItems', async () => {
  const response = await axios.get('/api/trackers');
  const data = await response.data;

  return { data: data.data.data, currentPage: 1, totalPage: 10, date: '43343' };
});

export const getVendors = createAsyncThunk('trackersApp/getVendors', async () => {
  const response = await axios.get('/api/vendors');
  const data = await response.data;

  return data
});

export const insertDraft = createAsyncThunk('trackersApp/insertDraft', async ({ data, itemId }) => {
  // const response = await axios.get('/api/vendors');
  // const data = await response.data;

  // return { data: data, currentPage: 1, totalPage: data?.length / 10, date: '43343' };
  return { itemId, data }
});

export const insertNote = createAsyncThunk('trackersApp/insertNote', async ({ data, itemId }) => {
  console.log('trackersApp/insertNote', data);
  // const response = await axios.get('/api/vendors');
  // const data = await response.data;

  // return { data: data, currentPage: 1, totalPage: data?.length / 10, date: '43343' };
  return { itemId, data }
});



const itemAdapter = createEntityAdapter({
  selectId: (item) => item.id,
  sortComparer: (a, b) => b.timestamp - a.timestamp
})

const initialState = itemAdapter.getInitialState({
  perPage: 0,
  totalPage: 0,
  currentPage: 0,
  date: null,
  hasDraftItem: false
})

const slice = createSlice({
  name: 'trackersApp',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getItems.fulfilled]: (state, action) => {
      const newList = action.payload.data.map((item, index) => { return { ...item, id: index } })
      itemAdapter.removeAll(state)
      itemAdapter.addMany(state, newList)
      state.currentPage = action.payload.currentPage
      state.totalPage = action.payload.totalPage
      state.date = action.payload.date
    },
    [getVendors.fulfilled]: (state, action) => {
      // const newList = action.payload.data.map((item, index) => { return { ...item, id: index } })
      state.vendors = action.payload.map((item, index) => item.vendor_name)
    },
    [insertDraft.fulfilled]: (state, action) => {
      state.hasDraftItem = true
      const draftList = state.entities[action.payload.itemId].draftList
      state.entities[action.payload.itemId].result = action.payload.data.result
      state.entities[action.payload.itemId].changeResult = true
      if (!draftList)
        state.entities[action.payload.itemId].draftList = [action.payload.data]
      else
        state.entities[action.payload.itemId].draftList = [action.payload.data, ...draftList]
    },
    [insertNote.fulfilled]: (state, action) => {
      state.hasDraftItem = true
      const noteList = state.entities[action.payload.itemId].noteList
      state.entities[action.payload.itemId].changeNotes = true
      state.entities[action.payload.itemId].notes = action.payload.data.notes
      if (!noteList)
        state.entities[action.payload.itemId].noteList = [action.payload.data]
      else
        state.entities[action.payload.itemId].noteList = [action.payload.data, ...noteList]
    },
  },
});

export const {
  selectById: selectItemById,
  selectIds: selectItemIds,
  selectAll: selectAllItems,
} = itemAdapter.getSelectors((state) => state.trackersApp.trackersApp)

export const selectCurrentPage = ({ trackersApp }) => {
  return trackersApp.trackersApp.currentPage
}
export const selectTotalPage = ({ trackersApp }) => {
  return trackersApp.trackersApp.totalPage
};
export const selectPerPage = ({ trackersApp }) => {
  return trackersApp.trackersApp.totalPage
};
export const selectHasDraftItem = ({ trackersApp }) => {
  return trackersApp.trackersApp.hasDraftItem
};
export const selectVendros = ({ trackersApp }) => {
  return trackersApp.trackersApp.vendors
};

export default slice.reducer;
