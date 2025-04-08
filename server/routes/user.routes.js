import express from 'express';
import { 
  register, 
  login, 
  getProfile, 
  updateProfile, 
  changePassword, 
  getPurchasedCourses,
  purchaseCourse,
  refreshToken
} from '../controllers/user.controller.js';
import { authenticateJwt, authorizeUser } from '../middleware/auth.middleware.js';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

// Protected routes
router.get('/profile', authenticateJwt, authorizeUser, getProfile);
router.put('/profile', authenticateJwt, authorizeUser, updateProfile);
router.post('/change-password', authenticateJwt, authorizeUser, changePassword);
router.get('/courses', authenticateJwt, authorizeUser, getPurchasedCourses);
router.post('/courses/:courseId/purchase', authenticateJwt, authorizeUser, purchaseCourse);

export default router;
