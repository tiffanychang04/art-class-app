import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserFriends, FaCalendarAlt, FaBell, FaUser } from 'react-icons/fa';

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/"><FaHome /></Link>
      <Link to="/friends"><FaUserFriends /></Link>
      <Link to="/schedule"><FaCalendarAlt /></Link>
      <Link to="/notifications"><FaBell /></Link>
      <Link to="/profile"><FaUser /></Link>
    </div>
  );
}

export default Navbar;