// src/__tests__/App.test.jsx

import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> Component', () => {
    test('renders list of events', () => {
        const { container } = render(<App />);
        const eventList = container.querySelector('#event-list');
        expect(eventList).toBeTruthy();
    });

    test('renders CitySearch', () => {
        const { container } = render(<App />);
        const citySearch = container.querySelector('#city-search');
        expect(citySearch).toBeTruthy();
    });

    test('renders NumberOfEvents', () => {
        const { container } = render(<App />);
        const numberOfEvents = container.querySelector('#number-of-events');
        expect(numberOfEvents).toBeTruthy();
    });
});