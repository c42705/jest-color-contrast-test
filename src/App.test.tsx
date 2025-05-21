import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the application title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Color Contrast Accessibility Testing Demo/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders the toggle button', () => {
  render(<App />);
  const toggleButton = screen.getByTestId('toggle-button');
  expect(toggleButton).toBeInTheDocument();
});

test('renders the login form', () => {
  render(<App />);
  const loginHeading = screen.getByTestId('login-heading');
  expect(loginHeading).toBeInTheDocument();
});
