import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

/**
 * 404 Not Found page component
 * @returns {JSX.Element} Not found page
 */
const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 10
        }}
      >
        <Typography 
          variant="h1" 
          color="primary" 
          sx={{ 
            fontSize: { xs: '6rem', md: '8rem' },
            fontWeight: 'bold' 
          }}
        >
          404
        </Typography>
        
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ mt: 2, mb: 4 }}
        >
          Page Not Found
        </Typography>
        
        <Typography 
          variant="body1"
          color="textSecondary"
          sx={{ mb: 6, maxWidth: 480 }}
        >
          The page you're looking for doesn't exist or has been moved.
          Check the URL or navigate back to the dashboard.
        </Typography>
        
        <Button
          component={RouterLink}
          to="/dashboard"
          variant="contained"
          startIcon={<HomeIcon />}
          size="large"
        >
          Go to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
