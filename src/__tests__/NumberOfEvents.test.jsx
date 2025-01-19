// src/__tests__/NumberOfEvents.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    test('renders number input', () => {
        render(<NumberOfEvents setCurrentNOE={() => { }} />);
        const numberInput = screen.getByRole('spinbutton');
        expect(numberInput).toBeInTheDocument();
    });

    test('default number of events is 32', () => {
        render(<NumberOfEvents setCurrentNOE={() => { }} />);
        const numberInput = screen.getByRole('spinbutton');
        expect(numberInput.value).toBe('32');
    });

    test('updates number of events when user types', async () => {
        const setCurrentNOE = vi.fn();
        render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);
        const numberInput = screen.getByRole('spinbutton');
        await userEvent.type(numberInput, '{backspace}{backspace}10');
        expect(numberInput.value).toBe('10');
    });
});