import axios from 'axios';
import { userStore } from './useStore';

export const api = axios.create({
  baseURL: 'http://localhost:1337/api',
});

export const signup = async (username, email, password) => {
  try {
    const response = await api.post('/auth/local/register', {
      username,
      email,
      password,
    });
    localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('user',JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const login = async (identifier, password) => {
  try {
    const response = await api.post('/auth/local', {
      identifier,
      password,
    });

    localStorage.setItem('token', response.data.jwt);
    localStorage.setItem('user',JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
};
