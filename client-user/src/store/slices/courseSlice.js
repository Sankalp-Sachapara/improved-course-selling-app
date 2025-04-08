import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import courseService from '../../services/courseService';
import { setLoading, clearLoading } from './uiSlice';

// Async actions
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (filters, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Loading courses...'));
      const response = await courseService.getCourses(filters);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch courses';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (courseId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Loading course details...'));
      const response = await courseService.getCourseById(courseId);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch course details';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

export const fetchMyCourses = createAsyncThunk(
  'courses/fetchMyCourses',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Loading your courses...'));
      const response = await courseService.getMyCourses();
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch your courses';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

export const fetchCourseContent = createAsyncThunk(
  'courses/fetchCourseContent',
  async (courseId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Loading course content...'));
      const response = await courseService.getCourseContent(courseId);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch course content';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

export const updateProgress = createAsyncThunk(
  'courses/updateProgress',
  async ({ courseId, lessonId, progress }, { dispatch, rejectWithValue }) => {
    try {
      const response = await courseService.updateLessonProgress(courseId, lessonId, progress);
      toast.success('Progress updated');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update progress';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const rateCourse = createAsyncThunk(
  'courses/rateCourse',
  async ({ courseId, rating, review }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading('Submitting your review...'));
      const response = await courseService.rateCourse(courseId, { rating, review });
      toast.success('Review submitted successfully');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit review';
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      dispatch(clearLoading());
    }
  }
);

// Initial state
const initialState = {
  courses: [],
  myCourses: [],
  courseDetails: null,
  courseContent: null,
  currentLesson: null,
  isLoading: false,
  error: null,
  totalCourses: 0,
  filters: {
    page: 1,
    limit: 10,
    search: '',
    category: '',
    sort: 'newest',
  },
};

// Courses slice
const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setCurrentLesson: (state, action) => {
      state.currentLesson = action.payload;
    },
    clearCourseDetails: (state) => {
      state.courseDetails = null;
    },
    clearCourseContent: (state) => {
      state.courseContent = null;
      state.currentLesson = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload.courses;
        state.totalCourses = action.payload.total;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseDetails = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myCourses = action.payload;
      })
      .addCase(fetchMyCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCourseContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseContent = action.payload;
        // Set first lesson as current if none is selected
        if (!state.currentLesson && action.payload.sections.length > 0) {
          const firstSection = action.payload.sections[0];
          if (firstSection.lessons.length > 0) {
            state.currentLesson = firstSection.lessons[0];
          }
        }
      })
      .addCase(fetchCourseContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        // Update the progress in the course content
        if (state.courseContent) {
          const { lessonId, progress } = action.payload;
          state.courseContent.sections.forEach(section => {
            section.lessons.forEach(lesson => {
              if (lesson._id === lessonId) {
                lesson.progress = progress;
              }
            });
          });

          // Update current lesson if it's the one being updated
          if (state.currentLesson && state.currentLesson._id === lessonId) {
            state.currentLesson.progress = progress;
          }
        }
      })
      .addCase(rateCourse.fulfilled, (state, action) => {
        // Update the course rating in course details
        if (state.courseDetails) {
          state.courseDetails.ratings = action.payload.ratings;
          state.courseDetails.averageRating = action.payload.averageRating;
        }
      });
  },
});

export const {
  setFilters,
  resetFilters,
  setCurrentLesson,
  clearCourseDetails,
  clearCourseContent,
} = courseSlice.actions;

export default courseSlice.reducer;