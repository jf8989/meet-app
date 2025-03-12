// src/components/CitySearch.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const CitySearch = ({ allLocations, setCurrentCity }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });

        setQuery(value);
        setSuggestions(filteredLocations);
        setShowSuggestions(true);
    };

    const handleItemClicked = (suggestion) => {
        setQuery(suggestion);
        setShowSuggestions(false);
        setCurrentCity(suggestion);
    };

    return (
        <div id="city-search" className="CitySearch">
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                value={query}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onChange={handleInputChanged}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((suggestion) => {
                        return (
                            <li
                                key={suggestion}
                                onClick={() => handleItemClicked(suggestion)}
                            >
                                {suggestion}
                            </li>
                        );
                    })}
                    <li key="See all cities" onClick={() => handleItemClicked("See all cities")}>
                        <b>See all cities</b>
                    </li>
                </ul>
            )}
        </div>
    );
};

CitySearch.propTypes = {
    allLocations: PropTypes.array.isRequired,
    setCurrentCity: PropTypes.func.isRequired,
};

export default CitySearch;