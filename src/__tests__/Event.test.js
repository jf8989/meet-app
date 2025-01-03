// src/__tests__/Event.test.js
import { render, fireEvent } from '@testing-library/react';
import Event from '../components/Event';
import { describe, test, expect } from '@jest/globals';
import { mockCalendarEvents, transformGoogleEventToAppEvent } from '../mockData';

describe('<Event /> component', () => {
    const mockEvent = transformGoogleEventToAppEvent(mockCalendarEvents[0]);

    test('renders event title', () => {
        const { getByText } = render(<Event event={mockEvent} />);
        expect(getByText(mockEvent.title)).toBeInTheDocument();
    });

    test('toggles event details when clicked', () => {
        const { getByText, queryByTestId } = render(<Event event={mockEvent} />);

        // Initially description should not be visible
        expect(queryByTestId('event-description')).not.toBeInTheDocument();

        // Click show details button
        const button = getByText('Show Details');
        fireEvent.click(button);

        // Description should now be visible
        expect(queryByTestId('event-description')).toBeInTheDocument();
    });

    test('renders event start time', () => {
        const { getByText } = render(<Event event={mockEvent} />);
        expect(getByText(mockEvent.dateTime)).toBeInTheDocument();
    });

    test('renders event location', () => {
        const { getByText } = render(<Event event={mockEvent} />);
        expect(getByText(mockEvent.location)).toBeInTheDocument();
    });

    test('renders event details button with "show details" as default', () => {
        const { getByText } = render(<Event event={mockEvent} />);
        expect(getByText('Show Details')).toBeInTheDocument();
    });

    test('shows details section when "show details" button is clicked', () => {
        const { getByText, queryByTestId } = render(<Event event={mockEvent} />);
        const button = getByText('Show Details');

        // Initially, description should not be visible
        expect(queryByTestId('event-description')).not.toBeInTheDocument();

        // Click button to show details
        fireEvent.click(button);

        // Description should now be visible
        expect(queryByTestId('event-description')).toBeInTheDocument();
        // Button text should change
        expect(getByText('Hide Details')).toBeInTheDocument();
    });

    test('hides details section when "hide details" button is clicked', () => {
        const { getByText, queryByTestId } = render(<Event event={mockEvent} />);
        const showButton = getByText('Show Details');

        // Show details first
        fireEvent.click(showButton);
        const hideButton = getByText('Hide Details');

        // Hide details
        fireEvent.click(hideButton);

        // Description should be hidden
        expect(queryByTestId('event-description')).not.toBeInTheDocument();
        // Button text should change back
        expect(getByText('Show Details')).toBeInTheDocument();
    });
});