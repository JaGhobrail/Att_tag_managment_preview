import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';

export const getItems = createAsyncThunk('vendorsApp/getItems', async () => {
  const response = await axios.get('/api/vendors');
  const data = await response.data;

  return { data: data, currentPage: 1, totalPage: data?.length / 10, date: '43343' };
});

export const insertDraft = createAsyncThunk('vendorsApp/insertDraft', async ({ data, itemId }) => {
  // const response = await axios.get('/api/vendors');
  // const data = await response.data;

  // return { data: data, currentPage: 1, totalPage: data?.length / 10, date: '43343' };
  return { itemId, data }
});

export const insertNote = createAsyncThunk('vendorsApp/insertNote', async ({ data, itemId }) => {
  console.log('vendorsApp/insertNote', data);
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
  name: 'vendorsApp',
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
} = itemAdapter.getSelectors((state) => state.vendorsApp.vendorsApp)

export const selectCurrentPage = ({ vendorsApp }) => {
  return vendorsApp.vendorsApp.currentPage
}
export const selectTotalPage = ({ vendorsApp }) => {
  return vendorsApp.vendorsApp.totalPage
};
export const selectPerPage = ({ vendorsApp }) => {
  return vendorsApp.vendorsApp.totalPage
};
export const selectHasDraftItem = ({ vendorsApp }) => {
  return vendorsApp.vendorsApp.hasDraftItem
};

export default slice.reducer;
