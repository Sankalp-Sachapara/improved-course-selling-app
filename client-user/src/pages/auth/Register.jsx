import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Typography,
  Link,
  Box,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

import { register, resetAuthState } from '../../store/slices/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Clear any previous auth errors
    dispatch(resetAuthState());
  }, [dispatch]);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
      acceptTerms: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions'),
    }),
    onSubmit: (values) => {
      const { name, email, password } = values;
      dispatch(register({ name, email, password }));
    },
  });

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Create Account
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Sign up to access all our features and courses.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <TextField
          margin="normal"
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="normal"
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          id="confirmPassword"
          autoComplete="new-password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleToggleConfirmPasswordVisibility}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="acceptTerms"
              checked={formik.values.acceptTerms}
              onChange={formik.handleChange}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              I agree to the{' '}
              <Link component={RouterLink} to="/terms" underline="hover">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link component={RouterLink} to="/privacy" underline="hover">
                Privacy Policy
              </Link>
            </Typography>
          }
        />
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {formik.errors.acceptTerms}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2 }}
          disabled={formik.isSubmitting}
        >
          Sign Up
        </Button>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Typography variant="body2" color="text.secondary" align="center">
          Already have an account?{' '}
          <Link
            component={RouterLink}
            to="/login"
            variant="body2"
            underline="hover"
            fontWeight="bold"
          >
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;