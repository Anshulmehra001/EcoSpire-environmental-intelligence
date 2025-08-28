import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SimpleComponent from './SimpleComponent'; // We are importing our new simple component

// Test 1: Check if our simple component renders.
test('renders the simple component without crashing', () => {
  render(<SimpleComponent />);
  const titleElement = screen.getByText(/EcoSpire Test Passed/i);
  expect(titleElement).toBeInTheDocument();
});

// Test 2: Check for the paragraph in our simple component.
test('shows the success message in the simple component', () => {
  render(<SimpleComponent />);
  const messageElement = screen.getByText(/Component rendered successfully/i);
  expect(messageElement).toBeInTheDocument();
});