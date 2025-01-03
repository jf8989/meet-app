// src/__tests__/App.test.js
import { render, act } from '@testing-library/react';
import App from '../App';
import { describe, test, expect, beforeEach, jest } from '@jest/globals';

describe('<App /> component', () => {
    beforeEach(() => {
        const mockEvents = [{
            id: 1,
            title: "Test Event",
            location: "Test Location",
            dateTime: "2024-12-28T19:00:00Z",
            description: "Test Description"
        }];

        globalThis.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ events: mockEvents })
            })
        );
    });

    test('renders loading state initially', () => {
        const { getByText } = render(<App />);
        expect(getByText('Loading events...')).toBeInTheDocument();
    });

    test('renders list of events', async () => {
        let component;

        // Render first
        component = render(<App />);

        // Then wait for loading to finish and component to update
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        // Now check for the event list
        const eventList = await component.findByTestId('event-list');
        expect(eventList).toBeInTheDocument();
    });

    test('renders events after loading', async () => {
        let component;
        await act(async () => {
            component = render(<App />);
            // Wait for all state updates and promises to resolve
            await new Promise(resolve => setTimeout(resolve, 0));
        });
        // Now find the element after all updates are complete
        const eventTitle = await component.findByText('Test Event');
        expect(eventTitle).toBeInTheDocument();
    });

    test('renders number of events equal to mock data length', async () => {
        let component;
        await act(async () => {
            component = render(<App />);
            // Wait for all state updates and promises to resolve
            await new Promise(resolve => setTimeout(resolve, 0));
        });
        // Now find the elements after all updates are complete
        const eventItems = await component.findAllByRole('listitem');
        expect(eventItems).toHaveLength(1); // matches your current mock events length
    });

    test('displays all event details correctly', async () => {
        let component;
        await act(async () => {
            component = render(<App />);
            // Wait for all state updates and promises to resolve
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Check for each piece of event information after all updates are complete
        const eventTitle = await component.findByText('Test Event');
        const eventLocation = await component.findByText('Test Location');

        expect(eventTitle).toBeInTheDocument();
        expect(eventLocation).toBeInTheDocument();
    });

    test('renders CitySearch', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('city-search')).toBeInTheDocument();
    });
});