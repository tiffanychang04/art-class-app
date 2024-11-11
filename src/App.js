import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import FriendsPage from './FriendsPage';
import SchedulePage from './SchedulePage';
import NotificationPage from './NotificationPage';
import ProfilePage from './ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;