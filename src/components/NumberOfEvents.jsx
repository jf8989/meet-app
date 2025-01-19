// src/components/NumberOfEvents.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const NumberOfEvents = ({ setCurrentNOE }) => {
    const [query, setQuery] = useState("32");

    const handleInputChanged = (event) => {
        const value = event.target.value;
        if (parseInt(value) >= 1 && parseInt(value) <= 99) {
            setQuery(value);
            setCurrentNOE(value);
        } else {
            setQuery("32");
            setCurrentNOE("32");
        }
    };

    return (
        <div id="number-of-events" className="number-of-events">
            <input
                type="number"
                className="event-number-input"
                value={query}
                onChange={handleInputChanged}
                min="1"
                max="99"
            />
        </div>
    );
};
NumberOfEvents.propTypes = {
    setCurrentNOE: PropTypes.func.isRequired,
};

export default NumberOfEvents;
