import express from 'express';
import { register, login, getProfile, updateProfile, changePassword, refreshToken } from '../controllers/admin.controller.js';
import { authenticateJwt, authorizeAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

// Protected routes
router.get('/profile', authenticateJwt, authorizeAdmin, getProfile);
router.put('/profile', authenticateJwt, authorizeAdmin, updateProfile);
router.post('/change-password', authenticateJwt, authorizeAdmin, changePassword);

export default router;
