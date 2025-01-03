// src/components/NumberOfEvents.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const NumberOfEvents = ({ setEventCount }) => {
    const [number, setNumber] = useState(32);
    const [error, setError] = useState('');

    const handleInputChanged = (event) => {
        // Remove the parsing initially to handle raw input
        const rawValue = event.target.value;
        const parsedValue = parseInt(rawValue);

        // Handle empty or invalid input
        if (rawValue === '' || isNaN(parsedValue)) {
            setError('Please enter a valid number');
            return;
        }

        // Check range
        if (parsedValue < 1 || parsedValue > 100) {
            setError('Number must be between 1 and 100');
            return;
        }

        // Clear error and update values
        setError('');
        setNumber(parsedValue);
        setEventCount(parsedValue);
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