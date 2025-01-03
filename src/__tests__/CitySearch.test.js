// src/__tests__/CitySearch.test.js
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { describe, test, expect, jest } from '@jest/globals';
import { mockAppEvents } from '../mockData';

describe('<CitySearch /> component', () => {
    const allLocations = Array.from(new Set(mockAppEvents.map(event => event.location)));

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

    test('updates suggestions list when user types in city textbox', async () => {
        const { getByRole, getByPlaceholderText } = render(
            <CitySearch allLocations={allLocations} />
        );

        const cityTextBox = getByPlaceholderText('Search for a city');
        await userEvent.type(cityTextBox, 'Berlin');

        const suggestionList = getByRole('list');
        const suggestions = within(suggestionList).getAllByRole('listitem');

        const berlinSuggestions = allLocations.filter(location =>
            location.toLowerCase().includes('berlin'.toLowerCase())
        );

        expect(suggestions).toHaveLength(berlinSuggestions.length);
        suggestions.forEach((suggestion, index) => {
            expect(suggestion.textContent).toBe(berlinSuggestions[index]);
        });
    });

    test('selects a city from the suggestion list', async () => {
        const mockOnSelectCity = jest.fn();
        const { getByPlaceholderText, getAllByRole } = render(
            <CitySearch
                allLocations={allLocations}
                onSelectCity={mockOnSelectCity}
            />
        );

        const cityTextBox = getByPlaceholderText('Search for a city');
        await userEvent.type(cityTextBox, 'Berlin');

        const suggestionListItems = getAllByRole('listitem');
        await userEvent.click(suggestionListItems[0]);

        expect(cityTextBox).toHaveValue(allLocations[0]);
        expect(mockOnSelectCity).toHaveBeenCalledWith(allLocations[0]);
    });
});