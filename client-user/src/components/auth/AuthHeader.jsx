import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, useTheme } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

const AuthHeader = () => {
  const theme = useTheme();

  return (
    <AppBar 
      position="sticky"
      color="default"
      elevation={0}
      sx={{ 
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <SchoolIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ textDecoration: 'none' }}
          >
            CourseHub
          </Typography>
        </Box>
        
        <Button
          color="primary"
          variant="outlined"
          component={RouterLink}
          to="/courses"
          sx={{ mr: 2 }}
        >
          Explore Courses
        </Button>
        
        <Button
          color="primary"
          variant="contained"
          component={RouterLink}
          to="/"
        >
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AuthHeader;