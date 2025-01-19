// src/components/CitySearch.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';

const CitySearch = ({ allLocations }) => {
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
    };

    return (
        <div className="CitySearch">
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
                </ul>
            )}
        </div>
    );
};
CitySearch.propTypes = {
    allLocations: PropTypes.array.isRequired,
};

export default CitySearch;
