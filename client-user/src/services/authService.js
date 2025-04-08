import axios from 'axios';
import api from './api';

const API_URL = '/api/users';

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Logout user
const logout = async (refreshToken) => {
  const response = await api.post(`${API_URL}/logout`, { refreshToken });
  return response.data;
};

// Refresh token
const refreshToken = async (refreshToken) => {
  const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
  return response.data;
};

// Verify email
const verifyEmail = async (token) => {
  const response = await axios.post(`${API_URL}/verify-email/${token}`);
  return response.data;
};

// Request password reset
const requestPasswordReset = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

// Reset password
const resetPassword = async (token, password) => {
  const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  refreshToken,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
};

export default authService;