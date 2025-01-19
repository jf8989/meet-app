// src/__tests__/NumberOfEvents.test.jsx
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> Component', () => {
    let setCurrentNOE;

    beforeEach(() => {
        setCurrentNOE = vi.fn();
    });

    test('renders number input with default value of 32', () => {
        render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);
        const numberInput = screen.getByRole('spinbutton');
        expect(numberInput).toBeInTheDocument();
        expect(numberInput.value).toBe("32");
    });

    test('renders number input', () => {
        render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);
        const numberInput = screen.getByRole('spinbutton');
        expect(numberInput).toBeInTheDocument();
    });

    test('number of events updates when user types', async () => {
        const user = userEvent.setup();
        render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);
        const numberInput = screen.getByRole('spinbutton');

        await user.type(numberInput, "10", { initialSelectionStart: 0, initialSelectionEnd: 2 });

        expect(numberInput.value).toBe("10");
        expect(setCurrentNOE).toHaveBeenCalledWith("10");
    });

    test('prevents invalid inputs', async () => {
        const user = userEvent.setup();
        render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);
        const numberInput = screen.getByRole('spinbutton');

        // Type an invalid value and trigger change
        await user.clear(numberInput);
        await user.type(numberInput, "-1");
        // Trigger blur to ensure state updates
        numberInput.blur();

        expect(numberInput.value).toBe("32");
        expect(setCurrentNOE).toHaveBeenCalledWith("32");
    });
});