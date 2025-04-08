import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Course from '../models/course.model.js';
import { validateUser, validateUpdateUser } from '../validators/user.validator.js';
import logger from '../utils/logger.js';
import { createError } from '../utils/error.js';

// Register a new user
export const register = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = validateUser(req.body);
    if (error) {
      return next(createError(400, error.details[0].message));
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, 'User with this email already exists'));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: savedUser._id, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: savedUser._id, role: 'user' },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    // Don't return password in response
    const { password: _, ...userData } = savedUser._doc;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userData,
        token,
        refreshToken
      }
    });
  } catch (error) {
    logger.error(`User registration error: ${error.message}`);
    next(error);
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user._id, role: 'user' },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    // Don't return password in response
    const { password: _, ...userData } = user._doc;

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        user: userData,
        token,
        refreshToken
      }
    });
  } catch (error) {
    logger.error(`User login error: ${error.message}`);
    next(error);
  }
};

// Get user profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('purchasedCourses', 'title description imageLink');
    
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error(`Get user profile error: ${error.message}`);
    next(error);
  }
};

// Update user profile
export const updateProfile = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = validateUpdateUser(req.body);
    if (error) {
      return next(createError(400, error.details[0].message));
    }
    
    const { name } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return next(createError(404, 'User not found'));
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    logger.error(`Update user profile error: ${error.message}`);
    next(error);
  }
};

// Change user password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Check if user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    // Validate current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return next(createError(401, 'Current password is incorrect'));
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    logger.error(`User change password error: ${error.message}`);
    next(error);
  }
};

// Get purchased courses
export const getPurchasedCourses = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('purchasedCourses');
    
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    res.status(200).json({
      success: true,
      data: user.purchasedCourses
    });
  } catch (error) {
    logger.error(`Get purchased courses error: ${error.message}`);
    next(error);
  }
};

// Purchase a course
export const purchaseCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return next(createError(404, 'Course not found'));
    }
    
    // Check if course is published
    if (!course.published) {
      return next(createError(400, 'Course is not available for purchase'));
    }
    
    // Check if user already purchased this course
    const user = await User.findById(req.user.id);
    if (user.purchasedCourses.includes(courseId)) {
      return next(createError(400, 'You already purchased this course'));
    }
    
    // Add course to user's purchased courses
    user.purchasedCourses.push(courseId);
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Course purchased successfully'
    });
  } catch (error) {
    logger.error(`Purchase course error: ${error.message}`);
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
      { id: decoded.id, role: 'user' },
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
    logger.error(`User refresh token error: ${error.message}`);
    next(error);
  }
};
