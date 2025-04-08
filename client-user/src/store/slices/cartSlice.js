import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import paymentService from '../../services/paymentService';
import { setLoading, clearLoading } from './uiSlice';

// Helper functions for cart management
const getCartFromStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Async actions
export const createCheckoutSession = createAsyncThunk(
  'cart/createCheckoutSession',
  async (courseId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Creating checkout session...'));
      const response = await paymentService.createCheckoutSession(courseId);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create checkout session';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'cart/verifyPayment',
  async (sessionId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Verifying payment...'));
      const response = await paymentService.verifyPayment(sessionId);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to verify payment';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

// Initial state
const initialState = {
  items: getCartFromStorage(),
  checkoutSession: null,
  paymentStatus: null,
  isLoading: false,
  error: null,
};

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const courseExists = state.items.some(item => item._id === action.payload._id);
      if (!courseExists) {
        state.items.push(action.payload);
        saveCartToStorage(state.items);
        toast.success('Course added to cart');
      } else {
        toast.error('Course is already in your cart');
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      saveCartToStorage(state.items);
      toast.success('Course removed from cart');
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
    resetCheckout: (state) => {
      state.checkoutSession = null;
      state.paymentStatus = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checkoutSession = action.payload;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentStatus = action.payload;
        
        // If payment successful, remove the purchased course from cart
        if (action.payload.status === 'success' && action.payload.courseId) {
          state.items = state.items.filter(item => item._id !== action.payload.courseId);
          saveCartToStorage(state.items);
        }
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  resetCheckout,
} = cartSlice.actions;

export default cartSlice.reducer;