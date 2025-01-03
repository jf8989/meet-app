// src/components/CitySearch.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const CitySearch = ({ allLocations = [] }) => {
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
                        <li key={index}>{suggestion}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};
CitySearch.propTypes = {
    allLocations: PropTypes.arrayOf(PropTypes.string)
};

export default CitySearch;