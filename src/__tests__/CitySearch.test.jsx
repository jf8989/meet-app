// src/__tests__/CitySearch.test.jsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, beforeAll } from 'vitest';
import CitySearch from '../components/CitySearch';
import { extractLocations } from '../api';
import mockData from '../mock-data/mock-events';

describe('<CitySearch /> component', () => {
    let locations;

    beforeAll(() => {
        locations = extractLocations(mockData);
    });

    test('renders text input', () => {
        render(<CitySearch allLocations={locations} setCurrentCity={() => { }} />);
        const cityTextBox = screen.getByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestions list is hidden by default', () => {
        render(<CitySearch allLocations={locations} setCurrentCity={() => { }} />);
        const suggestionList = screen.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

    test('renders a list of suggestions when city textbox has input', async () => {
        const user = userEvent.setup();
        render(<CitySearch allLocations={locations} setCurrentCity={() => { }} />);

        const cityTextBox = screen.getByRole('textbox');
        await user.type(cityTextBox, 'London');

        const suggestionList = screen.queryByRole('list');
        const suggestions = within(suggestionList).queryAllByRole('listitem');

        expect(suggestionList).toBeInTheDocument();
        expect(suggestions.length).toBe(2); // Changed from 1 to 2 to account for "See all cities"
        expect(suggestions[0].textContent).toEqual('London, UK');
        expect(suggestions[1].textContent).toEqual('See all cities'); // Add this check
    });

    test('updates input value when suggestion is clicked', async () => {
        const user = userEvent.setup();
        render(<CitySearch allLocations={locations} setCurrentCity={() => { }} />);

        const cityTextBox = screen.getByRole('textbox');
        await user.type(cityTextBox, 'London');

        const suggestionList = screen.queryByRole('list');
        const suggestion = within(suggestionList).queryAllByRole('listitem')[0];
        await user.click(suggestion);

        expect(cityTextBox).toHaveValue('London, UK');
        expect(suggestionList).not.toBeInTheDocument();
    });
});