// src/components/Alert.jsx
import { Component } from 'react';
import PropTypes from 'prop-types';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
    }

    getStyle = () => {
        return {
            color: this.color,
            fontWeight: 'bold',
            margin: '10px 0',
            fontSize: '14px'
        };
    }

    render() {
        return (
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

// Add PropTypes validation
Alert.propTypes = {
    text: PropTypes.string.isRequired
};

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'blue';
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'red';
    }
}

export { InfoAlert, ErrorAlert };