import Joi from 'joi';

// Validate course creation
export const validateCourse = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required()
      .messages({
        'string.empty': 'Title is required',
        'string.min': 'Title must be at least 3 characters',
        'string.max': 'Title must be less than 100 characters'
      }),
    description: Joi.string().min(20).max(2000).required()
      .messages({
        'string.empty': 'Description is required',
        'string.min': 'Description must be at least 20 characters',
        'string.max': 'Description must be less than 2000 characters'
      }),
    price: Joi.number().min(0).required()
      .messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price cannot be negative'
      }),
    imageLink: Joi.string()
      .messages({
        'string.empty': 'Image link is required'
      }),
    published: Joi.boolean().default(false),
    category: Joi.string().valid(
      'development', 
      'business', 
      'design', 
      'marketing', 
      'photography', 
      'music', 
      'other'
    ).required()
      .messages({
        'string.empty': 'Category is required',
        'any.only': 'Category must be one of: development, business, design, marketing, photography, music, other'
      }),
    level: Joi.string().valid(
      'beginner', 
      'intermediate', 
      'advanced', 
      'all-levels'
    ).required()
      .messages({
        'string.empty': 'Level is required',
        'any.only': 'Level must be one of: beginner, intermediate, advanced, all-levels'
      }),
    duration: Joi.number().min(0).required()
      .messages({
        'number.base': 'Duration must be a number',
        'number.min': 'Duration cannot be negative'
      }),
    chapters: Joi.array().items(
      Joi.object({
        title: Joi.string().required()
          .messages({
            'string.empty': 'Chapter title is required'
          }),
        description: Joi.string(),
        videoUrl: Joi.string(),
        contentType: Joi.string().valid('video', 'article', 'quiz').default('video'),
        isFree: Joi.boolean().default(false),
        duration: Joi.number().min(0),
        order: Joi.number().required()
      })
    ),
    learningOutcomes: Joi.array().items(Joi.string()),
    prerequisites: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string())
  });

  return schema.validate(data);
};

// Validate course update
export const validateCourseUpdate = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100)
      .messages({
        'string.min': 'Title must be at least 3 characters',
        'string.max': 'Title must be less than 100 characters'
      }),
    description: Joi.string().min(20).max(2000)
      .messages({
        'string.min': 'Description must be at least 20 characters',
        'string.max': 'Description must be less than 2000 characters'
      }),
    price: Joi.number().min(0)
      .messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price cannot be negative'
      }),
    imageLink: Joi.string(),
    published: Joi.boolean(),
    category: Joi.string().valid(
      'development', 
      'business', 
      'design', 
      'marketing', 
      'photography', 
      'music', 
      'other'
    )
      .messages({
        'any.only': 'Category must be one of: development, business, design, marketing, photography, music, other'
      }),
    level: Joi.string().valid(
      'beginner', 
      'intermediate', 
      'advanced', 
      'all-levels'
    )
      .messages({
        'any.only': 'Level must be one of: beginner, intermediate, advanced, all-levels'
      }),
    duration: Joi.number().min(0)
      .messages({
        'number.base': 'Duration must be a number',
        'number.min': 'Duration cannot be negative'
      }),
    chapters: Joi.array().items(
      Joi.object({
        title: Joi.string().required()
          .messages({
            'string.empty': 'Chapter title is required'
          }),
        description: Joi.string(),
        videoUrl: Joi.string(),
        contentType: Joi.string().valid('video', 'article', 'quiz'),
        isFree: Joi.boolean(),
        duration: Joi.number().min(0),
        order: Joi.number().required()
      })
    ),
    learningOutcomes: Joi.array().items(Joi.string()),
    prerequisites: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string())
  });

  return schema.validate(data);
};

// Validate course review
export const validateCourseReview = (data) => {
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5).required()
      .messages({
        'number.base': 'Rating must be a number',
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating must be at most 5',
        'any.required': 'Rating is required'
      }),
    comment: Joi.string().max(500)
      .messages({
        'string.max': 'Comment must be less than 500 characters'
      })
  });

  return schema.validate(data);
};
