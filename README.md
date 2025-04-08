# Improved Course Selling Platform

A modern, full-stack MERN application for creating, selling, and managing online courses. This project is an enhanced version of the [original course selling app](https://github.com/chintan712/courseSellingAppMERN) with significant improvements in architecture, features, security, and user experience.

## ✨ Improvements Over Original Project

### Backend Improvements
- **Enhanced Architecture**: Proper MVC structure with separated routes, controllers, and models
- **Input Validation**: Added Joi-based validation for all API endpoints
- **Improved Security**:
  - Better JWT implementation with refresh tokens
  - Password hashing with bcrypt
  - Rate limiting to prevent abuse
  - Helmet for HTTP security headers
- **Error Handling**: Comprehensive error handling and logging with Winston
- **Payment Integration**: Added Stripe for secure payment processing
- **API Documentation**: Clear API documentation and improved endpoint structure
- **File Uploads**: Support for course images and materials with Multer
- **Environment Variables**: Proper .env configuration for sensitive information

### Frontend Improvements
- **Modern UI**: Completely redesigned UI with Material UI components
- **State Management**: Added Redux with Redux Toolkit for better state management
- **Form Handling**: Formik with Yup validation for improved form UX
- **Charts and Visualizations**: Added analytics dashboard with Chart.js
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Authentication**: Secure JWT authentication with refresh tokens
- **Loading States**: Proper loading states and error handling throughout the app
- **File Upload**: Improved file upload UI with drag-and-drop functionality

### User Experience Improvements
- **Dashboard**: Added admin dashboard with key metrics
- **Course Management**: Enhanced course creation and management interface
- **Student Management**: Better view of enrolled students and their progress
- **Analytics**: Added charts and reports for sales and course performance
- **Notifications**: In-app notification system for important events

## 🚀 Features

### For Students
- **User Authentication** - Secure signup/login with JWT
- **Course Browsing** - Search, filter, and sort through available courses
- **Course Preview** - View free preview content before purchasing
- **Course Enrollment** - Purchase courses with secure payment processing
- **Learning Dashboard** - Track progress through enrolled courses
- **Course Reviews** - Rate and review completed courses
- **User Profile** - Update personal information and preferences

### For Instructors/Admins
- **Course Management** - Create, edit, and delete courses
- **Content Management** - Upload videos, articles, and quizzes
- **Student Management** - View and manage enrolled students
- **Analytics Dashboard** - Track course performance and revenue
- **Secure Authentication** - Role-based access control

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Joi** - Validation
- **Winston** - Logging
- **Multer** - File uploads
- **Stripe** - Payment processing

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management
- **Material UI** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Formik** - Form handling
- **Yup** - Form validation
- **Chart.js** - Data visualization

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Sankalp-Sachapara/improved-course-selling-app.git
   cd improved-course-selling-app
   ```

2. Backend Setup
   ```bash
   # Navigate to server directory
   cd server
   
   # Install dependencies
   npm install
   
   # Create .env file (copy from .env.example)
   cp .env.example .env
   
   # Start the server in development mode
   npm run dev
   ```

3. Frontend Setup - Admin Panel
   ```bash
   # Navigate to client-admin directory
   cd ../client-admin
   
   # Install dependencies
   npm install
   
   # Start the client
   npm run dev
   ```

4. Frontend Setup - User Portal
   ```bash
   # Navigate to client-user directory
   cd ../client-user
   
   # Install dependencies
   npm install
   
   # Start the client
   npm run dev
   ```

## 📚 API Documentation

### Authentication
- `POST /api/admin/register` - Register a new admin
- `POST /api/admin/login` - Login as admin
- `POST /api/admin/refresh-token` - Refresh access token
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `POST /api/users/refresh-token` - Refresh access token

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get a specific course
- `POST /api/courses` - Create a new course (admin only)
- `PUT /api/courses/:id` - Update a course (admin only)
- `DELETE /api/courses/:id` - Delete a course (admin only)
- `GET /api/admin/courses` - Get all courses (admin only)
- `GET /api/users/courses` - Get purchased courses (for users)

### Payments
- `POST /api/payments/checkout/:courseId` - Create checkout session
- `GET /api/payments/session/:sessionId` - Get payment status
- `GET /api/payments/history` - Get payment history
- `POST /api/payments/webhook` - Stripe webhook handler

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Original project by [chintan712](https://github.com/chintan712/courseSellingAppMERN)
- Enhanced with modern practices and additional features
