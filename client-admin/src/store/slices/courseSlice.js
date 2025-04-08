import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

// Async thunks
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/courses', { params });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses');
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/courses/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch course details');
    }
  }
);

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (courseData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      
      // Handle file upload
      if (courseData.imageFile) {
        formData.append('image', courseData.imageFile);
        delete courseData.imageFile;
      }
      
      // Add rest of the data
      Object.keys(courseData).forEach(key => {
        if (key === 'chapters' || key === 'learningOutcomes' || key === 'prerequisites' || key === 'tags') {
          formData.append(key, JSON.stringify(courseData[key]));
        } else {
          formData.append(key, courseData[key]);
        }
      });
      
      const response = await api.post('/api/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create course');
    }
  }
);

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      
      // Handle file upload
      if (courseData.imageFile) {
        formData.append('image', courseData.imageFile);
        delete courseData.imageFile;
      }
      
      // Add rest of the data
      Object.keys(courseData).forEach(key => {
        if (key === 'chapters' || key === 'learningOutcomes' || key === 'prerequisites' || key === 'tags') {
          formData.append(key, JSON.stringify(courseData[key]));
        } else {
          formData.append(key, courseData[key]);
        }
      });
      
      const response = await api.put(`/api/courses/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return { id, course: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update course');
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/courses/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete course');
    }
  }
);

export const uploadImage = createAsyncThunk(
  'courses/uploadImage',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/api/courses/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload image');
    }
  }
);

// Slice
const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    currentCourse: null,
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      pages: 1
    },
    loading: false,
    error: null,
    imageUploadUrl: null,
    imageFile: null
  },
  reducers: {
    setImageFile: (state, action) => {
      state.imageFile = action.payload;
    },
    clearImageFile: (state) => {
      state.imageFile = null;
    },
    resetCourseError: (state) => {
      state.error = null;
    },
    resetCurrentCourse: (state) => {
      state.currentCourse = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create course
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.unshift(action.payload);
        state.pagination.total += 1;
        toast.success('Course created successfully');
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update course
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        
        // Update in courses list
        const index = state.courses.findIndex(course => course._id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload.course;
        }
        
        // Update current course
        if (state.currentCourse && state.currentCourse._id === action.payload.id) {
          state.currentCourse = action.payload.course;
        }
        
        toast.success('Course updated successfully');
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete course
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter(course => course._id !== action.payload);
        state.pagination.total -= 1;
        
        // Reset current course if it's the deleted one
        if (state.currentCourse && state.currentCourse._id === action.payload) {
          state.currentCourse = null;
        }
        
        toast.success('Course deleted successfully');
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Upload image
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUploadUrl = action.payload.imageUrl;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setImageFile, clearImageFile, resetCourseError, resetCurrentCourse } = courseSlice.actions;

export default courseSlice.reducer;
