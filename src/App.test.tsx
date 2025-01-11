import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // This enables custom matchers like `toBeInTheDocument`
import App from './App';

test('renders the To-Do List app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Welcome to the To-Do List App!/i);
  expect(headerElement).toBeInTheDocument();
});
