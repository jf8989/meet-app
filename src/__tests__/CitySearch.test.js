// src/__tests__/CitySearch.test.js
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { describe, test, expect } from '@jest/globals';

describe('<CitySearch /> component', () => {
    test('renders text input', () => {
        const { getByRole } = render(<CitySearch />);
        const cityTextBox = getByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
    });

    test('suggestions list is hidden by default', () => {
        const { queryByRole } = render(<CitySearch />);
        const suggestionList = queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

    test('renders a list of suggestions when city textbox has input', async () => {
        const { getByRole, getByPlaceholderText } = render(<CitySearch />);
        const cityTextBox = getByPlaceholderText('Search for a city');
        await userEvent.type(cityTextBox, 'Berlin');
        const suggestionList = getByRole('list');
        expect(suggestionList).toBeInTheDocument();
    });
});