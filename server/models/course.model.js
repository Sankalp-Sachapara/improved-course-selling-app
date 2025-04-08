import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 20,
    maxlength: 2000
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageLink: {
    type: String,
    required: true,
    default: 'https://via.placeholder.com/300'
  },
  published: {
    type: Boolean,
    default: false
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['development', 'business', 'design', 'marketing', 'photography', 'music', 'other']
  },
  level: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced', 'all-levels']
  },
  duration: {
    type: Number,  // in minutes
    required: true,
    min: 0
  },
  chapters: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    videoUrl: {
      type: String
    },
    contentType: {
      type: String,
      enum: ['video', 'article', 'quiz'],
      default: 'video'
    },
    isFree: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,  // in minutes
      min: 0
    },
    order: {
      type: Number,
      required: true
    }
  }],
  learningOutcomes: [{
    type: String,
    trim: true
  }],
  prerequisites: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  numberOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save middleware to update 'updatedAt' field before saving
courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for getting the average rating
courseSchema.virtual('averageRating').get(function() {
  if (this.numberOfReviews === 0) return 0;
  return this.rating / this.numberOfReviews;
});

// Method to add a review
courseSchema.methods.addReview = async function(userId, rating, comment = '') {
  // Check if user already reviewed this course
  const reviewIndex = this.reviews.findIndex(review => 
    review.user.toString() === userId.toString()
  );
  
  if (reviewIndex !== -1) {
    // Update existing review
    const oldRating = this.reviews[reviewIndex].rating;
    this.reviews[reviewIndex].rating = rating;
    this.reviews[reviewIndex].comment = comment;
    
    // Update overall rating
    this.rating = this.rating - oldRating + rating;
  } else {
    // Add new review
    this.reviews.push({
      user: userId,
      rating,
      comment
    });
    
    // Update overall rating
    this.rating += rating;
    this.numberOfReviews += 1;
  }
  
  await this.save();
  return this;
};

const Course = mongoose.model('Course', courseSchema);

export default Course;
