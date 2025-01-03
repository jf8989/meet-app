// src/components/EventList.jsx
import { memo } from 'react';
import Event from './Event';
import PropTypes from 'prop-types';

const EventList = memo(({ events = [] }) => {
    if (!Array.isArray(events)) {
        console.error('Events prop must be an array');
        return null;
    }

    return (
        <ul id="event-list" data-testid="event-list">
            {events.map(event => (
                <Event key={event.id} event={event} />
            ))}
        </ul>
    );
});

EventList.displayName = 'EventList';

EventList.propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string,
        dateTime: PropTypes.string,
        description: PropTypes.string
    }))
};

export default EventList;