// src/components/CitySearch.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }) : [];

        setQuery(value);
        setSuggestions(filteredLocations);
        setShowSuggestions(true);

        // Add InfoAlert handling
        if (filteredLocations.length === 0) {
            setInfoAlert('We cannot find the city you are looking for. Please try another city');
        } else {
            setInfoAlert('');
        }
    };

    // Add this new handler for input focus
    const handleInputFocus = () => {
        setSuggestions(allLocations || []);
        setShowSuggestions(true);
        setInfoAlert(''); // Clear any info alerts when focusing
    };

    const handleItemClicked = (suggestion) => {
        setQuery(suggestion);
        setShowSuggestions(false);
        setCurrentCity(suggestion);
        setInfoAlert(''); // Clear any alerts when a city is selected
    };

    return (
        <div id="city-search" className="CitySearch">
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                value={query}
                onFocus={handleInputFocus} // Add this line
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onChange={handleInputChanged}
            />
            {showSuggestions && (
                <ul className="suggestions">
                    {suggestions.length > 0 ? (
                        suggestions.map((suggestion) => (
                            <li
                                key={suggestion}
                                onClick={() => handleItemClicked(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))
                    ) : (
                        <li className="no-suggestions">No cities found</li>
                    )}
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
    setInfoAlert: PropTypes.func.isRequired // Add PropTypes for setInfoAlert
};

export default CitySearch;