// src/App.jsx
import EventList from './components/EventList';

// Main App component that serves as the root of our application
const App = () => {
  const mockEvents = [
    { id: 1, title: 'Event 1' },
    { id: 2, title: 'Event 2' },
    { id: 3, title: 'Event 3' }
  ];

  return (
    <div className="App">
      <EventList events={mockEvents} />
    </div>
  );
}

export default App;