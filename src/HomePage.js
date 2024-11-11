import React from 'react';

function HomePage() {
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome back, Iris!</h1>
        <h2>Upcoming Events</h2>
      </div>
      
      <div className="upcoming-events card">
        <div className="event-details">
          <h3>Pottery with Sarah</h3>
          <p>10/29, 3:00–5:00 pm</p>
          <p>4917 Pine Street</p>
        </div>
      </div>

      <h2>Your Feed</h2>
      <div className="feed-section card">
        <p>Maya attended Portrait Drawings, hosted by George.</p>
      </div>
    </div>
  );
}

export default HomePage;