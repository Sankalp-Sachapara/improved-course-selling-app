import Joi from 'joi';

// Validate User registration/creation
export const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required()
      .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must be less than 50 characters'
      }),
    email: Joi.string().email().required()
      .messages({
        'string.empty': 'Email is required',
        'string.email': 'Please provide a valid email'
      }),
    password: Joi.string().min(6).required()
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters'
      }),
    bio: Joi.string().max(500)
      .messages({
        'string.max': 'Bio must be less than 500 characters'
      })
  });

  return schema.validate(data);
};

// Validate User login
export const validateUserLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
      .messages({
        'string.empty': 'Email is required',
        'string.email': 'Please provide a valid email'
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Password is required',
      })
  });

  return schema.validate(data);
};

// Validate User profile update
export const validateUpdateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50)
      .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must be less than 50 characters'
      }),
    bio: Joi.string().max(500)
      .messages({
        'string.max': 'Bio must be less than 500 characters'
      }),
    preferences: Joi.object({
      notifications: Joi.object({
        email: Joi.boolean(),
        marketing: Joi.boolean()
      }),
      theme: Joi.string().valid('light', 'dark')
    })
  });

  return schema.validate(data);
};

// Validate password change
export const validatePasswordChange = (data) => {
  const schema = Joi.object({
    currentPassword: Joi.string().required()
      .messages({
        'string.empty': 'Current password is required'
      }),
    newPassword: Joi.string().min(6).required()
      .messages({
        'string.empty': 'New password is required',
        'string.min': 'New password must be at least 6 characters'
      })
  });

  return schema.validate(data);
};

// Validate course purchase
export const validatePurchase = (data) => {
  const schema = Joi.object({
    courseId: Joi.string().required()
      .messages({
        'string.empty': 'Course ID is required'
      })
  });

  return schema.validate(data);
};

// Validate refresh token
export const validateRefreshToken = (data) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
      .messages({
        'string.empty': 'Refresh token is required'
      })
  });

  return schema.validate(data);
};
