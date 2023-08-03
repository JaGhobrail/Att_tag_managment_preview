import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';

export const getItems = createAsyncThunk('trackersApp/getItems', async (params) => {
    const response = await axios.get('/api/trackers', { params });
    const data = await response.data;
    return { data: data.data.data, currentPage: 1, totalPage: 100, date: '43343' };
});


export const insertDraft = createAsyncThunk('trackersApp/insertDraft', async ({ data, itemId }) => {
    const response = await axios.post(`/api/trackers/${itemId}/drafts`, data);
    return { itemId, data: response.data.data };
});

export const insertNote = createAsyncThunk('trackersApp/insertNote', async ({ data, itemId }) => {
    const response = await axios.post(`/api/trackers/${itemId}/notes`, data);
    return { itemId, data: response.data.data };
});

export const deleteNote = createAsyncThunk('trackersApp/deleteNote', async ({ id, itemId }) => {
    await axios.delete(`/api/notes/${id}`);
    return { id, itemId };
});

export const deleteDraft = createAsyncThunk('trackersApp/deleteDraft', async ({ id, itemId }) => {
    await axios.delete(`/api/drafts/${id}`);
    return { id, itemId };
});

export const saveAllDrafts = createAsyncThunk('trackersApp/saveAllDrafts', async () => {
    const response = await axios.post(`/api/trackers/save-all-drafts`);
    return response.data
});

export const clearAllDrafts = createAsyncThunk('trackersApp/clearAllDrafts', async () => {
    const response = await axios.post(`/api/trackers/clear-all-drafts`);
    return response.data
});

// Route::get('tracker-domain-name', [PageSectListController::class, 'getTrackerDomainNames']);
// Route::get('page-domain-name', [PageSectListController::class, 'getPageSectionsNames']);


export const getPageDomainNames = createAsyncThunk('trackersApp/getPageDomainNames', async () => {
    const response = await axios.get(`/api/tracker-domain-name`);
    return Object.values(response.data.data);
});

export const getPageSectionsNames = createAsyncThunk('trackersApp/getPageSectionsNames', async (tracker_domain) => {
    const response = await axios.get(`/api/page-domain-name`, { params: { tracker_domain } });
    return response.data.data
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
    hasDraftItem: false,
    pageSectionsNames: [],
    pageDomainNames: []

})

const slice = createSlice({
    name: 'trackersApp',
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
        [getPageDomainNames.fulfilled]: (state, action) => {
            state.pageDomainNames = action.payload
        },
        [getPageSectionsNames.fulfilled]: (state, action) => {
            state.pageSectionsNames = action.payload
        }


        // getPageSectionsNames
        // pageDomainNames
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
export const select = ({ trackersApp }) => {
    return trackersApp.trackersApp.hasDraftItem
};

export const selectPageSectionsNames = ({ trackersApp }) => {
    return trackersApp.trackersApp.pageSectionsNames
};
export const selectPageDomainNames = ({ trackersApp }) => {
    return trackersApp.trackersApp.pageDomainNames
};


export default slice.reducer;
