// src/components/Event.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <li className="event">
            <h2>{event.summary}</h2>
            <p>{event.created}</p>
            <p>{event.location}</p>
            <button
                onClick={() => setShowDetails(!showDetails)}
            >
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>

            {showDetails && (
                <div className="details">
                    <p>{event.description}</p>
                </div>
            )}
        </li>
    );
};

Event.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        created: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default Event;