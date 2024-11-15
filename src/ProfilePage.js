import React, { useState } from 'react';

function ProfilePage() {
  const [username, setUsername] = useState('Sarah Leafstrand');
  const [hometown, setHometown] = useState('Philadelphia, PA');
  const [followers, setFollowers] = useState(20);
  const [following, setFollowing] = useState(34);
  const [events, setEvents] = useState(54);
  const [bio, setBio] = useState("Hi, I'm Sarah, a passionate ceramic artist and teacher who loves sharing the beauty of working with clay. My teaching philosophy revolves around making the process enjoyable, accessible, and personalized for each student, no matter their experience level. Whether you're a beginner or an experienced potter, my goal is to create a supportive space where you can experiment and create pieces you're proud of.");
  const [favoriteStyles, setFavoriteStyles] = useState('Japanese Raku Pottery, Rustic Folk Art');
  const [profilePhoto, setProfilePhoto] = useState('');

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-info card">
        {profilePhoto ? (
          <img src={profilePhoto} alt="Profile" className="profile-photo" />
        ) : (
          <img src="https://via.placeholder.com/150?text=Profile+Photo" alt="Default Profile" className="profile-photo" />
        )}
        <input type="file" onChange={handlePhotoUpload} />
        <h2 className="username">{username}</h2>
        <button onClick={() => setUsername(prompt('New Username:', username))}>
          Edit Username
        </button>
        <div className="stats">
          <div className="stat">
            <p>{followers}</p>
            <p>Followers</p>
          </div>
          <div className="stat">
            <p>{following}</p>
            <p>Following</p>
          </div>
          <div className="stat">
            <p>{events}</p>
            <p>Events</p>
          </div>
        </div>
        <p>Bio: {bio}</p>
        <button onClick={() => setBio(prompt('Edit Bio:', bio))}>
          Edit Bio
        </button>
        <p>City: {hometown}</p>
        <button onClick={() => setHometown(prompt('New Hometown:', hometown))}>
          Edit Hometown
        </button>
        <p>Favorite Art Styles: {favoriteStyles}</p>
        <button onClick={() => setFavoriteStyles(prompt('Edit Favorite Art Styles:', favoriteStyles))}>
          Edit Favorite Art Styles
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
