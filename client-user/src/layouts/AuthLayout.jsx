import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';

import GlobalLoader from '../components/common/GlobalLoader';
import AuthHeader from '../components/auth/AuthHeader';

const AuthLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const { isLoading: uiLoading, loadingMessage } = useSelector((state) => state.ui);

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {(isLoading || uiLoading) && <GlobalLoader message={loadingMessage} />}
      
      <AuthHeader />
      
      <Grid container component="main" sx={{ flex: 1 }}>
        {/* Left side - illustration for desktop */}
        {!isMobile && (
          <Grid
            item
            xs={false}
            sm={false}
            md={6}
            sx={{
              backgroundImage: 'url(/auth-background.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 4,
                zIndex: 1,
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                color="white"
                fontWeight="bold"
                gutterBottom
              >
                Unlock Your Learning Potential
              </Typography>
              <Typography
                variant="h6"
                color="white"
                align="center"
                sx={{ maxWidth: 500 }}
              >
                Access a world of knowledge with our expert-led courses and transform your skills today.
              </Typography>
            </Box>
          </Grid>
        )}
        
        {/* Right side - auth forms */}
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          component={Paper}
          elevation={0}
          square
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 4,
            px: { xs: 2, sm: 4 },
            backgroundColor: 'background.default',
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '450px',
              width: '100%',
            }}
          >
            <Outlet />
          </Box>
        </Grid>
      </Grid>
      
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Course Platform. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthLayout;