import { Outlet } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

/**
 * Layout component for authentication pages (login, register, forgot password)
 * @returns {JSX.Element} The auth layout
 */
const AuthLayout = () => {
  return (
    <Box className="auth-container">
      <Container maxWidth="sm">
        <Paper elevation={3} className="auth-card">
          {/* Logo and App Title */}
          <Box className="auth-logo">
            <SchoolIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontWeight: 700 }}
            >
              CourseHub
            </Typography>
          </Box>
          
          <Typography
            variant="subtitle1"
            color="textSecondary"
            align="center"
            sx={{ mb: 4 }}
          >
            Admin Dashboard
          </Typography>
          
          {/* Auth Pages Content (Login, Register, etc.) */}
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
