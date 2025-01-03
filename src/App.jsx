// src/App.jsx
import { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [eventCount, setEventCount] = useState(32); // Default event count
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

  const handleCitySelect = (city) => {
    setCurrentCity(city);
  };

  const filterEventsByCity = (events, city) => {
    if (city === 'all') return events;
    return events.filter(event => event.location === city);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="App">
      <CitySearch
        allLocations={Array.from(new Set(events.map(event => event.location)))}
        onSelectCity={handleCitySelect}
      />
      <NumberOfEvents eventCount={eventCount} setEventCount={(count) => setEventCount(count)} />
      {error && <div className="error-alert">{error}</div>}
      {isLoading ? (
        <div>Loading events...</div>
      ) : (
        <EventList events={filterEventsByCity(events, currentCity)} />
      )}
    </div>
  );
};

export default App;