import React from 'react';

function NotificationPage() {
  return (
    <div className="notification-page">
      <h2>Messages</h2>
      <div className="messages card">
        <p>You have a new message from Jane!</p>
      </div>

      <h2>Reminders</h2>
      <div className="reminders card">
        <p>Don't forget your pottery class on Nov 20!</p>
      </div>

      <h4> No other new activity</h4>
    </div>
  );
}

export default NotificationPage;