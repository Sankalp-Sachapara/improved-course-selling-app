import axios from 'axios';
import { getAuthToken, removeAuthToken, removeRefreshToken } from '../utils/tokenUtils';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle token expiration
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === 'Token expired' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_URL || ''}/api/admin/refresh-token`,
          {
            refreshToken: localStorage.getItem('refreshToken'),
          }
        );

        const { token } = refreshResponse.data.data;
        
        // Update token in localStorage
        localStorage.setItem('token', token);
        
        // Update Authorization header in original request
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        
        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, logout user
        removeAuthToken();
        removeRefreshToken();
        
        // Show error message
        toast.error('Your session has expired. Please log in again.');
        
        // Redirect to login page
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      }
    }

    // Default error handling
    const errorMessage = error.response?.data?.message || 'Something went wrong';
    
    // Only show toast for non-refresh-token related errors
    if (!originalRequest || !originalRequest._retry) {
      toast.error(errorMessage);
    }
    
    return Promise.reject(error);
  }
);

export default api;
