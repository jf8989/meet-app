// src/components/EventList.jsx
import PropTypes from 'prop-types';
import Event from './Event';

const EventList = ({ events }) => {
    return (
        <ul id="event-list" className="event-list">
            {events.map(event => (
                <Event key={event.id} event={event} />
            ))}
        </ul>
    );
};

EventList.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            summary: PropTypes.string.isRequired,
            created: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })
    ).isRequired
};

export default EventList;