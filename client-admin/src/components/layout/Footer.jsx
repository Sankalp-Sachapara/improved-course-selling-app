import { Box, Container, Divider, Link, Typography } from '@mui/material';

/**
 * Footer component for the admin panel
 * @returns {JSX.Element} Footer component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
      }}
    >
      <Divider sx={{ mb: 3 }} />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {currentYear} CourseHub Admin Portal. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
            <Link
              href="#"
              underline="hover"
              color="text.secondary"
              variant="body2"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              underline="hover"
              color="text.secondary"
              variant="body2"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              underline="hover"
              color="text.secondary"
              variant="body2"
            >
              Help Center
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
