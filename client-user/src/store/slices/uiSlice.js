import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  loadingMessage: '',
  notification: null,
  isSidebarOpen: false,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = true;
      state.loadingMessage = action.payload || 'Loading...';
    },
    clearLoading: (state) => {
      state.isLoading = false;
      state.loadingMessage = '';
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarState: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  setLoading,
  clearLoading,
  setNotification,
  clearNotification,
  toggleSidebar,
  setSidebarState,
  toggleTheme,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;