import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    drawerOpen: false,
    darkMode: localStorage.getItem('darkMode') === 'true',
    notifications: [],
    searchQuery: '',
    filters: {
      courses: {
        category: '',
        level: '',
        price: [0, 1000],
        sort: 'createdAt:desc',
      },
      students: {
        status: 'all',
        sort: 'createdAt:desc',
      },
    },
    pagination: {
      courses: {
        page: 1,
        limit: 10,
      },
      students: {
        page: 1,
        limit: 10,
      },
    },
  },
  reducers: {
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    setDrawerOpen: (state, action) => {
      state.drawerOpen = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', action.payload);
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
        read: false,
        createdAt: new Date().toISOString(),
      });
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.read = true;
      });
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilter: (state, action) => {
      const { entity, filterName, value } = action.payload;
      state.filters[entity][filterName] = value;
      
      // Reset pagination when filters change
      state.pagination[entity].page = 1;
    },
    resetFilters: (state, action) => {
      const { entity } = action.payload;
      
      if (entity === 'courses') {
        state.filters.courses = {
          category: '',
          level: '',
          price: [0, 1000],
          sort: 'createdAt:desc',
        };
      } else if (entity === 'students') {
        state.filters.students = {
          status: 'all',
          sort: 'createdAt:desc',
        };
      }
      
      // Reset pagination
      state.pagination[entity].page = 1;
    },
    setPage: (state, action) => {
      const { entity, page } = action.payload;
      state.pagination[entity].page = page;
    },
    setLimit: (state, action) => {
      const { entity, limit } = action.payload;
      state.pagination[entity].limit = limit;
      
      // Reset page when changing limit
      state.pagination[entity].page = 1;
    },
  },
});

export const {
  toggleDrawer,
  setDrawerOpen,
  toggleDarkMode,
  setDarkMode,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearNotifications,
  setSearchQuery,
  setFilter,
  resetFilters,
  setPage,
  setLimit,
} = uiSlice.actions;

export default uiSlice.reducer;
