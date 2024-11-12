import React, { useState } from 'react';

function FriendsPage() {
  // Sample data for friend activity and potential friends
  const friendActivities = [
    { name: 'John Doe', activity: 'attended a pottery workshop.' },
    { name: 'Jane Smith', activity: 'joined a new pottery class.' },
  ];

  const potentialFriends = [
    { name: 'Emily Johnson', location: 'New York, NY' },
    { name: 'Michael Brown', location: 'Los Angeles, CA' },
    { name: 'Linda White', location: 'Chicago, IL' },
    { name: 'David Clark', location: 'San Francisco, CA' },
  ];

  // Function to get initials from a name
  const getInitials = (name) => {
    return name.split(' ').map((part) => part[0]).join('');
  };

  return (
    <div className="friends-page">
      <h2>Friend Activity</h2>
      <div className="friend-activity card">
        {friendActivities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="initials-circle">{getInitials(activity.name)}</div>
            <p>{activity.name} {activity.activity}</p>
          </div>
        ))}
      </div>

      <h2>Add Friends</h2>
      <div className="add-friends card">
        <input type="text" placeholder="Search for friends" />
        <button>Add Friend</button>
      </div>

      <div className="mini-profile-cards">
        {potentialFriends.map((friend, index) => (
          <div key={index} className="mini-profile-card card">
            <div className="initials-circle">{getInitials(friend.name)}</div>
            <div className="profile-details">
              <p className="profile-name">{friend.name}</p>
              <p className="profile-location">{friend.location}</p>
            </div>
            <button className="add-friend-button">Add Friend</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FriendsPage;
