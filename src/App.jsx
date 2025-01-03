// src/App.jsx
import { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';

const App = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        'https://vyolkxwvs3.execute-api.eu-central-1.amazonaws.com/dev/api/get-events'
      );
      const json = await response.json();
      setEvents(json.events || []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try again later.');
      setIsLoading(false);
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="App">
      <CitySearch /> {/* Add this line before EventList */}
      {error && <div className="error-alert">{error}</div>}
      {isLoading ? (
        <div>Loading events...</div>
      ) : (
        <EventList events={events} />
      )}
    </div>
  );
};

export default App;