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
import { register, resetAuthError } from '../store/slices/authSlice';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Clear any previous auth errors
  useState(() => {
    dispatch(resetAuthError());
  }, [dispatch]);

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      // Remove confirmPassword before sending to server
      const { confirmPassword, ...registerData } = values;
      
      const result = await dispatch(register(registerData));
      
      if (!result.error) {
        navigate('/dashboard');
      }
    }
  });

  // Handle password visibility toggle
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Typography variant="h5" gutterBottom>
        Create Admin Account
      </Typography>
      
      <Stack spacing={3} sx={{ mt: 3 }}>
        {/* Name Field */}
        <FormControl
          fullWidth
          error={formik.touched.name && Boolean(formik.errors.name)}
        >
          <InputLabel htmlFor="name">Full Name</InputLabel>
          <OutlinedInput
            id="name"
            name="name"
            label="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <FormHelperText error>{formik.errors.name}</FormHelperText>
          )}
        </FormControl>

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

        {/* Confirm Password Field */}
        <FormControl
          fullWidth
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
        >
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <OutlinedInput
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <FormHelperText error>{formik.errors.confirmPassword}</FormHelperText>
          )}
        </FormControl>

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
          {loading ? <CircularProgress size={24} /> : 'Register'}
        </Button>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        {/* Login Link */}
        <Typography variant="body2" align="center">
          Already have an account?{' '}
          <Link
            component={RouterLink}
            to="/login"
            variant="body2"
            underline="hover"
            fontWeight="bold"
          >
            Sign in
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Register;
