import axios from 'axios';

// Create an axios instance
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the token to the headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers['Cookie'] = `jwt=${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
