// src/components/NumberOfEvents.jsx
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const NumberOfEvents = ({ setCurrentNOE, currentNOE, setErrorAlert }) => {
    const [query, setQuery] = useState(currentNOE);
    const debounceTimeout = useRef(null);

    // Clear the timeout when component unmounts
    useEffect(() => {
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, []);

    // When the parent updates currentNOE, sync our local state
    useEffect(() => {
        setQuery(currentNOE);
    }, [currentNOE]);

    const handleInputChanged = (event) => {
        const value = event.target.value;

        // Check if value is valid
        if (isNaN(value) || parseInt(value) <= 0) {
            // Set error alert for invalid input
            setErrorAlert('Number of events must be a positive number');
            // Reset to a valid value
            setQuery(currentNOE);
        } else if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 99)) {
            // Valid input - clear any error alerts
            setErrorAlert('');
            setQuery(value);

            // Clear any existing timeout
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }

            // Set a new timeout to update the parent component after 800ms of inactivity
            debounceTimeout.current = setTimeout(() => {
                setCurrentNOE(value === "" ? "32" : value);
            }, 800);
        } else {
            // For other invalid input like >99, set error and reset to previous value
            setErrorAlert('Number of events must be between 1 and 99');
            setQuery(currentNOE);
        }
    };

    return (
        <div id="number-of-events" className="number-of-events">
            <label htmlFor="event-number-input">Number of Events:</label>
            <input
                id="event-number-input"
                type="number"
                className="event-number-input"
                value={query}
                onChange={handleInputChanged}
                onBlur={() => {
                    if (query === "") {
                        setQuery("32");
                        setCurrentNOE("32");
                        setErrorAlert(''); // Clear error on blur if reset to default
                    }
                }}
                min="1"
                max="99"
            />
        </div>
    );
};

NumberOfEvents.propTypes = {
    setCurrentNOE: PropTypes.func.isRequired,
    currentNOE: PropTypes.string.isRequired,
    setErrorAlert: PropTypes.func.isRequired, // Add PropTypes for setErrorAlert
};

export default NumberOfEvents;