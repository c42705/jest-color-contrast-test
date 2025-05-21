import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import { Box, Button, Typography, Container } from '@mui/material';

function App() {
  const [variant, setVariant] = useState<'accessible' | 'inaccessible'>('accessible');

  const toggleVariant = () => {
    setVariant(prev => prev === 'accessible' ? 'inaccessible' : 'accessible');
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Color Contrast Accessibility Testing Demo
          </Typography>

          <Button
            variant="outlined"
            onClick={toggleVariant}
            sx={{ mb: 3 }}
            data-testid="toggle-button"
          >
            Switch to {variant === 'accessible' ? 'Inaccessible' : 'Accessible'} Version
          </Button>

          <Typography variant="body1" gutterBottom>
            Current version: <strong>{variant}</strong>
          </Typography>
        </Box>

        <LoginForm variant={variant} />
      </Container>
    </div>
  );
}

export default App;
