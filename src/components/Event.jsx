// src/components/Event.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <li className="event">
            <h2>{event.summary}</h2>
            <p className="location">{event.location}</p>
            <p className="date">{event.created}</p>
            <button
                className="details-btn"
                onClick={() => setShowDetails(!showDetails)}
            >
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails && (
                <div className="event-details">
                    <p>{event.description}</p>
                </div>
            )}
        </li>
    );
};

Event.propTypes = {
    event: PropTypes.shape({
        summary: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        created: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default Event;