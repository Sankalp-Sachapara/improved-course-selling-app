import api from './api';

const API_URL = '/api/users';

// Get user profile
const getUserProfile = async () => {
  return await api.get(`${API_URL}/profile`);
};

// Update user profile
const updateUserProfile = async (userData) => {
  return await api.put(`${API_URL}/profile`, userData);
};

// Update user password
const updateUserPassword = async (passwordData) => {
  return await api.put(`${API_URL}/password`, passwordData);
};

// Get payment history
const getPaymentHistory = async () => {
  return await api.get(`${API_URL}/payments`);
};

// Request password reset
const requestPasswordReset = async (email) => {
  return await api.post(`${API_URL}/forgot-password`, { email });
};

// Reset password with token
const resetPassword = async (token, password) => {
  return await api.post(`${API_URL}/reset-password/${token}`, { password });
};

// Upload profile picture
const uploadProfilePicture = async (formData) => {
  return await api.post(`${API_URL}/profile/picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Get user notifications
const getNotifications = async () => {
  return await api.get(`${API_URL}/notifications`);
};

// Mark notification as read
const markNotificationAsRead = async (notificationId) => {
  return await api.put(`${API_URL}/notifications/${notificationId}/read`);
};

// Mark all notifications as read
const markAllNotificationsAsRead = async () => {
  return await api.put(`${API_URL}/notifications/read-all`);
};

// Delete notification
const deleteNotification = async (notificationId) => {
  return await api.delete(`${API_URL}/notifications/${notificationId}`);
};

// Get user wishlist
const getWishlist = async () => {
  return await api.get(`${API_URL}/wishlist`);
};

// Add course to wishlist
const addToWishlist = async (courseId) => {
  return await api.post(`${API_URL}/wishlist/${courseId}`);
};

// Remove course from wishlist
const removeFromWishlist = async (courseId) => {
  return await api.delete(`${API_URL}/wishlist/${courseId}`);
};

const userService = {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  getPaymentHistory,
  requestPasswordReset,
  resetPassword,
  uploadProfilePicture,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};

export default userService;