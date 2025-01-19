// src/__tests__/EventList.test.jsx
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import EventList from '../components/EventList';
import mockData from '../mock-data/mock-events';

describe('<EventList /> component', () => {
    test('renders EventList component', () => {
        const { container } = render(<EventList events={[]} />);
        expect(container.querySelector('#event-list')).toBeTruthy();
    });

    test('renders correct number of events', () => {
        const { container } = render(<EventList events={mockData} />);
        const eventElements = container.querySelectorAll('.event');
        expect(eventElements).toHaveLength(mockData.length);
    });
});