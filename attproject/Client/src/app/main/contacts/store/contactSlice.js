import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '@history';
import ContactModel from '../model/ContactModel';


export const getItems = createAsyncThunk(
    'users/getItems',
    async (id, { dispatch, getState }) => {
        try {
            const response = await axios.get(`/api/users/${id}`);

            const data = await response.data;

            return data;
        } catch (error) {
            history.push({ pathname: `/users` });

            return null;
        }
    }
);

export const getContact = createAsyncThunk(
    'usersApp/task/getContact',
    async (id, { dispatch, getState }) => {
        try {
            const response = await axios.get(`/api/users/${id}`);

            const data = await response.data;

            return data.data;
        } catch (error) {
            history.push({ pathname: `/users` });

            return null;
        }
    }
);

export const addContact = createAsyncThunk(
    'usersApp/contacts/addContact',
    async (contact, { dispatch, getState }) => {
        console.log('====================================');
        console.log(contact);
        console.log('====================================');
        const response = await axios.post('/api/users', contact);

        const data = await response.data;

        return data.data;
    }
);

export const updateContact = createAsyncThunk(
    'usersApp/contacts/updateContact',
    async (contact, { dispatch, getState }) => {
        const response = await axios.put(`/api/contacts/${contact.id}`, contact);

        const data = await response.data;

        return data;
    }
);

export const removeContact = createAsyncThunk(
    'usersApp/contacts/removeContact',
    async (id, { dispatch, getState }) => {
        const response = await axios.delete(`/api/contacts/${id}`);

        await response.data;

        return id;
    }
);

export const selectContact = ({ usersApp }) => usersApp.user;

const contactSlice = createSlice({
    name: 'usersApp/contact',
    initialState: null,
    reducers: {
        newContact: (state, action) => ContactModel(),
        resetContact: () => null,
    },
    extraReducers: {
        [getContact.pending]: (state, action) => null,
        [getContact.fulfilled]: (state, action) => action.payload,
        [updateContact.fulfilled]: (state, action) => action.payload,
        [removeContact.fulfilled]: (state, action) => null,
    },
});

export const { resetContact, newContact } = contactSlice.actions;

export default contactSlice.reducer;
