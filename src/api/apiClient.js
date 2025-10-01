// src/api/apiClient.js
//
// Axios instance configured with baseURL from env and interceptors to attach JWT.

import axios from 'axios';


const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1';


const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});


// Attach token if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Simple response/error interceptor (global handling)
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    // You can standardize error handling here (e.g., redirect on 401)
    return Promise.reject(err);
  }
);


export default apiClient;
