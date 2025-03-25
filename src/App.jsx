import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import InstallPWA from './components/InstallPWA';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [allEvents, setAllEvents] = useState([]); // Store ALL events from API
  const [events, setEvents] = useState([]); // Filtered events to display
  const [currentNOE, setCurrentNOE] = useState("32");
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [isLoading, setIsLoading] = useState(false);
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  // Handle number of events change WITHOUT triggering API call
  const handleNOEChange = (value) => {
    setCurrentNOE(value);

    // Just update the visible events by filtering and slicing the already fetched events
    const filteredEvents = currentCity === "See all cities"
      ? allEvents
      : allEvents.filter(event => event.location === currentCity);

    setEvents(filteredEvents.slice(0, parseInt(value)));
  };

  // This effect runs when the component mounts or when city changes
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
        const fetchedEvents = await getEvents();

        if (!isMounted) return; // Don't update state if unmounted

        if (!fetchedEvents) {
          setAllEvents([]);
          setEvents([]);
          setIsLoading(false);
          return;
        }

        // Store all events
        setAllEvents(fetchedEvents);

        // Extract locations from all events
        setAllLocations(fetchedEvents.length > 0 ? extractLocations(fetchedEvents) : []);

        // Filter events by city if needed
        const filteredEvents = currentCity === "See all cities"
          ? fetchedEvents
          : fetchedEvents.filter(event => event.location === currentCity);

        // Only show the number of events based on currentNOE
        setEvents(filteredEvents.slice(0, parseInt(currentNOE)));
        setIsLoading(false);
      } catch (error) {
        if (!isMounted) return; // Don't update state if unmounted
        console.error("Error fetching events:", error);
        setAllEvents([]);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCity]);

  return (
    <div className="App">
      <div className="app-header">
        <div className="app-title">
          <h1><span className="highlight">Meet</span> App</h1>
        </div>

        <div className="search-area">
          <div className="search-controls">
            <CitySearch
              allLocations={allLocations}
              setCurrentCity={setCurrentCity}
              setInfoAlert={setInfoAlert}
            />
            <NumberOfEvents
              setCurrentNOE={handleNOEChange}
              currentNOE={currentNOE}
              setErrorAlert={setErrorAlert}
            />
          </div>
        </div>

        <div className="install-area">
          <InstallPWA />
        </div>

        <div className="alerts-container">
          {infoAlert && <InfoAlert text={infoAlert} />}
          {errorAlert && <ErrorAlert text={errorAlert} />}
          {warningAlert && <WarningAlert text={warningAlert} />}
        </div>
      </div>

      <div className="content-container">
        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading events...</p>
          </div>
        )}

        <div className="charts-container">
          <EventGenresChart events={events} />
          <CityEventsChart allLocations={allLocations} events={events} />
        </div>

        {!isLoading && (
          <EventList
            key={`${events.length}-${currentCity}`}
            events={events}
          />
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