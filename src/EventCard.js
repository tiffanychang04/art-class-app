import React from 'react';

function EventCard({ event, isRegistered, onRegister, onUnregister }) {
  // Parse the start_datetime string into a Date object
  const startDate = new Date(event.start_datetime);
  const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const formattedStartTime = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  // Calculate end time (assuming duration is in hours)
  const endDate = new Date(startDate.getTime() + event.duration * 60 * 60 * 1000);
  const formattedEndTime = endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  return (
    <div className="upcoming-events-card">
      <div className="event-details">
        <h3>{event.name} with {event.instructor}</h3>
        <p>{formattedStartDate}, {formattedStartTime}–{formattedEndTime}</p>
        <p>{event.location}</p>
        
        {/* Register or Unregister button */}
        <div className="register-button">
          {isRegistered ? (
            <button onClick={onUnregister}>Unregister</button> // Show Unregister button if registered
          ) : (
            <button onClick={onRegister}>Register</button> // Show Register button if not registered
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
