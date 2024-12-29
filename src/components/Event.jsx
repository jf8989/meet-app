// src/components/Event.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    const formatDateTime = (dateTimeStr) => {
        return new Date(dateTimeStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <li className="event">
            <h2>{event.title}</h2>
            <p className="location">{event.location}</p>
            <p className="date">{formatDateTime(event.dateTime)}</p>
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
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        dateTime: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default Event;