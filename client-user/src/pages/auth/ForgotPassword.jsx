import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  Paper,
} from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';

import { requestPasswordReset } from '../../store/slices/userSlice';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        const result = await dispatch(requestPasswordReset(values.email)).unwrap();
        setSubmittedEmail(values.email);
        setIsSubmitted(true);
      } catch (err) {
        setError(err.message || 'Failed to send password reset email');
      }
    },
  });

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Forgot Password
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Enter your email address and we'll send you a link to reset your password.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {isSubmitted ? (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: 'success.light',
            color: 'success.contrastText',
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EmailIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="h2">
              Email Sent
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            We've sent a password reset link to <strong>{submittedEmail}</strong>. Please check your inbox and follow the instructions to reset your password.
          </Typography>
          <Typography variant="body2">
            If you don't receive an email within a few minutes, please check your spam folder or{' '}
            <Link
              component="button"
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setError(null);
              }}
              underline="hover"
            >
              try again
            </Link>
            .
          </Typography>
        </Paper>
      ) : (
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={formik.isSubmitting}
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      )}

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Remember your password?{' '}
          <Link
            component={RouterLink}
            to="/login"
            variant="body2"
            underline="hover"
            fontWeight="bold"
          >
            Back to Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPassword;