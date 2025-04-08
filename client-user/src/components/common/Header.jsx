import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  InputBase,
  Badge,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  ShoppingCart as CartIcon,
  Notifications as NotificationIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  School as SchoolIcon,
  Close as CloseIcon,
  FavoriteBorder as WishlistIcon,
} from '@mui/icons-material';

import { logout } from '../../store/slices/authSlice';
import { toggleSidebar, toggleTheme } from '../../store/slices/uiSlice';
import { setFilters } from '../../store/slices/courseSlice';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const currentTheme = useSelector((state) => state.ui.theme);
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate('/login');
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(setFilters({ search: searchQuery }));
      navigate('/courses');
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const userMenuItems = isAuthenticated
    ? [
        { name: 'My Courses', path: '/my-courses', icon: <SchoolIcon fontSize="small" /> },
        { name: 'My Profile', path: '/profile', icon: <PersonIcon fontSize="small" /> },
        { name: 'Wishlist', path: '/wishlist', icon: <WishlistIcon fontSize="small" /> },
      ]
    : [];
  
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CourseHub
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Typography 
                    textAlign="center"
                    component={RouterLink}
                    to={page.path}
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CourseHub
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'inherit', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Search Bar */}
          {isSearchOpen ? (
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                position: 'relative',
                borderRadius: 1,
                backgroundColor: 'action.hover',
                '&:hover': { backgroundColor: 'action.hover' },
                marginRight: 2,
                marginLeft: 0,
                width: '100%',
                display: 'flex',
                [theme.breakpoints.up('md')]: {
                  marginLeft: theme.spacing(1),
                  width: 'auto',
                },
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, padding: '6px 12px' }}
                placeholder="Search courses..."
                inputProps={{ 'aria-label': 'search courses' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <IconButton 
                type="submit" 
                sx={{ p: '10px' }} 
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                sx={{ p: '6px' }}
                aria-label="close search"
                onClick={() => setIsSearchOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            <IconButton 
              onClick={() => setIsSearchOpen(true)} 
              color="inherit"
              size="large"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <SearchIcon />
            </IconButton>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Theme Toggle */}
            <IconButton onClick={handleToggleTheme} color="inherit">
              {currentTheme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {/* Cart */}
            <IconButton 
              color="inherit" 
              component={RouterLink} 
              to="/cart"
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <CartIcon />
              </Badge>
            </IconButton>

            {/* User Menu */}
            {isAuthenticated ? (
              <>
                <Box sx={{ flexGrow: 0, ml: 1 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar 
                        alt={user?.name || 'User'} 
                        src={user?.avatar || '/static/images/avatar/default.jpg'}
                        sx={{ bgcolor: 'primary.main' }}
                      >
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {userMenuItems.map((item) => (
                      <MenuItem 
                        key={item.path} 
                        onClick={handleCloseUserMenu}
                        component={RouterLink}
                        to={item.path}
                      >
                        {item.icon && (
                          <Box component="span" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                            {item.icon}
                          </Box>
                        )}
                        <Typography textAlign="center">{item.name}</Typography>
                      </MenuItem>
                    ))}
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                sx={{ ml: 2, display: { xs: 'none', sm: 'block' } }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;