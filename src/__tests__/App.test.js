// src/__tests__/App.test.js

// Importing necessary testing utilities
import { render } from '@testing-library/react';  // Helps us render React components in tests
import '@testing-library/jest-dom';              // Adds helpful matchers for testing DOM elements
import App from '../App';                        // The component we're testing
import { test, expect } from '@jest/globals';    // Jest's test functions

// This test checks if our event list section exists in the app
test('renders list of events', () => {
    // Render the App component and get its first child element
    const AppDOM = render(<App />).container.firstChild;

    // Check if an element with id="event-list" exists in our rendered component
    // This test passes because EventList component creates a div with this ID
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
});