// Search.js
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './App.css';

function Search({ searchTerm, onSearchChange }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search by event name or instructor"
        value={searchTerm}
        onChange={onSearchChange}
      />
      <div className="search-icon">
        <FaSearch />
      </div>
    </div>
  );
}

export default Search;
