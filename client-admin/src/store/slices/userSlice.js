import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

// Async thunks
export const fetchStudents = createAsyncThunk(
  'users/fetchStudents',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/admin/students', { params });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
    }
  }
);

export const fetchStudentById = createAsyncThunk(
  'users/fetchStudentById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/admin/students/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch student details');
    }
  }
);

export const fetchStudentEnrollments = createAsyncThunk(
  'users/fetchStudentEnrollments',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/admin/students/${id}/enrollments`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch student enrollments');
    }
  }
);

export const getStudentStats = createAsyncThunk(
  'users/getStudentStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/admin/students/stats');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch student statistics');
    }
  }
);

// Slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    students: [],
    currentStudent: null,
    enrollments: [],
    stats: {
      totalStudents: 0,
      newStudentsThisMonth: 0,
      activeStudents: 0,
      averageCoursesPerStudent: 0
    },
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      pages: 1
    },
    loading: false,
    error: null
  },
  reducers: {
    resetUserError: (state) => {
      state.error = null;
    },
    resetCurrentStudent: (state) => {
      state.currentStudent = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.students;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch student by ID
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch student enrollments
      .addCase(fetchStudentEnrollments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload;
      })
      .addCase(fetchStudentEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get student stats
      .addCase(getStudentStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getStudentStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetUserError, resetCurrentStudent } = userSlice.actions;

export default userSlice.reducer;
