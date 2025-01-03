// src/components/CitySearch.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const CitySearch = ({ allLocations = [], onSelectCity }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        const filteredLocations = value ?
            allLocations.filter(location =>
                location.toLowerCase().includes(value.toLowerCase())
            ) :
            allLocations;
        setSuggestions(filteredLocations);
        setShowSuggestions(true);
    };

    const handleItemClick = (suggestion) => {
        setQuery(suggestion);
        setShowSuggestions(false);
        if (onSelectCity) {
            onSelectCity(suggestion);
        }
    };

    return (
        <div data-testid="city-search">
            <input
                type="text"
                placeholder="Search for a city"
                value={query}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleItemClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

CitySearch.propTypes = {
    allLocations: PropTypes.arrayOf(PropTypes.string),
    onSelectCity: PropTypes.func
};

export default CitySearch;