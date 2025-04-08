import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';
import logger from '../utils/logger.js';

// Authenticate JWT token
export const authenticateJwt = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(createError(401, 'No token provided'));
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return next(createError(401, 'No token provided'));
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return next(createError(401, 'Token expired'));
        }
        return next(createError(401, 'Invalid token'));
      }
      
      req.user = decoded;
      next();
    });
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    next(createError(500, 'Authentication error'));
  }
};

// Optional authentication - doesn't require auth but will use it if provided
export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return next();
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (!err) {
        req.user = decoded;
      }
      next();
    });
  } catch (error) {
    // Just continue without authentication
    next();
  }
};

// Authorize admin
export const authorizeAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return next(createError(401, 'Authentication required'));
    }
    
    if (req.user.role !== 'admin') {
      return next(createError(403, 'Admin access required'));
    }
    
    next();
  } catch (error) {
    logger.error(`Admin authorization error: ${error.message}`);
    next(createError(500, 'Authorization error'));
  }
};

// Authorize user
export const authorizeUser = (req, res, next) => {
  try {
    if (!req.user) {
      return next(createError(401, 'Authentication required'));
    }
    
    if (req.user.role !== 'user') {
      return next(createError(403, 'User access required'));
    }
    
    next();
  } catch (error) {
    logger.error(`User authorization error: ${error.message}`);
    next(createError(500, 'Authorization error'));
  }
};

// Authorize any authenticated user (admin or regular user)
export const authorizeAny = (req, res, next) => {
  try {
    if (!req.user) {
      return next(createError(401, 'Authentication required'));
    }
    
    if (req.user.role !== 'user' && req.user.role !== 'admin') {
      return next(createError(403, 'Access denied'));
    }
    
    next();
  } catch (error) {
    logger.error(`Authorization error: ${error.message}`);
    next(createError(500, 'Authorization error'));
  }
};
