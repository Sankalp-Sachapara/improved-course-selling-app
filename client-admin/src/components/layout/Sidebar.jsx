import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  List as ListIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  SettingsOutlined as SettingsIcon,
  Person as PersonIcon,
  CurrencyExchange as CurrencyExchangeIcon
} from '@mui/icons-material';

/**
 * The sidebar navigation component
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.drawerOpen - Whether the drawer is open
 * @param {number} props.drawerWidth - Width of the drawer
 * @param {Function} props.handleDrawerToggle - Function to toggle the drawer
 * @param {boolean} props.isMobile - Whether the current view is mobile
 * @returns {JSX.Element} - Sidebar component
 */
const Sidebar = ({ drawerOpen, drawerWidth, handleDrawerToggle, isMobile }) => {
  const theme = useTheme();
  const location = useLocation();
  
  // State for tracking collapsible menu items
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [studentsOpen, setStudentsOpen] = useState(false);
  
  // Update open state based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.includes('/courses')) {
      setCoursesOpen(true);
    }
    if (currentPath.includes('/students')) {
      setStudentsOpen(true);
    }
  }, [location.pathname]);
  
  // Toggle courses submenu
  const handleCoursesClick = () => {
    setCoursesOpen(!coursesOpen);
  };
  
  // Toggle students submenu
  const handleStudentsClick = () => {
    setStudentsOpen(!studentsOpen);
  };
  
  // Determine if a nav item is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  // Drawer content
  const drawer = (
    <>
      {/* App Logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: 2,
          px: 2.5
        }}
      >
        <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" color="primary" fontWeight="bold">
          CourseHub
        </Typography>
      </Box>
      
      <Divider />
      
      {/* Navigation */}
      <List component="nav" sx={{ px: 1 }}>
        {/* Dashboard */}
        <ListItemButton
          component={RouterLink}
          to="/dashboard"
          selected={isActive('/dashboard')}
          sx={{ borderRadius: 1, mb: 0.5 }}
        >
          <ListItemIcon>
            <DashboardIcon color={isActive('/dashboard') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        
        {/* Courses */}
        <ListItemButton 
          onClick={handleCoursesClick}
          selected={isActive('/courses')}
          sx={{ borderRadius: 1, mb: 0.5 }}
        >
          <ListItemIcon>
            <SchoolIcon color={isActive('/courses') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Courses" />
          {coursesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        
        {/* Courses Submenu */}
        <Collapse in={coursesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/courses"
              selected={location.pathname === '/courses'}
              sx={{ pl: 4, borderRadius: 1, mb: 0.5 }}
            >
              <ListItemIcon>
                <ListIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="All Courses" />
            </ListItemButton>
            
            <ListItemButton
              component={RouterLink}
              to="/courses/create"
              selected={location.pathname === '/courses/create'}
              sx={{ pl: 4, borderRadius: 1, mb: 0.5 }}
            >
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Create Course" />
            </ListItemButton>
          </List>
        </Collapse>
        
        {/* Students */}
        <ListItemButton 
          onClick={handleStudentsClick}
          selected={isActive('/students')}
          sx={{ borderRadius: 1, mb: 0.5 }}
        >
          <ListItemIcon>
            <PeopleIcon color={isActive('/students') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Students" />
          {studentsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        
        {/* Students Submenu */}
        <Collapse in={studentsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/students"
              selected={location.pathname === '/students'}
              sx={{ pl: 4, borderRadius: 1, mb: 0.5 }}
            >
              <ListItemIcon>
                <ListIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="All Students" />
            </ListItemButton>
          </List>
        </Collapse>
        
        {/* Analytics */}
        <ListItemButton
          component={RouterLink}
          to="/analytics"
          selected={isActive('/analytics')}
          sx={{ borderRadius: 1, mb: 0.5 }}
        >
          <ListItemIcon>
            <BarChartIcon color={isActive('/analytics') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItemButton>
        
        {/* Payments */}
        <ListItemButton
          component={RouterLink}
          to="/payments"
          selected={isActive('/payments')}
          sx={{ borderRadius: 1, mb: 0.5 }}
        >
          <ListItemIcon>
            <CurrencyExchangeIcon color={isActive('/payments') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItemButton>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Profile */}
        <ListItemButton
          component={RouterLink}
          to="/profile"
          selected={isActive('/profile')}
          sx={{ borderRadius: 1, mb: 0.5 }}
        >
          <ListItemIcon>
            <PersonIcon color={isActive('/profile') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        
        {/* Settings */}
        <ListItemButton
          component={RouterLink}
          to="/settings"
          selected={isActive('/settings')}
          sx={{ borderRadius: 1, mb: 0.5 }}
        >
          <ListItemIcon>
            <SettingsIcon color={isActive('/settings') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </>
  );
  
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
      
      {/* Desktop drawer */}
      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: theme.palette.divider
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
};

export default Sidebar;
