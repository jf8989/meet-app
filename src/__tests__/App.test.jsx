// src/__tests__/App.test.jsx
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from '../App';

describe('<App /> component', () => {
    test('renders without crashing', () => {
        const { container } = render(<App />);
        expect(container).toBeTruthy();
    });
});