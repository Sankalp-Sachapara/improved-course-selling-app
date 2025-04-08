import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

import authService from '../../services/authService';
import { setLoading, clearLoading } from './uiSlice';

// Helper functions for token management
const getTokens = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return { accessToken, refreshToken };
};

const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

// Get user info from token
const getUserFromToken = (token) => {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.name,
    };
  } catch (error) {
    return null;
  }
};

// Async actions
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Logging in...'));
      const response = await authService.login(userData);
      setTokens(response.accessToken, response.refreshToken);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to log in. Please try again.';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Creating your account...'));
      const response = await authService.register(userData);
      setTokens(response.accessToken, response.refreshToken);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      const { refreshToken } = getTokens();
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      clearTokens();
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const { accessToken, refreshToken } = getTokens();
      
      if (!refreshToken) {
        return rejectWithValue('No refresh token available');
      }
      
      if (!isTokenExpired(accessToken)) {
        return { accessToken, refreshToken, user: getUserFromToken(accessToken) };
      }
      
      const response = await authService.refreshToken(refreshToken);
      setTokens(response.accessToken, response.refreshToken);
      return response;
    } catch (error) {
      clearTokens();
      return rejectWithValue('Session expired. Please login again.');
    }
  }
);

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = getUserFromToken(action.payload.accessToken);
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = getUserFromToken(action.payload.accessToken);
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = getUserFromToken(action.payload.accessToken);
        state.error = null;
        state.isInitialized = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        state.isInitialized = true;
      });
  },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;