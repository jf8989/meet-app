// src/__tests__/NumberOfEvents.test.jsx
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

// Simple wait function to handle debouncing
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('<NumberOfEvents /> Component', () => {
    let setCurrentNOE;
    let setErrorAlertMock;

    beforeEach(() => {
        setCurrentNOE = vi.fn();
        setErrorAlertMock = vi.fn();
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

    // Increase timeout to 10000ms
    test('number of events updates when user types valid input', async () => {
        const user = userEvent.setup();
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

        // Wait for the debounce timeout to complete
        await wait(1000); // Slightly longer than the 800ms debounce

        expect(setCurrentNOE).toHaveBeenCalledWith("10");
    }, 10000); // Increased timeout to 10 seconds

    // Increase timeout to 10000ms
    test('prevents invalid inputs', async () => {
        const user = userEvent.setup();
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

        // Wait a bit for any async updates
        await wait(100);

        expect(setErrorAlertMock).toHaveBeenCalledWith('Number of events must be a positive number');
    }, 10000); // Increased timeout to 10 seconds

    // Increase timeout to 10000ms
    test('resets to default on empty input blur', async () => {
        const user = userEvent.setup();
        render(
            <NumberOfEvents
                setCurrentNOE={setCurrentNOE}
                currentNOE="32"
                setErrorAlert={setErrorAlertMock}
            />
        );

        const numberInput = screen.getByRole('spinbutton');
        await user.clear(numberInput);
        numberInput.blur();

        // Wait for any blur handlers to complete
        await wait(100);

        expect(numberInput.value).toBe("32");
    }, 10000); // Increased timeout to 10 seconds
});