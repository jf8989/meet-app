// src/components/Event.jsx
import PropTypes from 'prop-types';

const Event = ({ event }) => {
    return (
        <li>
            {event.title}
        </li>
    );
};

Event.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default Event;