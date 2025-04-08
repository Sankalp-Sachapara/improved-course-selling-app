import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Stack,
  Rating,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  Whatshot as PopularIcon,
  AutoAwesome as NewIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

// Custom components would be imported here
// In a real implementation, you would create these components
// import CourseCard from '../components/courses/CourseCard';
// import CategoriesSection from '../components/home/CategoriesSection';
// import TestimonialsSection from '../components/home/TestimonialsSection';
// import FeaturedBanner from '../components/home/FeaturedBanner';
// import StatisticsSection from '../components/home/StatisticsSection';

// Import course actions
import { fetchCourses } from '../store/slices/courseSlice';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    // Fetch featured courses on component mount
    dispatch(fetchCourses({ limit: 6, sort: 'popular' }));
  }, [dispatch]);

  // Placeholder data - in a real app, this would come from API
  const categories = [
    { id: 1, name: 'Web Development', count: 120, icon: '💻', color: '#3f51b5' },
    { id: 2, name: 'Mobile Development', count: 85, icon: '📱', color: '#f44336' },
    { id: 3, name: 'Data Science', count: 75, icon: '📊', color: '#4caf50' },
    { id: 4, name: 'Business', count: 65, icon: '💼', color: '#ff9800' },
    { id: 5, name: 'Design', count: 50, icon: '🎨', color: '#9c27b0' },
    { id: 6, name: 'Marketing', count: 45, icon: '📢', color: '#2196f3' },
  ];

  // Placeholder course data
  const placeholderCourses = [
    {
      _id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer',
      instructor: 'John Smith',
      price: 89.99,
      discountPrice: 49.99,
      thumbnail: '/course-thumb-1.jpg',
      category: 'Web Development',
      averageRating: 4.8,
      totalRatings: 1250,
      totalStudents: 15300,
    },
    {
      _id: '2',
      title: 'Python for Data Science and Machine Learning',
      description: 'Learn Python and how to use it to analyze data, create visualizations, and implement machine learning algorithms',
      instructor: 'Jane Doe',
      price: 99.99,
      discountPrice: 59.99,
      thumbnail: '/course-thumb-2.jpg',
      category: 'Data Science',
      averageRating: 4.6,
      totalRatings: 850,
      totalStudents: 12000,
    },
    {
      _id: '3',
      title: 'Mobile App Development with React Native',
      description: 'Build mobile applications for iOS and Android using JavaScript and React Native',
      instructor: 'Mike Johnson',
      price: 79.99,
      discountPrice: 39.99,
      thumbnail: '/course-thumb-3.jpg',
      category: 'Mobile Development',
      averageRating: 4.5,
      totalRatings: 720,
      totalStudents: 8800,
    },
    {
      _id: '4',
      title: 'UI/UX Design Fundamentals',
      description: 'Master the principles of user interface and user experience design for websites and applications',
      instructor: 'Sarah Williams',
      price: 69.99,
      discountPrice: 34.99,
      thumbnail: '/course-thumb-4.jpg',
      category: 'Design',
      averageRating: 4.7,
      totalRatings: 540,
      totalStudents: 6500,
    },
  ];

  // CourseCard component (simplified version)
  const CourseCard = ({ course }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: 4 } }}>
      <CardMedia
        component="img"
        height="160"
        image={course.thumbnail || `/placeholder-course.jpg`}
        alt={course.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Chip 
          label={course.category} 
          size="small" 
          sx={{ mb: 1, bgcolor: theme.palette.primary.light, color: 'white' }}
        />
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {course.description.length > 75 ? course.description.substring(0, 75) + '...' : course.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={course.averageRating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({course.totalRatings})
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          Instructor: {course.instructor}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box>
          <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
            ${course.discountPrice}
          </Typography>
          {course.discountPrice < course.price && (
            <Typography variant="body2" component="span" sx={{ textDecoration: 'line-through', ml: 1, color: 'text.secondary' }}>
              ${course.price}
            </Typography>
          )}
        </Box>
        <Button
          component={RouterLink}
          to={`/courses/${course._id}`}
          variant="outlined"
          size="small"
        >
          View
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
          py: { xs: 6, md: 10 },
          borderRadius: 2,
          mb: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                fontWeight="bold"
                gutterBottom
              >
                Unlock Your Learning Potential
              </Typography>
              <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                Access quality courses taught by expert instructors. Learn at your own pace and 
                take your skills to the next level.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={RouterLink}
                  to="/courses"
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                >
                  Explore Courses
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="outlined"
                  color="inherit"
                  size="large"
                  sx={{ borderColor: 'white' }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Grid>
            {!isMobile && (
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="/hero-image.svg" // Placeholder for hero image
                  alt="Online learning illustration"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 400,
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Featured Categories Section */}
      <Container sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h2" fontWeight="bold">
            Browse Top Categories
          </Typography>
          <Button
            component={RouterLink}
            to="/courses"
            endIcon={<ArrowForwardIcon />}
          >
            View All
          </Button>
        </Box>

        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={6} sm={4} md={2} key={category.id}>
              <Paper
                component={RouterLink}
                to={`/courses?category=${category.name.toLowerCase().replace(' ', '-')}`}
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  transition: '0.3s',
                  display: 'block',
                  textDecoration: 'none',
                  color: 'text.primary',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {category.icon}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.count} courses
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Popular Courses Section */}
      <Container sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PopularIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="h4" component="h2" fontWeight="bold">
              Popular Courses
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to="/courses?sort=popular"
            endIcon={<ArrowForwardIcon />}
          >
            View All
          </Button>
        </Box>

        <Grid container spacing={3}>
          {(courses.length > 0 ? courses : placeholderCourses).slice(0, 4).map((course) => (
            <Grid item xs={12} sm={6} md={3} key={course._id}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Statistics Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, mb: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" fontWeight="bold" align="center" gutterBottom>
            Why Learn With Us?
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
            Join our global community of learners and gain the skills you need to achieve your goals.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" fontWeight="bold">
                  500+
                </Typography>
                <Typography variant="h6">Courses</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" fontWeight="bold">
                  50K+
                </Typography>
                <Typography variant="h6">Students</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" fontWeight="bold">
                  200+
                </Typography>
                <Typography variant="h6">Instructors</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" fontWeight="bold">
                  4.8
                </Typography>
                <Typography variant="h6">Average Rating</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Container sx={{ mb: 8 }}>
        <Paper
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background: `linear-gradient(to right, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
                Ready to Start Learning?
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                Join thousands of students already learning on our platform. Get unlimited access to all courses.
              </Typography>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                color="primary"
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  bgcolor: 'white', 
                  color: theme.palette.secondary.main,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                }}
              >
                Sign Up Now
              </Button>
            </Grid>
            {!isMobile && (
              <Grid item xs={12} md={4}>
                <Box
                  component="img"
                  src="/cta-illustration.svg" // Placeholder for CTA image
                  alt="Learning illustration"
                  sx={{ width: '100%', maxWidth: 300, display: 'block', mx: 'auto' }}
                />
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;