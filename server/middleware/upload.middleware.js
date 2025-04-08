import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createError } from '../utils/error.js';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Define file filter
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(createError(400, 'Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Create upload object
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Middleware for course image upload
export const uploadCourseImage = (req, res, next) => {
  const uploadSingle = upload.single('image');
  
  uploadSingle(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(createError(400, 'File too large. Max size is 5MB'));
        }
        return next(createError(400, err.message));
      }
      return next(err);
    }
    
    // If a file was uploaded, add the path to the request body
    if (req.file) {
      // Convert backslashes to forward slashes for consistency
      let imagePath = req.file.path.replace(/\\/g, '/');
      
      // If needed, convert path for URL usage (e.g., add /uploads prefix for API access)
      // imagePath = '/uploads/' + path.basename(imagePath);
      
      req.body.imageLink = imagePath;
    }
    
    next();
  });
};

// Middleware for user profile image upload
export const uploadProfileImage = (req, res, next) => {
  const uploadSingle = upload.single('profileImage');
  
  uploadSingle(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(createError(400, 'File too large. Max size is 5MB'));
        }
        return next(createError(400, err.message));
      }
      return next(err);
    }
    
    // If a file was uploaded, add the path to the request body
    if (req.file) {
      // Convert backslashes to forward slashes for consistency
      let imagePath = req.file.path.replace(/\\/g, '/');
      
      // If needed, convert path for URL usage
      // imagePath = '/uploads/' + path.basename(imagePath);
      
      req.body.profileImage = imagePath;
    }
    
    next();
  });
};
