import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';

// Components
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';

// Redux actions
import { setDrawerOpen } from '../store/slices/uiSlice';

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  
  const { drawerOpen } = useSelector((state) => state.ui);
  
  // Set initial drawer state based on screen size
  useEffect(() => {
    dispatch(setDrawerOpen(!isMobile));
  }, [isMobile, dispatch]);
  
  // Close drawer on mobile when navigating
  const handleDrawerToggle = () => {
    dispatch(setDrawerOpen(!drawerOpen));
  };
  
  // Drawer width for content margin
  const drawerWidth = 240;
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* App Header */}
      <Header 
        drawerOpen={drawerOpen} 
        drawerWidth={drawerWidth} 
        handleDrawerToggle={handleDrawerToggle}
      />
      
      {/* Sidebar */}
      <Sidebar 
        drawerOpen={drawerOpen} 
        drawerWidth={drawerWidth} 
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />
      
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
          marginLeft: { md: drawerOpen ? `${drawerWidth}px` : 0 },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Toolbar spacer */}
        <Box sx={{ height: 64 }} />
        
        {/* Content Container */}
        <Box sx={{ 
          p: 3, 
          flexGrow: 1, 
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Outlet />
        </Box>
        
        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
