// Token storage keys
const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * Gets the authentication token from local storage
 * @returns {string|null} The auth token or null if not found
 */
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Sets the authentication token in local storage
 * @param {string} token - The auth token to store
 */
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Removes the authentication token from local storage
 */
export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Gets the refresh token from local storage
 * @returns {string|null} The refresh token or null if not found
 */
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Sets the refresh token in local storage
 * @param {string} token - The refresh token to store
 */
export const setRefreshToken = (token) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

/**
 * Removes the refresh token from local storage
 */
export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Checks if the user is authenticated (has a token)
 * @returns {boolean} True if the user is authenticated
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Clears all auth-related tokens from local storage
 */
export const clearAuthTokens = () => {
  removeAuthToken();
  removeRefreshToken();
};
