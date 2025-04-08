import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  SwipeableDrawer,
  Drawer,
  Collapse,
  Badge,
} from '@mui/material';
import {
  Home as HomeIcon,
  School as SchoolIcon,
  Category as CategoryIcon,
  LibraryBooks as CoursesIcon,
  ShoppingCart as CartIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  Favorite as WishlistIcon,
  ExpandLess,
  ExpandMore,
  ChevronRight as ArrowIcon,
} from '@mui/icons-material';

import { setSidebarState } from '../../store/slices/uiSlice';

const Sidebar = ({ open, width, isMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const [categoryOpen, setCategoryOpen] = React.useState(false);

  const handleToggleCategory = () => {
    setCategoryOpen(!categoryOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      dispatch(setSidebarState(false));
    }
  };

  const categories = [
    { name: 'Web Development', path: '/courses?category=web-development' },
    { name: 'Mobile App Development', path: '/courses?category=mobile-development' },
    { name: 'Data Science', path: '/courses?category=data-science' },
    { name: 'Business', path: '/courses?category=business' },
    { name: 'Design', path: '/courses?category=design' },
  ];

  const mainMenuItems = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      path: '/',
    },
    {
      text: 'All Courses',
      icon: <CoursesIcon />,
      path: '/courses',
    },
    {
      text: 'Categories',
      icon: <CategoryIcon />,
      children: categories,
      isExpandable: true,
    },
  ];

  const authenticatedMenuItems = [
    {
      text: 'My Courses',
      icon: <SchoolIcon />,
      path: '/my-courses',
      requireAuth: true,
    },
    {
      text: 'Wishlist',
      icon: <WishlistIcon />,
      path: '/wishlist',
      requireAuth: true,
    },
    {
      text: 'Cart',
      icon: <CartIcon />,
      path: '/cart',
      badge: cartItems.length,
    },
    {
      text: 'Profile',
      icon: <ProfileIcon />,
      path: '/profile',
      requireAuth: true,
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings',
      requireAuth: true,
    },
  ];

  // Filter items based on authentication status
  const filteredItems = [...mainMenuItems, ...authenticatedMenuItems.filter(item => 
    !item.requireAuth || (item.requireAuth && isAuthenticated)
  )];

  const sidebarContent = (
    <Box
      sx={{
        width,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="presentation"
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Menu
        </Typography>
      </Box>
      
      <Divider />
      
      <List sx={{ flex: 1, overflowY: 'auto' }}>
        {filteredItems.map((item, index) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              {item.isExpandable ? (
                <ListItemButton onClick={handleToggleCategory}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {categoryOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              ) : (
                <ListItemButton 
                  onClick={() => handleNavigation(item.path)}
                  selected={location.pathname === item.path}
                >
                  <ListItemIcon>
                    {item.badge ? (
                      <Badge badgeContent={item.badge} color="error">
                        {item.icon}
                      </Badge>
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              )}
            </ListItem>
            
            {item.isExpandable && (
              <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItemButton 
                      key={child.name}
                      sx={{ pl: 4 }}
                      onClick={() => handleNavigation(child.path)}
                      selected={location.pathname + location.search === child.path}
                    >
                      <ListItemIcon>
                        <ArrowIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={child.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  // Render different drawer types depending on mobile or desktop
  return isMobile ? (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onOpen={() => dispatch(setSidebarState(true))}
      onClose={() => dispatch(setSidebarState(false))}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      {sidebarContent}
    </SwipeableDrawer>
  ) : (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? width : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          top: '64px', // AppBar height
          height: 'calc(100% - 64px)',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};

export default Sidebar;