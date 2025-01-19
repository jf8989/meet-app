// src/__tests__/Event.test.jsx

import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import mockData from '../mock-data/mock-events';

describe('<Event /> Component', () => {
    const event = mockData[0];

    beforeEach(() => {
        render(<Event event={event} />);
    });

    // Scenario 1: Event element is collapsed by default
    test('renders event title', () => {
        expect(screen.getByText(event.summary)).toBeTruthy();
    });

    test('renders event start time', () => {
        expect(screen.getByText(event.created)).toBeTruthy();
    });

    test('renders event location', () => {
        expect(screen.getByText(event.location)).toBeTruthy();
    });

    test('renders event details button with "Show Details" as default', () => {
        expect(screen.getByText('Show Details')).toBeTruthy();
    });

    test('event details are hidden by default', () => {
        const details = screen.queryByText(event.description);
        expect(details).not.toBeInTheDocument();
    });

    // Scenario 2: User can expand event to see details
    test('shows details section when user clicks "Show Details" button', async () => {
        const user = userEvent.setup();
        const showDetailsButton = screen.getByText('Show Details');
        await user.click(showDetailsButton);

        const details = screen.getByText(event.description);
        expect(details).toBeTruthy();
        expect(screen.getByText('Hide Details')).toBeTruthy();
    });

    // Scenario 3: User can collapse event to hide details
    test('hides details section when user clicks "Hide Details" button', async () => {
        const user = userEvent.setup();
        const showDetailsButton = screen.getByText('Show Details');
        await user.click(showDetailsButton);

        const hideDetailsButton = screen.getByText('Hide Details');
        await user.click(hideDetailsButton);

        const details = screen.queryByText(event.description);
        expect(details).not.toBeInTheDocument();
        expect(screen.getByText('Show Details')).toBeTruthy();
    });
});