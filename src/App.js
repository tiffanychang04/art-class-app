import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RegisteredEventsProvider } from './RegisteredEventsContext'; // Import the context provider
import Navbar from './Navbar';
import HomePage from './HomePage';
import FriendsPage from './FriendsPage';
import SchedulePage from './SchedulePage';
import CreateEventForm from './CreateEventForm';
import ProfilePage from './ProfilePage';
import './App.css';

function App() {
  return (
    <RegisteredEventsProvider>
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/create" element={<CreateEventForm />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
    </RegisteredEventsProvider>
  );
}

export default App;