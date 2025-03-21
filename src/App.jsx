// src/App.jsx
import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import InstallPWA from './components/InstallPWA';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState("32");
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [isLoading, setIsLoading] = useState(false);
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

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

    let isMounted = true; // Add this flag to prevent state updates after unmount

    const fetchData = async () => {
      if (!isMounted) return; // Don't proceed if component unmounted

      try {
        setIsLoading(true);
        const allEvents = await getEvents();

        if (!isMounted) return; // Don't update state if unmounted

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
        if (!isMounted) return; // Don't update state if unmounted
        console.error("Error fetching events:", error);
        setEvents([]);
        setIsLoading(false);
      }
    };

    fetchData();

    // Add event listeners for online/offline status changes
    const handleOnlineStatus = () => {
      if (!isMounted) return; // Don't update state if unmounted

      if (navigator.onLine) {
        setWarningAlert("");
        // We REMOVED the fetchData call here to prevent loops
      } else {
        setWarningAlert("You are offline. The displayed events may not be up to date.");
      }
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      isMounted = false; // Set flag to prevent state updates after unmount
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <div className="app-header">
        <div className="header-left">
          <h1><span className="highlight">Meet</span> App</h1>
          <InstallPWA />
        </div>

        <div className="header-right">
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

        {/* Alerts container positioned below the header with absolute positioning */}
        <div className="alerts-container">
          {infoAlert && <InfoAlert text={infoAlert} />}
          {errorAlert && <ErrorAlert text={errorAlert} />}
          {warningAlert && <WarningAlert text={warningAlert} />}
        </div>
      </div>

      <div className="content-container">
        <div className="charts-container">
          <CityEventsChart allLocations={allLocations} events={events} />
          <EventGenresChart events={events} />
        </div>

        {isLoading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading events...</p>
          </div>
        ) : (
          <EventList events={events} />
        )}
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2025 Meet App | Data from Google Calendar API</p>
          <div className="social-links">
            <a href="https://github.com/jf8989/meet-app" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/jfmarcenaroa/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;