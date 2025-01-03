// src/components/Event.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <li className="event">
            <h2>{event.title || event.summary}</h2>
            <p className="location">{event.location}</p>
            <p className="date">{event.dateTime || event.created}</p>
            <button
                className="details-btn"
                onClick={() => setShowDetails(!showDetails)}
            >
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails && (
                <div className="event-details">
                    <p data-testid="event-description">{event.description}</p>
                </div>
            )}
        </li>
    );
};

Event.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,       // This matches mockAppEvents
        summary: PropTypes.string,                // This matches mockCalendarEvents
        location: PropTypes.string.isRequired,
        dateTime: PropTypes.string,               // This matches mockAppEvents
        created: PropTypes.string,                // This matches mockCalendarEvents
        description: PropTypes.string.isRequired
    }).isRequired
};

export default Event;