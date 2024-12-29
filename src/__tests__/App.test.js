// src/__tests__/App.test.js
import { render, act } from '@testing-library/react';
import App from '../App';
import { describe, test, expect, beforeEach, jest, afterEach } from '@jest/globals';

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
        await act(async () => {
            component = render(<App />);
        });
        const eventList = await component.findByTestId('event-list');
        expect(eventList).toBeInTheDocument();
    });

    test('renders events after loading', async () => {
        let component;
        await act(async () => {
            component = render(<App />);
        });
        const eventTitle = await component.findByText('Test Event');
        expect(eventTitle).toBeInTheDocument();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});