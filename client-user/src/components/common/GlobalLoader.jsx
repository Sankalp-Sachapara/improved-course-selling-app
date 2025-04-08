import React from 'react';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';

const GlobalLoader = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 3,
          px: 4,
          borderRadius: 2,
        }}
      >
        <CircularProgress size={50} thickness={4} />
        <Typography
          variant="body1"
          sx={{ mt: 2, fontWeight: 500 }}
        >
          {message}
        </Typography>
      </Paper>
    </Box>
  );
};

export default GlobalLoader;