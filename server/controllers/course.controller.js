import Course from '../models/course.model.js';
import { validateCourse, validateCourseUpdate } from '../validators/course.validator.js';
import logger from '../utils/logger.js';
import { createError } from '../utils/error.js';
import User from '../models/user.model.js';

// Create a new course
export const createCourse = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = validateCourse(req.body);
    if (error) {
      return next(createError(400, error.details[0].message));
    }

    // Handle file upload if implemented
    let imageUrl = req.body.imageLink;
    if (req.file) {
      imageUrl = req.file.path; // Update with your file upload logic
    }

    // Create new course
    const newCourse = new Course({
      ...req.body,
      imageLink: imageUrl,
      instructor: req.user.id
    });

    // Save course to database
    const savedCourse = await newCourse.save();

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: savedCourse
    });
  } catch (error) {
    logger.error(`Create course error: ${error.message}`);
    next(error);
  }
};

// Get all courses
export const getAllCourses = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice, sort, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = { published: true };
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
    }

    // Admin can see all courses including unpublished ones
    if (req.user && req.user.role === 'admin') {
      delete filter.published;
    }
    
    // Build sort object
    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'desc' ? -1 : 1;
    } else {
      sortOptions = { createdAt: -1 };
    }
    
    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Get courses
    const courses = await Course.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .populate('instructor', 'name');
    
    // Count total
    const total = await Course.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: {
        courses,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    logger.error(`Get all courses error: ${error.message}`);
    next(error);
  }
};

// Get course by ID
export const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const course = await Course.findById(id)
      .populate('instructor', 'name email');
    
    if (!course) {
      return next(createError(404, 'Course not found'));
    }
    
    // Check if unpublished course can be viewed by this user
    if (!course.published && (!req.user || (req.user.role !== 'admin' && course.instructor._id.toString() !== req.user.id))) {
      return next(createError(403, 'You do not have permission to view this course'));
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    logger.error(`Get course by ID error: ${error.message}`);
    next(error);
  }
};

// Update course
export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Validate request body
    const { error } = validateCourseUpdate(req.body);
    if (error) {
      return next(createError(400, error.details[0].message));
    }
    
    // Check if course exists
    const course = await Course.findById(id);
    if (!course) {
      return next(createError(404, 'Course not found'));
    }
    
    // Check if user is authorized to update the course
    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user.id) {
      return next(createError(403, 'You do not have permission to update this course'));
    }
    
    // Handle file upload if implemented
    let imageUrl = req.body.imageLink || course.imageLink;
    if (req.file) {
      imageUrl = req.file.path; // Update with your file upload logic
    }
    
    // Update course
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { ...req.body, imageLink: imageUrl },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: updatedCourse
    });
  } catch (error) {
    logger.error(`Update course error: ${error.message}`);
    next(error);
  }
};

// Delete course
export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if course exists
    const course = await Course.findById(id);
    if (!course) {
      return next(createError(404, 'Course not found'));
    }
    
    // Check if user is authorized to delete the course
    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user.id) {
      return next(createError(403, 'You do not have permission to delete this course'));
    }
    
    // Delete course
    await Course.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    logger.error(`Delete course error: ${error.message}`);
    next(error);
  }
};

// Get admin courses
export const getAdminCourses = async (req, res, next) => {
  try {
    // Only admin or instructors
    if (req.user.role !== 'admin') {
      return next(createError(403, 'Not authorized'));
    }
    
    const courses = await Course.find()
      .populate('instructor', 'name');
    
    res.status(200).json({
      success: true,
      data: courses
    });
  } catch (error) {
    logger.error(`Get admin courses error: ${error.message}`);
    next(error);
  }
};

// Get course analytics
export const getCourseAnalytics = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if course exists
    const course = await Course.findById(id);
    if (!course) {
      return next(createError(404, 'Course not found'));
    }
    
    // Check if user is authorized to view analytics
    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user.id) {
      return next(createError(403, 'You do not have permission to view this course analytics'));
    }
    
    // Get number of enrolled students
    const enrolledCount = await User.countDocuments({
      purchasedCourses: id
    });
    
    // Get total revenue (you would need payment data for this)
    // This is just an example calculation
    const totalRevenue = enrolledCount * course.price;
    
    res.status(200).json({
      success: true,
      data: {
        totalEnrolled: enrolledCount,
        totalRevenue,
        averageRating: course.rating || 0,
        publishStatus: course.published ? 'Published' : 'Draft'
      }
    });
  } catch (error) {
    logger.error(`Get course analytics error: ${error.message}`);
    next(error);
  }
};
