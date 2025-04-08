import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press', path: '/press' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact Us', path: '/contact' },
      ]
    },
    {
      title: 'Categories',
      links: [
        { name: 'Development', path: '/courses?category=development' },
        { name: 'Business', path: '/courses?category=business' },
        { name: 'Finance', path: '/courses?category=finance' },
        { name: 'IT & Software', path: '/courses?category=it-software' },
        { name: 'Design', path: '/courses?category=design' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'FAQs', path: '/faqs' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Affiliate Program', path: '/affiliate' },
      ]
    },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, name: 'Facebook', url: 'https://facebook.com' },
    { icon: <TwitterIcon />, name: 'Twitter', url: 'https://twitter.com' },
    { icon: <InstagramIcon />, name: 'Instagram', url: 'https://instagram.com' },
    { icon: <LinkedInIcon />, name: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: <YouTubeIcon />, name: 'YouTube', url: 'https://youtube.com' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              CourseHub
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Providing quality education and skills for everyone. Our platform offers a wide range of courses taught by expert instructors from around the world.
            </Typography>
            <Box sx={{ mt: 2 }}>
              {socialLinks.map((item) => (
                <IconButton
                  key={item.name}
                  component="a"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  sx={{ mr: 1, color: 'text.secondary' }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          {footerLinks.map((section) => (
            <Grid item xs={6} sm={4} md={2} key={section.title}>
              <Typography variant="subtitle1" color="text.primary" gutterBottom>
                {section.title}
              </Typography>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.links.map((link) => (
                  <li key={link.name} style={{ marginBottom: '0.5rem' }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      variant="body2"
                      color="text.secondary"
                      sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mt: 6, mb: 4 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" color="text.secondary" align={isMobile ? 'center' : 'left'}>
            © {new Date().getFullYear()} CourseHub. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 2,
              mt: { xs: 2, md: 0 },
            }}
          >
            <Link href="/terms" color="text.secondary" variant="body2" sx={{ textDecoration: 'none' }}>
              Terms
            </Link>
            <Link href="/privacy" color="text.secondary" variant="body2" sx={{ textDecoration: 'none' }}>
              Privacy
            </Link>
            <Link href="/cookies" color="text.secondary" variant="body2" sx={{ textDecoration: 'none' }}>
              Cookies
            </Link>
            <Link href="/accessibility" color="text.secondary" variant="body2" sx={{ textDecoration: 'none' }}>
              Accessibility
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;