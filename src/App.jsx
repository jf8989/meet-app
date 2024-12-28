// src/App.jsx

// Importing the EventList component from the components folder
import EventList from './components/EventList';

// Main App component that serves as the root of our application
const App = () => {
  return (
    // className="App" helps identify this div as our app's container
    <div className="App">
      {/* Rendering the EventList component */}
      <EventList />
    </div>
  );
}

export default App;