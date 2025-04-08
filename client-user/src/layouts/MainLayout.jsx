import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Container, CircularProgress, useMediaQuery, useTheme } from '@mui/material';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import GlobalLoader from '../components/common/GlobalLoader';

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const { isLoading, loadingMessage } = useSelector((state) => state.ui);
  const { isSidebarOpen } = useSelector((state) => state.ui);
  const [pageReady, setPageReady] = useState(false);

  // Simulate a page transition effect
  useEffect(() => {
    setPageReady(false);
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Sidebar width calculation
  const sidebarWidth = 240;
  const contentMargin = isMobile ? 0 : (isSidebarOpen ? sidebarWidth : 0);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      {isLoading && <GlobalLoader message={loadingMessage} />}
      
      <Header />
      
      <Box 
        component="main" 
        sx={{ 
          display: 'flex',
          flex: 1,
          pt: { xs: 2, md: 3 },
          transition: theme => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ml: contentMargin,
        }}
      >
        <Sidebar 
          open={isSidebarOpen} 
          width={sidebarWidth}
          isMobile={isMobile}
        />
        
        <Container maxWidth="lg" sx={{ pb: 6 }}>
          {!pageReady ? (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '50vh' 
              }}
            >
              <CircularProgress size={30} color="primary" />
            </Box>
          ) : (
            <Box className="page-transition">
              <Outlet />
            </Box>
          )}
        </Container>
      </Box>
      
      <Footer />
    </Box>
  );
};

export default MainLayout;