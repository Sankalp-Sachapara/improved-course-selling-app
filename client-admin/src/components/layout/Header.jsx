import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
  styled,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

// Redux actions
import { logout } from '../../store/slices/authSlice';
import { toggleDarkMode, setSearchQuery } from '../../store/slices/uiSlice';

// Styled components
const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

/**
 * The main app header component with app bar, search, notifications, and user menu
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.drawerOpen - Whether the sidebar drawer is open
 * @param {number} props.drawerWidth - Width of the sidebar drawer
 * @param {Function} props.handleDrawerToggle - Function to toggle the drawer
 * @returns {JSX.Element} - Header component
 */
const Header = ({ drawerOpen, drawerWidth, handleDrawerToggle }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { darkMode, searchQuery, notifications } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  
  // Profile menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfileMenu = Boolean(anchorEl);
  
  // Notifications menu state
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const openNotifMenu = Boolean(notifAnchorEl);
  
  // Handle profile menu open
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  // Handle profile menu close
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Handle notifications menu open
  const handleNotifMenuOpen = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };
  
  // Handle notifications menu close
  const handleNotifMenuClose = () => {
    setNotifAnchorEl(null);
  };
  
  // Handle profile navigation
  const handleNavigateToProfile = () => {
    handleProfileMenuClose();
    navigate('/profile');
  };
  
  // Handle settings navigation
  const handleNavigateToSettings = () => {
    handleProfileMenuClose();
    navigate('/settings');
  };
  
  // Handle search input
  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };
  
  // Handle search submit
  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      navigate('/courses');
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    handleProfileMenuClose();
    dispatch(logout());
    navigate('/login');
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <AppBar 
      position="fixed" 
      elevation={1}
      sx={{
        width: { md: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
        ml: { md: `${drawerOpen ? drawerWidth : 0}px` },
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar>
        {/* Menu toggle button for mobile */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        {/* Logo for mobile */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          CourseHub
        </Typography>
        
        {/* Search box */}
        <SearchWrapper>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search courses…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
          />
        </SearchWrapper>
        
        <Box sx={{ flexGrow: 1 }} />
        
        {/* Right side buttons */}
        <Stack direction="row" spacing={1} alignItems="center">
          {/* Dark mode toggle */}
          <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'}>
            <IconButton
              color="inherit"
              onClick={() => dispatch(toggleDarkMode())}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          
          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={handleNotifMenuOpen}
              aria-controls={openNotifMenu ? 'notifications-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openNotifMenu ? 'true' : undefined}
            >
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          {/* User profile */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
              aria-controls={openProfileMenu ? 'profile-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openProfileMenu ? 'true' : undefined}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  backgroundColor: 'primary.main',
                  fontSize: '1rem'
                }}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
      
      {/* Profile Menu */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={openProfileMenu}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
            width: 200,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
      >
        <MenuItem onClick={handleNavigateToProfile}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleNavigateToSettings}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      
      {/* Notifications Menu */}
      <Menu
        id="notifications-menu"
        anchorEl={notifAnchorEl}
        open={openNotifMenu}
        onClose={handleNotifMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
            width: 320,
            maxHeight: 400,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notifications</Typography>
          <Button 
            size="small" 
            onClick={() => {
              dispatch({ type: 'ui/markAllNotificationsAsRead' });
              handleNotifMenuClose();
            }}
          >
            Mark all as read
          </Button>
        </Box>
        <Divider />
        
        {notifications.length === 0 ? (
          <Box sx={{ py: 4, px: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              No notifications yet
            </Typography>
          </Box>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => {
                dispatch({ 
                  type: 'ui/markNotificationAsRead', 
                  payload: notification.id 
                });
                handleNotifMenuClose();
                // Navigate if applicable
                if (notification.link) {
                  navigate(notification.link);
                }
              }}
              sx={{
                backgroundColor: notification.read ? 'inherit' : alpha(theme.palette.primary.main, 0.1),
                borderLeft: notification.read ? 'none' : `4px solid ${theme.palette.primary.main}`,
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle2">
                  {notification.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(notification.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </AppBar>
  );
};

Header.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired
};

export default Header;
