import axios from 'axios';

export const loginAPI = async (credentials) => {
  try {
    const response = await axios.post('http://localhost/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const logoutAPI = async () => {
  try {
    await axios.post('http://localhost/api/auth/logout');
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const registerAPI = async (userInfo) => {
  try {
    const response = await axios.post('http://localhost/api/auth/register', userInfo);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
