// src/__tests__/App.test.js

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { test, expect } from '@jest/globals';

test('renders list of events', () => {
    const AppDOM = render(<App />).container.firstChild;
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
});