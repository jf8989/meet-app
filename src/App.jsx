// src/App.jsx
import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert'; // Update import
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState("32");
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [isLoading, setIsLoading] = useState(false);
  const [infoAlert, setInfoAlert] = useState(""); // Add info alert state
  const [errorAlert, setErrorAlert] = useState(""); // Add error alert state
  const [warningAlert, setWarningAlert] = useState(""); // Add warning alert state

  // We'll add a debounced version of setCurrentNOE
  const handleNOEChange = (value) => {
    // Loading state helps prevent multiple renders while API fetches
    setIsLoading(true);
    setCurrentNOE(value);
  };

  useEffect(() => {
    // Check online status and set warning alert if offline
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are offline. The displayed events may not be up to date.");
    }

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

    // Add event listeners for online/offline status changes
    const handleOnlineStatus = () => {
      if (navigator.onLine) {
        setWarningAlert("");
        // Re-fetch data when coming back online
        fetchData();
      } else {
        setWarningAlert("You are offline. The displayed events may not be up to date.");
      }
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <div className="app-header">
        <h1>Meet App</h1>
        {/* Add alerts container */}
        <div className="alerts-container">
          {infoAlert && <InfoAlert text={infoAlert} />}
          {errorAlert && <ErrorAlert text={errorAlert} />}
          {warningAlert && <WarningAlert text={warningAlert} />}
        </div>
        <div className="search-controls">
          <CitySearch
            allLocations={allLocations}
            setCurrentCity={setCurrentCity}
            setInfoAlert={setInfoAlert} // Pass the info alert setter
          />
          <NumberOfEvents
            setCurrentNOE={handleNOEChange}
            currentNOE={currentNOE}
            setErrorAlert={setErrorAlert} // Pass the error alert setter
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