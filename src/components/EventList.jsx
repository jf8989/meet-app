// src/components/EventList.jsx
import Event from './Event';
import PropTypes from 'prop-types';

const EventList = ({ events = [] }) => {
    return (
        <ul id="event-list" data-testid="event-list">
            {events.map(event => (
                <Event key={event.id} event={event} />
            ))}
        </ul>
    );
};

EventList.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object)
};

export default EventList;