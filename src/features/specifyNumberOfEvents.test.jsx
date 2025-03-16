import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user hasn\'t specified a number, 32 events are shown by default', ({ given, when, then }) => {
        given('the user has not specified a number of events', () => {
            // Default state - no action needed
        });

        when('the user views the events list', async () => {
            render(<App />);

            // Wait for events to load
            await waitFor(() => {
                const eventElements = screen.getAllByRole('listitem');
                expect(eventElements.length).toBeGreaterThan(0);
            });
        });

        then(/^(\d+) events should be shown by default$/, (arg0) => {
            const numberOfEventsInput = screen.getByRole('spinbutton');
            expect(numberOfEventsInput.value).toBe(arg0);
        });
    });

    test('User can change the number of events displayed', ({ given, when, then }) => {
        given('the user is viewing the events list', async () => {
            render(<App />);

            // Wait for events to load
            await waitFor(() => {
                const eventElements = screen.getAllByRole('listitem');
                expect(eventElements.length).toBeGreaterThan(0);
            });
        });

        when('the user specifies a new number of events', async () => {
            const numberOfEventsInput = screen.getByRole('spinbutton');
            await userEvent.clear(numberOfEventsInput);
            await userEvent.type(numberOfEventsInput, "10");
        });

        then('the number of events displayed should match the user\'s input', async () => {
            const numberOfEventsInput = screen.getByRole('spinbutton');
            expect(numberOfEventsInput.value).toBe("10");

            // Wait for the event list to update
            await waitFor(() => {
                const eventElements = screen.getAllByRole('listitem');
                expect(eventElements.length).toBeLessThanOrEqual(10);
            });
        });
    });
});