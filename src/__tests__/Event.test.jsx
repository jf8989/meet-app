// src/__tests__/Event.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, beforeEach } from 'vitest';
import Event from '../components/Event';
import mockData from '../mock-data/mock-events';

describe('<Event /> component', () => {
    let eventComponent;
    const event = mockData[0];

    beforeEach(() => {
        eventComponent = render(<Event event={event} />);
    });

    test('renders event title', () => {
        expect(screen.getByText(event.summary)).toBeInTheDocument();
    });

    test('renders event start time', () => {
        expect(screen.getByText(event.created)).toBeInTheDocument();
    });

    test('renders event location', () => {
        expect(screen.getByText(event.location)).toBeInTheDocument();
    });

    test('renders event details button with "Show Details" as default', () => {
        expect(screen.getByText('Show Details')).toBeInTheDocument();
    });

    test('by default, event details section should be hidden', () => {
        const details = screen.queryByText(event.description);
        expect(details).not.toBeInTheDocument();
    });

    test('shows details section when user clicks "Show Details" button', async () => {
        const user = userEvent.setup();
        const button = screen.getByText('Show Details');
        await user.click(button);
        const details = screen.getByText(event.description);
        expect(details).toBeInTheDocument();
    });

    test('hides details section when user clicks "Hide Details" button', async () => {
        const user = userEvent.setup();
        const showButton = screen.getByText('Show Details');
        await user.click(showButton);
        const hideButton = screen.getByText('Hide Details');
        await user.click(hideButton);
        const details = screen.queryByText(event.description);
        expect(details).not.toBeInTheDocument();
    });
});