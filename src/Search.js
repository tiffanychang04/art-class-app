// Search.js
import React from 'react';

function Search({ searchTerm, onSearchChange }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search by event name or instructor"
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
}

export default Search;
