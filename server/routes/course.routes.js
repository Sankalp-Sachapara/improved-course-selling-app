import express from 'express';
import { 
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAdminCourses,
  getCourseAnalytics
} from '../controllers/course.controller.js';
import { authenticateJwt, authorizeAdmin, optionalAuth } from '../middleware/auth.middleware.js';
import { uploadCourseImage } from '../middleware/upload.middleware.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getAllCourses);
router.get('/:id', optionalAuth, getCourseById);

// Admin routes
router.post('/', authenticateJwt, authorizeAdmin, uploadCourseImage, createCourse);
router.put('/:id', authenticateJwt, authorizeAdmin, uploadCourseImage, updateCourse);
router.delete('/:id', authenticateJwt, authorizeAdmin, deleteCourse);
router.get('/admin/all', authenticateJwt, authorizeAdmin, getAdminCourses);
router.get('/admin/:id/analytics', authenticateJwt, authorizeAdmin, getCourseAnalytics);

export default router;
