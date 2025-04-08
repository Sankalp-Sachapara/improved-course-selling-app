import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  PlayCircle as PlayCircleIcon,
  AttachMoney as AttachMoneyIcon,
  PersonAdd as PersonAddIcon,
  Add as AddIcon
} from '@mui/icons-material';

// Components
import DashboardCard from '../components/dashboard/DashboardCard';
import RecentSalesChart from '../components/dashboard/RecentSalesChart';
import CoursePopularityChart from '../components/dashboard/CoursePopularityChart';
import RecentEnrollments from '../components/dashboard/RecentEnrollments';

// API service
import api from '../services/api';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    totalLessons: 0,
    recentEnrollments: [],
    courseData: [],
    salesData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, you would fetch this data from your API
        // For now, we'll use mock data
        
        // Simulating API call delay
        setTimeout(() => {
          setStats({
            totalCourses: 12,
            totalStudents: 156,
            totalRevenue: 5840,
            totalLessons: 89,
            recentEnrollments: [
              { id: 1, student: 'Jane Cooper', course: 'JavaScript Fundamentals', date: '2025-04-07', amount: 49.99 },
              { id: 2, student: 'John Smith', course: 'React Mastery', date: '2025-04-06', amount: 79.99 },
              { id: 3, student: 'Emma Johnson', course: 'Node.js Complete Guide', date: '2025-04-05', amount: 59.99 },
              { id: 4, student: 'Michael Davis', course: 'Python for Beginners', date: '2025-04-04', amount: 39.99 },
              { id: 5, student: 'Olivia Wilson', course: 'Web Design Fundamentals', date: '2025-04-03', amount: 49.99 }
            ],
            courseData: [
              { name: 'JavaScript Fundamentals', students: 42 },
              { name: 'React Mastery', students: 38 },
              { name: 'Node.js Complete Guide', students: 28 },
              { name: 'Python for Beginners', students: 25 },
              { name: 'Web Design Fundamentals', students: 23 }
            ],
            salesData: [
              { date: '2025-03-01', amount: 780 },
              { date: '2025-03-08', amount: 890 },
              { date: '2025-03-15', amount: 1100 },
              { date: '2025-03-22', amount: 1050 },
              { date: '2025-03-29', amount: 1200 },
              { date: '2025-04-05', amount: 820 }
            ]
          });
          setLoading(false);
        }, 1000);
        
        // When API is ready, uncomment this code
        // const response = await api.get('/api/admin/dashboard');
        // setStats(response.data);
        // setLoading(false);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container maxWidth="xl">
      {/* Page Header */}
      <Box mb={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Welcome back, {user?.name || 'Admin'}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/courses/create"
          >
            Create Course
          </Button>
        </Stack>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Courses"
            value={stats.totalCourses}
            icon={<SchoolIcon />}
            color="#3f51b5"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<PeopleIcon />}
            color="#f50057"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Revenue"
            value={`$${stats.totalRevenue}`}
            icon={<AttachMoneyIcon />}
            color="#4caf50"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Lessons"
            value={stats.totalLessons}
            icon={<PlayCircleIcon />}
            color="#ff9800"
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recent Sales
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <RecentSalesChart data={stats.salesData} loading={loading} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Popular Courses
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <CoursePopularityChart data={stats.courseData} loading={loading} />
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Enrollments */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Enrollments
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <RecentEnrollments enrollments={stats.recentEnrollments} loading={loading} />
        <Box mt={2} textAlign="right">
          <Button
            component={RouterLink}
            to="/students"
            color="primary"
          >
            View All Students
          </Button>
        </Box>
      </Paper>

      {/* Quick Actions */}
      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card">
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AddIcon fontSize="large" color="primary" />
                <Typography variant="h6" ml={1}>
                  New Course
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" paragraph>
                Create a new course and add lessons, quizzes, and materials.
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                component={RouterLink}
                to="/courses/create"
              >
                Create Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card">
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <PersonAddIcon fontSize="large" color="secondary" />
                <Typography variant="h6" ml={1}>
                  Invite Students
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" paragraph>
                Send invitations to students to join your courses.
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                component={RouterLink}
                to="/students"
              >
                Invite Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
