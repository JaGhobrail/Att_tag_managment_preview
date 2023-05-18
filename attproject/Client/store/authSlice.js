import { createSlice } from '@reduxjs/toolkit';
import { loginAPI, logoutAPI, registerAPI } from '../utils/auth';
import Cookies from "js-cookie";
const initialState = {
  user: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.error = null;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    setError(state, action) {
      state.user = null;
      state.error = action.payload;
      state.isLoading = false;
      state.isLoggedIn = false;
    },
    setLoading(state) {
      state.isLoading = true;
    },
    setLoggedOut(state) {
      state.user = null;
      state.error = null;
      state.isLoading = false;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, setError, setLoading, setLoggedOut } = authSlice.actions;

// Async thunks
export const login = (credentials) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const data = await loginAPI(credentials);

    Cookies.set('token',data.token)
    dispatch(setUser(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    await logoutAPI();
    dispatch(setLoggedOut());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const register = (userData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const user = await registerAPI(userData);
    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default authSlice.reducer;
