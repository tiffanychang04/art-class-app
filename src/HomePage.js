// HomePage.js
import React from 'react';
import { useRegisteredEvents } from './RegisteredEventsContext'; // Import the context hook
import EventCard from './EventCard'; // Import the EventCard component

function HomePage() {
  const { registeredEvents, addEvent, removeEvent } = useRegisteredEvents(); // Access registered events from context
  const getInitials = (name) => {
    return name.split(' ').map((part) => part[0]).join('');
  };

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome back, Iris!</h1>
        <h2>Your Upcoming Events</h2>
      </div>

      <div className="registered-events">
        {registeredEvents.length > 0 ? (
          registeredEvents.map((event, index) => {
            // Format start time and end time like before
            // const startDate = new Date(event.start_datetime);
            // const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            // const formattedStartTime = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            // const endDate = new Date(startDate.getTime() + event.duration * 60 * 60 * 1000);
            // const formattedEndTime = endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

            return (
            <EventCard 
              key={index} 
              event={event} 
              isRegistered={registeredEvents.some(e => e.name === event.name)}
              onRegister={() => addEvent(event)}
              onUnregister={() => removeEvent(event)}
            />
            );
          })
        ) : (
          <p>No registered events.</p>
        )}
      </div>

      <h2>Your Feed</h2>
      <div className="feed-section card">
      <div className="activity-item">
      <div className="initials-circle">{getInitials("Maya Johnson")}</div>
        <p>Maya attended Portrait Drawings, hosted by George.</p>
      </div>
      </div>

    </div>
  );
}

export default HomePage;
