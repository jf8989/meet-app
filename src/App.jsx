// src/App.jsx
import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState("32");
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [isLoading, setIsLoading] = useState(false);

  // We'll add a debounced version of setCurrentNOE
  const handleNOEChange = (value) => {
    // Loading state helps prevent multiple renders while API fetches
    setIsLoading(true);
    setCurrentNOE(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const allEvents = await getEvents();

        if (!allEvents) {
          setEvents([]);
          setIsLoading(false);
          return;
        }

        // Filter events by city if needed
        const filteredEvents = currentCity === "See all cities"
          ? allEvents
          : allEvents.filter(event => event.location === currentCity);

        // Update states with safeguards
        setEvents(filteredEvents ? filteredEvents.slice(0, parseInt(currentNOE)) : []);
        setAllLocations(allEvents.length > 0 ? extractLocations(allEvents) : []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <div className="app-header">
        <h1>Meet App</h1>
        <div className="search-controls">
          <CitySearch
            allLocations={allLocations}
            setCurrentCity={setCurrentCity}
          />
          <NumberOfEvents
            setCurrentNOE={handleNOEChange}
            currentNOE={currentNOE}
          />
        </div>
      </div>

      <div className="content-container">
        {isLoading ? (
          <div className="loading-indicator">Loading events...</div>
        ) : (
          <EventList events={events} />
        )}
      </div>
    </div>
  );
};

export default App;