// src/components/NumberOfEvents.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const NumberOfEvents = ({ setCurrentNOE }) => {
    const [number, setNumber] = useState(32);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setNumber(value);
        setCurrentNOE(value);
    };

    return (
        <div className="number-of-events">
            <input
                type="number"
                value={number}
                onChange={handleInputChanged}
                className="event-number-input"
            />
        </div>
    );
};
NumberOfEvents.propTypes = {
    setCurrentNOE: PropTypes.func.isRequired,
};

export default NumberOfEvents;
