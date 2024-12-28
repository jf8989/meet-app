// src/__tests__/EventList.test.js

import { render } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import EventList from '../components/EventList';

describe('<EventList /> component', () => {
    test('renders correct number of events', () => {
        const mockEvents = [
            { id: 1, title: 'Event 1' },
            { id: 2, title: 'Event 2' },
            { id: 3, title: 'Event 3' }
        ];
        const EventListComponent = render(<EventList events={mockEvents} />);
        const eventElements = EventListComponent.getAllByRole("listitem");
        expect(eventElements).toHaveLength(3);
    });
});