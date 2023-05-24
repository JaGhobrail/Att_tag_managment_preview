import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";



export const fetchQuestions = createAsyncThunk(
    'question/fetchQuestions',
    async () => {
        const token = Cookies.get('token');
        const response = await axios({
            url: `http://localhost/api/vendor-list`,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

export const addQuestion = createAsyncThunk(
    'question/addQuestion',
    async (question) => {
        const token = Cookies.get('token');
        const response = await axios(
            {
                url: `http://localhost/api/vendor-list`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: { question }
            });
        console.log(response.data.data)
        return response.data.data;
    }
);
export const updateQuestion = createAsyncThunk(
    'question/updateQuestion',
    async ({ id, question }) => {
        const token = Cookies.get('token');
        const response = await axios(
            {
                url: 'http://localhost/api/vendor-list/' + id,
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: { question }
            }
        );
        return response.data;
    }
);

export const deleteQuestion = createAsyncThunk(
    'question/deleteQuestion',
    async (id) => {
        const response = await axios.delete('http://localhost/api/vendor-list/' + id);
        return id;
    }
);

export const fetchQuestionById = createAsyncThunk(
    'question/fetchQuestionById',
    async (id) => {
        const response = await axios.get(`/api/questions/${id}`);
        return response.data;
    }
);

const investigationSlice = createSlice({
    name: 'investigation',
    initialState: {
        questions: [],
        status: 'idle',
        error: null,
        selectedQuestion: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questions = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addQuestion.fulfilled, (state, action) => {
                state.questions.unshift(action.payload);
                toast.success('Question Added!');
            })
            .addCase(updateQuestion.fulfilled, (state, action) => {
                toast.success('Question updated!');
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                const deletedQuestionId = action.payload;

                state.questions = state.questions.filter(question => question._id !== deletedQuestionId);
                toast.success('Question Deleted!');
            })
            .addCase(fetchQuestionById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuestionById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedQuestion = action.payload;
            })
            .addCase(fetchQuestionById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

    },
});

export default investigationSlice.reducer;
