import React from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper,
  ThemeProvider,
  createTheme
} from '@mui/material';

// Define theme props interface
interface ThemeProps {
  variant: 'accessible' | 'inaccessible';
}

// Create a component that demonstrates both accessible and inaccessible color contrast
const LoginForm: React.FC<ThemeProps> = ({ variant }) => {
  // Accessible theme with good color contrast
  const accessibleTheme = createTheme({
    palette: {
      primary: {
        main: '#1976d2', // Good contrast against white
      },
      secondary: {
        main: '#dc004e', // Good contrast against white
      },
      background: {
        default: '#ffffff',
        paper: '#f5f5f5',
      },
      text: {
        primary: '#000000',
        secondary: '#424242',
      },
    },
  });

  // Inaccessible theme with poor color contrast
  const inaccessibleTheme = createTheme({
    palette: {
      primary: {
        main: '#b3d4fc', // Poor contrast against white
      },
      secondary: {
        main: '#ffcccb', // Poor contrast against white
      },
      background: {
        default: '#ffffff',
        paper: '#f8f8f8',
      },
      text: {
        primary: '#a0a0a0', // Poor contrast against white
        secondary: '#c0c0c0', // Very poor contrast against white
      },
    },
  });

  // Select theme based on variant prop
  const theme = variant === 'accessible' ? accessibleTheme : inaccessibleTheme;

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mt: 8,
            backgroundColor: theme.palette.background.paper
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            color={theme.palette.text.primary}
            data-testid="login-heading"
          >
            Login
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              data-testid="email-input"
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              data-testid="password-input"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              data-testid="submit-button"
            >
              Sign In
            </Button>
            
            <Typography 
              variant="body2" 
              align="center"
              color={theme.palette.text.secondary}
              data-testid="forgot-password"
            >
              Forgot your password?
            </Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
