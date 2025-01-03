// src/__tests__/EventList.test.js
import { render } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import EventList from '../components/EventList';

describe('<EventList /> component', () => {
    // Your existing test - keep exactly as is
    test('renders correct number of events', () => {
        const mockEvents = [
            {
                id: 1,
                title: 'Event 1',
                location: 'Location 1',
                dateTime: '2024-12-28T19:00:00Z',
                description: 'Description 1'
            },
            {
                id: 2,
                title: 'Event 2',
                location: 'Location 2',
                dateTime: '2024-12-28T19:00:00Z',
                description: 'Description 2'
            },
            {
                id: 3,
                title: 'Event 3',
                location: 'Location 3',
                dateTime: '2024-12-28T19:00:00Z',
                description: 'Description 3'
            }
        ];
        const EventListComponent = render(<EventList events={mockEvents} />);
        const eventElements = EventListComponent.getAllByRole("listitem");
        expect(eventElements).toHaveLength(3);
    });

    // Add these new tests
    test('renders empty list when no events are passed', () => {
        const { getByTestId } = render(<EventList />);
        const list = getByTestId('event-list');
        expect(list).toBeInTheDocument();
        expect(list.children).toHaveLength(0);
    });

    test('renders list with correct data-testid', () => {
        const { getByTestId } = render(<EventList />);
        expect(getByTestId('event-list')).toBeInTheDocument();
    });

    test('renders events with correct content', () => {
        const mockEvent = [{
            id: 1,
            title: 'Test Event',
            location: 'Test Location',
            dateTime: '2024-12-28T19:00:00Z',
            description: 'Test Description'
        }];

        const { getByText } = render(<EventList events={mockEvent} />);
        expect(getByText('Test Event')).toBeInTheDocument();
    });
});