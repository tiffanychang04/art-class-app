import React from 'react';

function FriendsPage() {
  return (
    <div className="friends-page">
      <h2>Friend Activity</h2>
      <div className="friend-activity card">
        <p>John attended a pottery workshop.</p>
      </div>

      <h2>Add Friends</h2>
      <div className="add-friends card">
        <input type="text" placeholder="Search for friends" />
        <button>Add Friend</button>
      </div>
    </div>
  );
}

export default FriendsPage;