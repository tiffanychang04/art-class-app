import React, { useState } from 'react';

function ProfilePage() {
  const [username, setUsername] = useState('Iris');
  const [hometown, setHometown] = useState('San Francisco');

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      <div className="profile-info card">
        <p>Username: {username}</p>
        <button onClick={() => setUsername(prompt('New Username:', username))}>
          Edit Username
        </button>
        <p>Hometown: {hometown}</p>
        <button onClick={() => setHometown(prompt('New Hometown:', hometown))}>
          Edit Hometown
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;