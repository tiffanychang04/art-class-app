import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserFriends, FaCalendarPlus, FaSearch, FaUser } from 'react-icons/fa';

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/"><FaHome /></Link>
      <Link to="/friends"><FaUserFriends /></Link>
      <Link to="/create"><FaCalendarPlus /></Link>
      <Link to="/schedule"><FaSearch /></Link>
      <Link to="/profile"><FaUser /></Link>
    </div>
  );
}

export default Navbar;