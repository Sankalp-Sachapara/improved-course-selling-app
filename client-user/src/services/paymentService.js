import api from './api';

const API_URL = '/api/payments';

// Create checkout session for a course
const createCheckoutSession = async (courseId) => {
  return await api.post(`${API_URL}/checkout/${courseId}`);
};

// Verify payment status after checkout
const verifyPayment = async (sessionId) => {
  return await api.get(`${API_URL}/session/${sessionId}`);
};

// Get payment history
const getPaymentHistory = async () => {
  return await api.get(`${API_URL}/history`);
};

// Get payment details by ID
const getPaymentDetails = async (paymentId) => {
  return await api.get(`${API_URL}/${paymentId}`);
};

// Cancel subscription (if applicable)
const cancelSubscription = async (subscriptionId) => {
  return await api.post(`${API_URL}/subscriptions/${subscriptionId}/cancel`);
};

// Request invoice for a payment
const requestInvoice = async (paymentId) => {
  return await api.post(`${API_URL}/${paymentId}/invoice`);
};

const paymentService = {
  createCheckoutSession,
  verifyPayment,
  getPaymentHistory,
  getPaymentDetails,
  cancelSubscription,
  requestInvoice,
};

export default paymentService;