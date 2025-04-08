import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Redux actions
import { login, resetAuthError } from '../store/slices/authSlice';

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  // Clear any previous auth errors
  useState(() => {
    dispatch(resetAuthError());
  }, [dispatch]);

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(login(values));
      
      if (!result.error) {
        navigate('/dashboard');
      }
    }
  });

  // Handle password visibility toggle
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Typography variant="h5" gutterBottom>
        Admin Login
      </Typography>
      
      <Stack spacing={3} sx={{ mt: 3 }}>
        {/* Email Field */}
        <FormControl
          fullWidth
          error={formik.touched.email && Boolean(formik.errors.email)}
        >
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <OutlinedInput
            id="email"
            name="email"
            type="email"
            label="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <FormHelperText error>{formik.errors.email}</FormHelperText>
          )}
        </FormControl>

        {/* Password Field */}
        <FormControl
          fullWidth
          error={formik.touched.password && Boolean(formik.errors.password)}
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <FormHelperText error>{formik.errors.password}</FormHelperText>
          )}
        </FormControl>

        {/* Forgot Password Link */}
        <Box sx={{ textAlign: 'right' }}>
          <Link
            component={RouterLink}
            to="/forgot-password"
            variant="body2"
            underline="hover"
          >
            Forgot password?
          </Link>
        </Box>

        {/* Error Message */}
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        {/* Register Link */}
        <Typography variant="body2" align="center">
          Don't have an account?{' '}
          <Link
            component={RouterLink}
            to="/register"
            variant="body2"
            underline="hover"
            fontWeight="bold"
          >
            Sign up
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Login;
