// src/__tests__/CitySearch.test.js
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { describe, test, expect, jest } from '@jest/globals';

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

    test('updates suggestions list when user types in city textbox', async () => {
        const allLocations = ['Berlin, Germany', 'Paris, France', 'Berlin, New Hampshire'];
        const { getByRole, getByPlaceholderText } = render(
            <CitySearch allLocations={allLocations} />
        );

        const cityTextBox = getByPlaceholderText('Search for a city');
        await userEvent.type(cityTextBox, 'Berlin');

        const suggestionList = getByRole('list');
        const suggestions = within(suggestionList).getAllByRole('listitem');

        expect(suggestions).toHaveLength(2);
        expect(suggestions[0].textContent).toBe('Berlin, Germany');
        expect(suggestions[1].textContent).toBe('Berlin, New Hampshire');
    });

    test('renders all locations when textbox is empty', async () => {
        const allLocations = ['Berlin, Germany', 'Paris, France', 'London, UK'];
        const { getByRole, getByPlaceholderText } = render(
            <CitySearch allLocations={allLocations} />
        );

        const cityTextBox = getByPlaceholderText('Search for a city');
        await userEvent.type(cityTextBox, 'a'); // First type something
        await userEvent.clear(cityTextBox); // Then clear it

        const suggestionList = getByRole('list');
        const suggestions = within(suggestionList).getAllByRole('listitem');

        expect(suggestions).toHaveLength(allLocations.length);
        expect(suggestions.map(li => li.textContent)).toEqual(allLocations);
    });

    test('selects a city from the suggestion list', async () => {
        const allLocations = ['Berlin, Germany', 'Paris, France', 'London, UK'];
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

        // Update this line to use the correct assertion
        expect(cityTextBox).toHaveValue('Berlin, Germany');
        expect(mockOnSelectCity).toHaveBeenCalledWith('Berlin, Germany');
    });

    test('filters events by selected city', async () => {
        const allLocations = ['Berlin, Germany', 'Paris, France'];
        const onSelectCity = jest.fn();

        const { getByPlaceholderText, getAllByRole } = render(
            <CitySearch
                allLocations={allLocations}
                onSelectCity={onSelectCity}
            />
        );

        const cityTextBox = getByPlaceholderText('Search for a city');
        await userEvent.type(cityTextBox, 'Berlin');
        const berlinSuggestion = getAllByRole('listitem')[0];
        await userEvent.click(berlinSuggestion);

        expect(onSelectCity).toHaveBeenCalledWith('Berlin, Germany');
    });
});