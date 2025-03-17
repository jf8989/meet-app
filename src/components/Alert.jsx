// src/components/Alert.jsx
import { Component } from 'react';
import PropTypes from 'prop-types';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.backgroundColor = null;
    }

    getStyle = () => {
        return {
            color: this.color,
            backgroundColor: this.backgroundColor,
            fontWeight: 'bold',
            borderRadius: '4px',
            padding: '8px 12px',
            margin: '10px 0',
            fontSize: '14px',
            display: 'inline-block',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)'
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

Alert.propTypes = {
    text: PropTypes.string.isRequired
};

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#ffffff'; // White text
        this.backgroundColor = '#3a86ff'; // Blue background
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#ffffff'; // White text
        this.backgroundColor = '#e63946'; // Red background
    }
}

class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#ffffff'; // White text
        this.backgroundColor = '#ff9f1c'; // Amber/orange background
    }
}

export { InfoAlert, ErrorAlert, WarningAlert };