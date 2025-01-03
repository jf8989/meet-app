// src/__tests__/NumberOfEvents.test.js
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import { describe, test, expect, jest } from '@jest/globals';

describe('<NumberOfEvents /> component', () => {
    test('contains an input textbox', () => {
        const { getByRole } = render(<NumberOfEvents setEventCount={() => { }} />);
        const input = getByRole('spinbutton');
        expect(input).toBeInTheDocument();
    });

    test('default number of events is 32', () => {
        const { getByRole } = render(<NumberOfEvents setEventCount={() => { }} />);
        const input = getByRole('spinbutton');
        expect(input).toHaveValue(32);
    });

    test('updates number of events when user types', async () => {
        const setEventCount = jest.fn();
        const { getByRole } = render(<NumberOfEvents setEventCount={setEventCount} />);
        const input = getByRole('spinbutton');

        await userEvent.type(input, '{backspace}{backspace}10');

        expect(input).toHaveValue(10);
        expect(setEventCount).toHaveBeenCalledWith(10);
    });

    test('shows error for invalid number', () => {
        const { getByRole, getByText } = render(<NumberOfEvents setEventCount={() => { }} />);
        const input = getByRole('spinbutton');

        fireEvent.change(input, { target: { value: -1 } });

        expect(getByText('Number must be between 1 and 100')).toBeInTheDocument();
    });
});