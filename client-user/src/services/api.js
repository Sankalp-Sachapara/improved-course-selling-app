import axios from 'axios';
import { store } from '../store';
import { refreshToken, logout } from '../store/slices/authSlice';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is unauthorized and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Check if we have a refresh token
        const refreshTokenValue = localStorage.getItem('refreshToken');
        
        if (!refreshTokenValue) {
          // No refresh token, logout
          store.dispatch(logout());
          return Promise.reject(error);
        }
        
        // Try to refresh the token
        const refreshResult = await store.dispatch(refreshToken());
        
        if (refreshResult.type === 'auth/refreshToken/fulfilled') {
          // Update the authorization header
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
          return api(originalRequest);
        } else {
          // Refresh failed, logout
          store.dispatch(logout());
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Refresh failed, logout
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;