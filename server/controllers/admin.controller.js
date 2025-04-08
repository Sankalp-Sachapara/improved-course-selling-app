import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';
import { validateAdmin } from '../validators/admin.validator.js';
import logger from '../utils/logger.js';
import { createError } from '../utils/error.js';

// Register a new admin
export const register = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = validateAdmin(req.body);
    if (error) {
      return next(createError(400, error.details[0].message));
    }

    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return next(createError(409, 'Admin with this email already exists'));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword
    });

    // Save admin to database
    const savedAdmin = await newAdmin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: savedAdmin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: savedAdmin._id, role: 'admin' },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    // Don't return password in response
    const { password: _, ...adminData } = savedAdmin._doc;

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        admin: adminData,
        token,
        refreshToken
      }
    });
  } catch (error) {
    logger.error(`Admin registration error: ${error.message}`);
    next(error);
  }
};

// Login admin
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    // Don't return password in response
    const { password: _, ...adminData } = admin._doc;

    res.status(200).json({
      success: true,
      message: 'Admin logged in successfully',
      data: {
        admin: adminData,
        token,
        refreshToken
      }
    });
  } catch (error) {
    logger.error(`Admin login error: ${error.message}`);
    next(error);
  }
};

// Get admin profile
export const getProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    
    if (!admin) {
      return next(createError(404, 'Admin not found'));
    }

    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (error) {
    logger.error(`Get admin profile error: ${error.message}`);
    next(error);
  }
};

// Update admin profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    ).select('-password');

    if (!updatedAdmin) {
      return next(createError(404, 'Admin not found'));
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedAdmin
    });
  } catch (error) {
    logger.error(`Update admin profile error: ${error.message}`);
    next(error);
  }
};

// Change admin password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Check if admin exists
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return next(createError(404, 'Admin not found'));
    }

    // Validate current password
    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isPasswordValid) {
      return next(createError(401, 'Current password is incorrect'));
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    logger.error(`Admin change password error: ${error.message}`);
    next(error);
  }
};

// Refresh token
export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return next(createError(400, 'Refresh token is required'));
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Generate new access token
    const newToken = jwt.sign(
      { id: decoded.id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      data: { token: newToken }
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(createError(401, 'Invalid or expired refresh token'));
    }
    logger.error(`Admin refresh token error: ${error.message}`);
    next(error);
  }
};
