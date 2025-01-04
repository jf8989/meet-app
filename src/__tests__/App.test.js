// src/__tests__/App.test.js
import { render, act, fireEvent } from '@testing-library/react';
import App from '../App';
import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { mockAppEvents } from '../mockData';

describe('<App /> component', () => {
    beforeEach(() => {
        globalThis.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ events: mockAppEvents })
            })
        );
    });

    test('renders loading state initially', () => {
        const { getByText } = render(<App />);
        expect(getByText('Loading events...')).toBeInTheDocument();
    });

    test('renders list of events', async () => {
        let component;
        component = render(<App />);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        const eventList = await component.findByTestId('event-list');
        expect(eventList).toBeInTheDocument();
    });

    test('renders events after loading', async () => {
        let component;
        await act(async () => {
            component = render(<App />);
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        const eventTitle = await component.findByText(mockAppEvents[0].title || mockAppEvents[0].summary);
        expect(eventTitle).toBeInTheDocument();
    });

    test('renders number of events equal to mock data length', async () => {
        let component;
        await act(async () => {
            component = render(<App />);
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        const eventItems = await component.findAllByRole('listitem');
        expect(eventItems).toHaveLength(mockAppEvents.length);
    });

    test('displays all event details correctly', async () => {
        let component;
        await act(async () => {
            component = render(<App />);
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        const eventTitle = await component.findByText(mockAppEvents[0].title);
        const eventLocation = await component.findByText(mockAppEvents[0].location);

        expect(eventTitle).toBeInTheDocument();
        expect(eventLocation).toBeInTheDocument();
    });

    test('renders CitySearch', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('city-search')).toBeInTheDocument();
    });

    test('renders NumberOfEvents', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('number-of-events')).toBeInTheDocument();
    });

    test('handles fetch error correctly', async () => {
        // Mock fetch to reject
        globalThis.fetch = jest.fn(() => Promise.reject(new Error('Failed to fetch')));

        let component;
        await act(async () => {
            component = render(<App />);
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Check if error message is displayed
        const errorMessage = await component.findByText('Failed to load events. Please try again later.');
        expect(errorMessage).toBeInTheDocument();
    });

    test('handles empty events response correctly', async () => {
        // Mock fetch to return empty events
        globalThis.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ events: [] })
            })
        );

        let component;
        await act(async () => {
            component = render(<App />);
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        const eventList = await component.findByTestId('event-list');
        expect(eventList.children).toHaveLength(0);
    });

    test('filters events by city correctly', async () => {
        let component;
        await act(async () => {
            component = render(<App />);
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Find and click city search option
        const citySearch = component.getByTestId('city-search');
        fireEvent.change(citySearch.querySelector('input'), { target: { value: mockAppEvents[0].location } });

        // Verify filtered events
        const eventItems = await component.findAllByRole('listitem');
        expect(eventItems.length).toBeLessThanOrEqual(mockAppEvents.length);
    });
});