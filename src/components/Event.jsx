// src/components/Event.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDateTime } from '../utils';
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <li className="event">
            <h2>{event.summary}</h2>
            <p className="event-date">
                <FaCalendarAlt /> {formatDateTime(event.created)}
            </p>
            <p className="event-location">
                <FaMapMarkerAlt /> {event.location}
            </p>
            <button
                className="details-btn"
                onClick={() => setShowDetails(!showDetails)}
            >
                {showDetails ? 'Hide Details' : 'Show Details'}
                {!showDetails && <FaInfoCircle className="details-icon" />}
            </button>

            <div className={`details ${showDetails ? 'expanded' : ''}`}>
                <p>{event.description}</p>
            </div>
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