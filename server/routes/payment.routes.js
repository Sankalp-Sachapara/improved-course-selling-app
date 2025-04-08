import express from 'express';
import { 
  createCheckoutSession,
  handleWebhook,
  getPaymentStatus,
  getPaymentHistory
} from '../controllers/payment.controller.js';
import { authenticateJwt, authorizeUser } from '../middleware/auth.middleware.js';
import { rawBodyParser } from '../middleware/stripe.middleware.js';

const router = express.Router();

// Payment routes
router.post('/checkout/:courseId', authenticateJwt, authorizeUser, createCheckoutSession);
router.get('/session/:sessionId', authenticateJwt, authorizeUser, getPaymentStatus);
router.get('/history', authenticateJwt, authorizeUser, getPaymentHistory);

// Webhook route - no authentication needed, secured by Stripe signature
router.post('/webhook', rawBodyParser, handleWebhook);

export default router;
