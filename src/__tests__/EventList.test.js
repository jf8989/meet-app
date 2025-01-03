// src/__tests__/EventList.test.js
import { render } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import EventList from '../components/EventList';
import { mockAppEvents } from '../mockData';

describe('<EventList /> component', () => {
    test('renders correct number of events', () => {
        const EventListComponent = render(<EventList events={mockAppEvents} />);
        const eventElements = EventListComponent.getAllByRole("listitem");
        expect(eventElements).toHaveLength(mockAppEvents.length);
    });

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
        const { getByText } = render(<EventList events={[mockAppEvents[0]]} />);
        expect(getByText(mockAppEvents[0].title || mockAppEvents[0].summary)).toBeInTheDocument();
    });
});