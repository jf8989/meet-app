// src/__tests__/NumberOfEvents.test.jsx

import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> Component', () => {
    beforeEach(() => {
        render(<NumberOfEvents setCurrentNOE={() => { }} />);
    });

    // Scenario 1: When user hasn't specified a number, 32 is the default
    test('renders number input with default value of 32', () => {
        const numberInput = screen.getByRole('spinbutton');
        expect(numberInput).toBeInTheDocument();
        expect(numberInput.value).toBe("32");
    });

    // Test for input presence
    test('renders number input', () => {
        const numberInput = screen.getByRole('spinbutton');
        expect(numberInput).toBeInTheDocument();
    });

    // Scenario 2: User can change the number of events displayed
    test('number of events updates when user types', async () => {
        const numberInput = screen.getByRole('spinbutton');
        const user = userEvent.setup();
        await user.clear(numberInput);
        await user.type(numberInput, "10");
        expect(numberInput.value).toBe("10");
    });

    // Additional test for input validation
    test('prevents invalid inputs', async () => {
        const numberInput = screen.getByRole('spinbutton');
        const user = userEvent.setup();
        await user.clear(numberInput);
        await user.type(numberInput, "-1");
        expect(numberInput.value).toBe("32"); // Should revert to default
    });
});