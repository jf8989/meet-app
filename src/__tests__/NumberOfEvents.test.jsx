// src/__tests__/NumberOfEvents.test.jsx
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> Component', () => {
    let setCurrentNOE;
    let setErrorAlertMock;

    beforeEach(() => {
        // Setup mocks
        setCurrentNOE = vi.fn();
        setErrorAlertMock = vi.fn();

        // Use fake timers to handle debouncing
        vi.useFakeTimers();
    });

    afterEach(() => {
        // Clean up timers
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    test('renders number input with default value of 32', () => {
        render(
            <NumberOfEvents
                setCurrentNOE={setCurrentNOE}
                currentNOE="32"
                setErrorAlert={setErrorAlertMock}
            />
        );
        const numberInput = screen.getByRole('spinbutton');
        expect(numberInput).toBeInTheDocument();
        expect(numberInput.value).toBe("32");
    });

    test('renders number input', () => {
        render(
            <NumberOfEvents
                setCurrentNOE={setCurrentNOE}
                currentNOE="32"
                setErrorAlert={setErrorAlertMock}
            />
        );
        const numberInput = screen.getByRole('spinbutton');
        expect(numberInput).toBeInTheDocument();
    });

    test('number of events updates when user types valid input', async () => {
        const user = userEvent.setup({ delay: null }); // Disable user event delays
        render(
            <NumberOfEvents
                setCurrentNOE={setCurrentNOE}
                currentNOE="32"
                setErrorAlert={setErrorAlertMock}
            />
        );

        const numberInput = screen.getByRole('spinbutton');
        await user.clear(numberInput);
        await user.type(numberInput, "10");

        // Advance timers to trigger the debounced function
        vi.advanceTimersByTime(1000); // Move past the 800ms debounce

        expect(setCurrentNOE).toHaveBeenCalledWith("10");
    });

    test('prevents invalid inputs', async () => {
        const user = userEvent.setup({ delay: null }); // Disable user event delays
        render(
            <NumberOfEvents
                setCurrentNOE={setCurrentNOE}
                currentNOE="32"
                setErrorAlert={setErrorAlertMock}
            />
        );

        const numberInput = screen.getByRole('spinbutton');
        await user.clear(numberInput);
        await user.type(numberInput, "-1");

        // No need to advance timers for error checks since they happen synchronously

        expect(setErrorAlertMock).toHaveBeenCalledWith('Number of events must be a positive number');
        expect(numberInput.value).toBe("32"); // Should reset to original value
    });

    test('resets to default on empty input blur', async () => {
        const user = userEvent.setup({ delay: null }); // Disable user event delays
        render(
            <NumberOfEvents
                setCurrentNOE={setCurrentNOE}
                currentNOE="32"
                setErrorAlert={setErrorAlertMock}
            />
        );

        const numberInput = screen.getByRole('spinbutton');
        await user.clear(numberInput);

        // Trigger blur
        numberInput.blur();

        // Advance timers to trigger any debounced handlers
        vi.advanceTimersByTime(1000);

        expect(numberInput.value).toBe("32");
        expect(setCurrentNOE).toHaveBeenCalledWith("32");
    });
});