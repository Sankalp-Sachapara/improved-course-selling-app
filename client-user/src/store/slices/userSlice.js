import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import userService from '../../services/userService';
import { setLoading, clearLoading } from './uiSlice';

// Async actions
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Loading profile...'));
      const response = await userService.getUserProfile();
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch profile';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Updating profile...'));
      const response = await userService.updateUserProfile(userData);
      toast.success('Profile updated successfully');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  'user/updateUserPassword',
  async (passwordData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Updating password...'));
      await userService.updateUserPassword(passwordData);
      toast.success('Password updated successfully');
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update password';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

export const fetchPaymentHistory = createAsyncThunk(
  'user/fetchPaymentHistory',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Loading payment history...'));
      const response = await userService.getPaymentHistory();
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch payment history';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  'user/requestPasswordReset',
  async (email, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Sending password reset email...'));
      await userService.requestPasswordReset(email);
      toast.success('Password reset email sent. Please check your inbox.');
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send password reset email';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ token, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Resetting password...'));
      await userService.resetPassword(token, password);
      toast.success('Password reset successfully. You can now login with your new password.');
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to reset password';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

// Initial state
const initialState = {
  profile: null,
  paymentHistory: [],
  isLoading: false,
  isPasswordResetRequested: false,
  isPasswordReset: false,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
    },
    resetPasswordState: (state) => {
      state.isPasswordResetRequested = false;
      state.isPasswordReset = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchPaymentHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentHistory = action.payload;
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestPasswordReset.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.isLoading = false;
        state.isPasswordResetRequested = true;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isPasswordReset = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile, resetPasswordState } = userSlice.actions;

export default userSlice.reducer;