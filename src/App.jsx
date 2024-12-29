// src/App.jsx
import { useState, useEffect } from 'react';
import EventList from './components/EventList';

const App = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        'https://vyolkxwvs3.execute-api.eu-central-1.amazonaws.com/dev/api/get-events'
      );
      const json = await response.json();
      setEvents(json.events || []); // Add fallback empty array
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setEvents([]); // Set empty array on error
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div>Loading events...</div>
      ) : (
        <EventList events={events} />
      )}
    </div>
  );
};

export default App;