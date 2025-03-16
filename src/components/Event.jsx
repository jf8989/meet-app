// src/components/Event.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDateTime } from '../api';

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <li className="event">
            <h2>{event.summary}</h2>
            <p className="event-date">{formatDateTime(event.created)}</p>
            <p className="event-location">{event.location}</p>
            <button
                className="details-btn"
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