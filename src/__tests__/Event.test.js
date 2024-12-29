// src/__tests__/Event.test.js
import { render, fireEvent } from '@testing-library/react';
import Event from '../components/Event';
import { describe, test, expect } from '@jest/globals';

describe('<Event /> component', () => {
    const mockEvent = {
        id: 1,
        title: "Test Event",
        location: "Test Location",
        dateTime: "2024-12-28T19:00:00Z",
        description: "Test Description"
    };

    test('renders event title', () => {
        const { getByText } = render(<Event event={mockEvent} />);
        expect(getByText('Test Event')).toBeInTheDocument();
    });

    test('toggles event details when clicked', () => {
        const { getByText, queryByText } = render(<Event event={mockEvent} />);

        // Initially description should not be visible
        expect(queryByText('Test Description')).not.toBeInTheDocument();

        // Click show details button
        const button = getByText('Show Details');
        fireEvent.click(button);

        // Description should now be visible
        expect(queryByText('Test Description')).toBeInTheDocument();
    });
});