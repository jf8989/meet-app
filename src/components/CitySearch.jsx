// src/components/CitySearch.jsx
import { useState } from 'react';

const CitySearch = () => {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        setShowSuggestions(value.length > 0);
    };

    return (
        <div data-testid="city-search">
            <input
                type="text"
                placeholder="Search for a city"
                value={query}
                onChange={handleInputChange}
            />
            {showSuggestions && (
                <ul>
                    {/* We'll add suggestions here in the next iteration */}
                    <li>Suggestion 1</li>
                    <li>Suggestion 2</li>
                </ul>
            )}
        </div>
    );
};

export default CitySearch;