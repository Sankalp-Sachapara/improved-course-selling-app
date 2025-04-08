import api from './api';

const API_URL = '/api/courses';
const USER_COURSES_URL = '/api/users/courses';

// Get all published courses with optional filters
const getCourses = async (filters = {}) => {
  let url = `${API_URL}?`;
  
  if (filters.page) url += `page=${filters.page}&`;
  if (filters.limit) url += `limit=${filters.limit}&`;
  if (filters.search) url += `search=${encodeURIComponent(filters.search)}&`;
  if (filters.category) url += `category=${encodeURIComponent(filters.category)}&`;
  if (filters.sort) url += `sort=${filters.sort}&`;
  
  return await api.get(url);
};

// Get a single course by ID
const getCourseById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

// Get all courses purchased by the user
const getMyCourses = async () => {
  return await api.get(USER_COURSES_URL);
};

// Get course content (lessons, sections) for a purchased course
const getCourseContent = async (courseId) => {
  return await api.get(`${USER_COURSES_URL}/${courseId}/content`);
};

// Update lesson progress
const updateLessonProgress = async (courseId, lessonId, progress) => {
  return await api.post(`${USER_COURSES_URL}/${courseId}/lessons/${lessonId}/progress`, { progress });
};

// Rate and review a course
const rateCourse = async (courseId, { rating, review }) => {
  return await api.post(`${USER_COURSES_URL}/${courseId}/rate`, { rating, review });
};

// Get course categories
const getCategories = async () => {
  return await api.get(`${API_URL}/categories`);
};

// Mark lesson as complete
const markLessonComplete = async (courseId, lessonId) => {
  return await api.post(`${USER_COURSES_URL}/${courseId}/lessons/${lessonId}/complete`);
};

// Get course progress statistics
const getCourseProgress = async (courseId) => {
  return await api.get(`${USER_COURSES_URL}/${courseId}/progress`);
};

// Get featured courses
const getFeaturedCourses = async () => {
  return await api.get(`${API_URL}/featured`);
};

// Get newest courses
const getNewestCourses = async (limit = 5) => {
  return await api.get(`${API_URL}/newest?limit=${limit}`);
};

// Get popular courses
const getPopularCourses = async (limit = 5) => {
  return await api.get(`${API_URL}/popular?limit=${limit}`);
};

const courseService = {
  getCourses,
  getCourseById,
  getMyCourses,
  getCourseContent,
  updateLessonProgress,
  rateCourse,
  getCategories,
  markLessonComplete,
  getCourseProgress,
  getFeaturedCourses,
  getNewestCourses,
  getPopularCourses,
};

export default courseService;