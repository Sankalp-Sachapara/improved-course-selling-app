# Advanced Course Selling Platform

A modern, full-stack application for creating, selling, and managing online courses, built with the MERN stack (MongoDB, Express, React, Node.js).

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

### Technical Features
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Secure Authentication** - JWT-based auth with refresh tokens
- **Payment Processing** - Integrated with Stripe for secure payments
- **File Uploads** - Support for image and video uploads
- **API Rate Limiting** - Protection against abuse
- **Error Logging** - Comprehensive error tracking
- **Form Validation** - Client and server-side validation
- **Modern UI** - Clean, intuitive interface with Material UI

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

### Frontend (Coming Soon)
- **React** - UI library
- **Redux** - State management
- **Material UI** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Formik** - Form handling
- **Yup** - Form validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/[your-username]/improved-course-selling-app.git
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

3. Frontend Setup (Coming Soon)
   ```bash
   # Navigate to client directory
   cd ../client
   
   # Install dependencies
   npm install
   
   # Start the client
   npm start
   ```

## 📚 API Documentation

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `POST /api/users/refresh-token` - Refresh access token
- `POST /api/admin/register` - Register a new admin
- `POST /api/admin/login` - Login as admin

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/change-password` - Change password
- `GET /api/users/courses` - Get purchased courses

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get a specific course
- `POST /api/courses` - Create a new course (admin only)
- `PUT /api/courses/:id` - Update a course (admin only)
- `DELETE /api/courses/:id` - Delete a course (admin only)
- `GET /api/courses/admin/all` - Get all courses (admin only)

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
