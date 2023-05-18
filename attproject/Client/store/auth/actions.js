import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  RESET_SIGNUP_SUCCESS,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
} from "./types";


import Cookies from "js-cookie";
import { toast } from 'react-toastify';

// Action creators
// Signup
export const signup =
  ( email, password, confirmPassword) =>
  async (dispatch) => {
    const body = JSON.stringify({
      email,
      password,
      confirmPassword,
    });

    dispatch({
      type: SET_AUTH_LOADING,
    });

    try {
      const res = await fetch("http://localhost/api/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (res.status === 201) {
        dispatch({
          type: SIGNUP_SUCCESS,
        });
      } else {
        dispatch({
          type: SIGNUP_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
    }
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const reset_signup_success = () => (dispatch) => {
  dispatch({
    type: RESET_SIGNUP_SUCCESS,
  });
};

//Login
export const login = (email, password) => async (dispatch) => {
  const body = JSON.stringify({
    email,
    password,
  });

  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch("http://localhost/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" ,
        "Accept" : "application/json",
      },
      body: body,
    });

    if (res.status === 200) {
      const data = await res.json();

      Cookies.set('token',data.data.access_token)
      
      dispatch({
        type: LOGIN_SUCCESS,
      });
      dispatch(load_user());
      toast.success('Login success!');
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const load_user = () => async (dispatch) => {
  try {
    const token = Cookies.get('token');
    const res = await fetch("http://localhost/api/auth/me", {
      method: "GET",
      headers: {
          "Content-Type": "application/json" ,
          "Accept" : "application/json",
          Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: LOAD_USER_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL,
    });
  }
};



export const check_auth_status = () => async (dispatch) => {
  try {
    const token = Cookies.get('token');

    const res = await fetch("http://localhost/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" ,
        "Accept" : "application/json",
          Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      const data = await res.json();

      Cookies.set('token',data.data.access_token)
      dispatch({
        type: AUTHENTICATED_SUCCESS,
      });
      dispatch(load_user());
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};


export const request_refresh = () => async dispatch => {
  try {
    const token = Cookies.get('token');

      const res = await fetch('http://localhost/api/auth/refresh', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json" ,
            "Accept" : "application/json",
              Authorization: `Bearer ${token}`,
          }
      });

      if (res.status === 200) {
          const data = await res.json();

          Cookies.set('token',data.data.access_token)

          dispatch({
              type: REFRESH_SUCCESS
          });
          dispatch(check_auth_status());
      } else {
          dispatch({
              type: REFRESH_FAIL
          });
      }
  } catch(err) {
      dispatch({
          type: REFRESH_FAIL
      });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const token = Cookies.get('token');
    
    const res = await fetch("http://localhost/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" ,
        "Accept" : "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (res.status === 200) {
      Cookies.remove('token')
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      toast.success('Logout success!');
    } else {
      dispatch({
        type: LOGOUT_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};

