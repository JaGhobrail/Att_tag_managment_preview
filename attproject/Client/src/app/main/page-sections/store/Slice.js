import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';

export const getItems = createAsyncThunk('pageSectionsApp/getItems', async (params) => {
    const response = await axios.get('/api/page-sections', { params });
    const data = await response.data;
    return { data: data.data.data, currentPage: 1, totalPage: 100, date: '43343' };
});


export const insertDraft = createAsyncThunk('pageSectionsApp/insertDraft', async ({ data, itemId }) => {
    const response = await axios.post(`/api/page-sections/${itemId}/drafts`, data);
    return { itemId, data: response.data.data };
});

export const insertNote = createAsyncThunk('pageSectionsApp/insertNote', async ({ data, itemId }) => {
    const response = await axios.post(`/api/page-sections/${itemId}/notes`, data);
    return { itemId, data: response.data.data };
});

export const deleteNote = createAsyncThunk('pageSectionsApp/deleteNote', async ({ id, itemId }) => {
    await axios.delete(`/api/notes/${id}`);
    return { id, itemId };
});

export const deleteDraft = createAsyncThunk('pageSectionsApp/deleteDraft', async ({ id, itemId }) => {
    await axios.delete(`/api/drafts/${id}`);
    return { id, itemId };
});

export const saveAllDrafts = createAsyncThunk('pageSectionsApp/saveAllDrafts', async () => {
    const response = await axios.post(`/api/page-sections/save-all-drafts`);
    return response.data
});

export const clearAllDrafts = createAsyncThunk('pageSectionsApp/clearAllDrafts', async () => {
    const response = await axios.post(`/api/page-sections/clear-all-drafts`);
    return response.data
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
    name: 'pageSectionsApp',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [saveAllDrafts.fulfilled]: (state, action) => {
            state.ids.map(id => {
                state.entities[id].changeResult = false
                state.entities[id].draftList = []
            })
        },
        [getItems.pending]: (state, action) => {
            itemAdapter.removeAll(state)
        },
        [getItems.fulfilled]: (state, action) => {
            const newList = action.payload.data
            itemAdapter.addMany(state, newList)
            state.currentPage = action.payload.currentPage
            state.totalPage = action.payload.totalPage
            state.date = action.payload.date

        },
        [insertDraft.fulfilled]: (state, action) => {
            const drafts = state.entities[action.payload.itemId].drafts
            if (!drafts)
                state.entities[action.payload.itemId].drafts = [action.payload.data]
            else
                state.entities[action.payload.itemId].drafts = [action.payload.data, ...drafts]

        },
        [deleteDraft.fulfilled]: (state, action) => {
            const drafts = state.entities[action.payload.itemId].drafts
            const newList = drafts.filter(item => item.id != action.payload.id)
            state.entities[action.payload.itemId].drafts = newList
        },
        [insertNote.fulfilled]: (state, action) => {
            const noteList = state.entities[action.payload.itemId].note_list
            if (!noteList)
                state.entities[action.payload.itemId].note_list = [action.payload.data]
            else
                state.entities[action.payload.itemId].note_list = [action.payload.data, ...noteList]
        },
        [deleteNote.fulfilled]: (state, action) => {
            const noteList = state.entities[action.payload.itemId].note_list
            const newList = noteList.filter(item => item.id != action.payload.id)
            state.entities[action.payload.itemId].note_list = newList
        },
    },
});

export const {
    selectById: selectItemById,
    selectIds: selectItemIds,
    selectAll: selectAllItems,
} = itemAdapter.getSelectors((state) => state.pageSectionsApp.pageSectionsApp)

export const selectCurrentPage = ({ pageSectionsApp }) => {
    return pageSectionsApp.pageSectionsApp.currentPage
}
export const selectTotalPage = ({ pageSectionsApp }) => {
    return pageSectionsApp.pageSectionsApp.totalPage
};
export const selectPerPage = ({ pageSectionsApp }) => {
    return pageSectionsApp.pageSectionsApp.totalPage
};
export const selectHasDraftItem = ({ pageSectionsApp }) => {
    return pageSectionsApp.pageSectionsApp.hasDraftItem
};

export default slice.reducer;
