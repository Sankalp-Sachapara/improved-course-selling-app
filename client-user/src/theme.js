import { createTheme } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB', // Blue
      light: '#60A5FA',
      dark: '#1E40AF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#10B981', // Green
      light: '#6EE7B7',
      dark: '#047857',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#EF4444', // Red
      light: '#F87171',
      dark: '#B91C1C',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F59E0B', // Amber
      light: '#FBBF24',
      dark: '#B45309',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#3B82F6', // Light Blue
      light: '#93C5FD',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#10B981', // Green
      light: '#6EE7B7',
      dark: '#047857',
      contrastText: '#FFFFFF',
    },
    grey: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      disabled: '#9CA3AF',
    },
    divider: '#E5E7EB',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 5px rgba(0, 0, 0, 0.05), 0px 1px 8px rgba(0, 0, 0, 0.1)',
    '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 3px 6px rgba(0, 0, 0, 0.08)',
    '0px 4px 8px rgba(0, 0, 0, 0.04), 0px 5px 10px rgba(0, 0, 0, 0.06)',
    '0px 5px 12px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.06)',
    '0px 6px 16px rgba(0, 0, 0, 0.04), 0px 10px 20px rgba(0, 0, 0, 0.06)',
    '0px 7px 18px rgba(0, 0, 0, 0.04), 0px 12px 24px rgba(0, 0, 0, 0.06)',
    '0px 8px 22px rgba(0, 0, 0, 0.04), 0px 14px 28px rgba(0, 0, 0, 0.06)',
    '0px 9px 24px rgba(0, 0, 0, 0.04), 0px 16px 32px rgba(0, 0, 0, 0.06)',
    '0px 10px 28px rgba(0, 0, 0, 0.04), 0px 18px 36px rgba(0, 0, 0, 0.06)',
    '0px 11px 30px rgba(0, 0, 0, 0.04), 0px 20px 40px rgba(0, 0, 0, 0.06)',
    '0px 12px 32px rgba(0, 0, 0, 0.04), 0px 22px 44px rgba(0, 0, 0, 0.06)',
    '0px 13px 34px rgba(0, 0, 0, 0.04), 0px 24px 48px rgba(0, 0, 0, 0.06)',
    '0px 14px 36px rgba(0, 0, 0, 0.04), 0px 26px 52px rgba(0, 0, 0, 0.06)',
    '0px 15px 38px rgba(0, 0, 0, 0.04), 0px 28px 56px rgba(0, 0, 0, 0.06)',
    '0px 16px 40px rgba(0, 0, 0, 0.04), 0px 30px 60px rgba(0, 0, 0, 0.06)',
    '0px 17px 42px rgba(0, 0, 0, 0.04), 0px 32px 64px rgba(0, 0, 0, 0.06)',
    '0px 18px 44px rgba(0, 0, 0, 0.04), 0px 34px 68px rgba(0, 0, 0, 0.06)',
    '0px 19px 46px rgba(0, 0, 0, 0.04), 0px 36px 72px rgba(0, 0, 0, 0.06)',
    '0px 20px 48px rgba(0, 0, 0, 0.04), 0px 38px 76px rgba(0, 0, 0, 0.06)',
    '0px 21px 50px rgba(0, 0, 0, 0.04), 0px 40px 80px rgba(0, 0, 0, 0.06)',
    '0px 22px 52px rgba(0, 0, 0, 0.04), 0px 42px 84px rgba(0, 0, 0, 0.06)',
    '0px 23px 54px rgba(0, 0, 0, 0.04), 0px 44px 88px rgba(0, 0, 0, 0.06)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#1D4ED8',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1F2937',
          fontSize: '0.75rem',
          padding: '8px 12px',
          borderRadius: 6,
        },
        arrow: {
          color: '#1F2937',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;