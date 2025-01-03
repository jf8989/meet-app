// src/components/NumberOfEvents.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const NumberOfEvents = ({ setEventCount }) => {
    const [number, setNumber] = useState(32);
    const [error, setError] = useState('');

    const handleInputChanged = (event) => {
        const value = parseInt(event.target.value) || 32; // Default to 32 if NaN

        if (value < 1 || value > 100) {
            setError('Number must be between 1 and 100');
            return;
        }

        setError('');
        setNumber(value);
        setEventCount(value);
    };

    return (
        <div data-testid="number-of-events">
            <input
                type="number"
                value={number}
                onChange={handleInputChanged}
                min={1}
                max={100}
            />
            {error && <p className="error">{error}</p>}
        </div>
    );
};

NumberOfEvents.propTypes = {
    setEventCount: PropTypes.func.isRequired
};

export default NumberOfEvents;