import Joi from 'joi';

// Validate Admin registration/creation
export const validateAdmin = (data) => {
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
      })
  });

  return schema.validate(data);
};

// Validate Admin login
export const validateAdminLogin = (data) => {
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

// Validate Admin profile update
export const validateAdminUpdate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50)
      .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must be less than 50 characters'
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
