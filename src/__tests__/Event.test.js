// src/__tests__/Event.test.js

import { render } from '@testing-library/react';
import Event from '../components/Event';
import { describe, test, expect } from '@jest/globals';

describe('<Event /> component', () => {
    test('renders event title', () => {
        const event = {
            title: 'Test Event',
            id: 1
        };
        const EventComponent = render(<Event event={event} />);
        expect(EventComponent.getByText('Test Event')).toBeInTheDocument();
    });
});