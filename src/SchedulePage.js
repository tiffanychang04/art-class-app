import React, { useState, useEffect } from 'react';
import { items } from './events'; // Import the events array
import EventCard from './EventCard'; // Import the EventCard component
import Search from './Search'; // Import the Search component
import { useRegisteredEvents } from './RegisteredEventsContext'; // Import context hook for managing registered events

function SchedulePage() {
  const { registeredEvents, addEvent, removeEvent } = useRegisteredEvents(); // Access registered events and functions to add/remove events
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [categoryFilter, setCategoryFilter] = useState(''); // State for category filter
  const [dateFilterStart, setDateFilterStart] = useState(''); // State for start date filter
  const [dateFilterEnd, setDateFilterEnd] = useState(''); // State for end date filter
  const [filteredItems, setFilteredItems] = useState(items); // State for filtered events

  // This useEffect will be called whenever the searchTerm, categoryFilter, or dateFilter changes
  useEffect(() => {
    const filtered = items.filter((event) => {
      // Always check category
      const matchesCategory = categoryFilter ? event.category === categoryFilter : true;

      // Check if the event date is within the date range
      const eventDate = new Date(event.start_datetime); // Assuming event.start_datetime is in a valid date format

      // Handle start date and end date filtering
      const matchesDateRange = (
        (dateFilterStart ? new Date(dateFilterStart) <= eventDate : true) &&
        (dateFilterEnd ? new Date(dateFilterEnd) >= eventDate : true)
      );

      // Check if event matches search term
      const matchesSearch = searchTerm === "" || 
                            event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch && matchesCategory && matchesDateRange;
    });

    setFilteredItems(filtered);
  }, [searchTerm, categoryFilter, dateFilterStart, dateFilterEnd]); // Only re-filter when any of these values change

  // Handle category filter change
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategoryFilter(selectedCategory);
  };

  // Handle start date filter change
  const handleDateStartChange = (event) => {
    const selectedStartDate = event.target.value;
    setDateFilterStart(selectedStartDate);
  };

  // Handle end date filter change
  const handleDateEndChange = (event) => {
    const selectedEndDate = event.target.value;
    setDateFilterEnd(selectedEndDate);
  };

  // Handle search term change
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
  };

  return (
    <div className="schedule-page">
      <h2>Search Events</h2>
      <Search searchTerm={searchTerm} onSearchChange={handleSearch} />

      {/* Filters */}
      <div className="filters">
        <select value={categoryFilter} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="Painting">Painting</option>
          <option value="Sculpture">Sculpture</option>
          <option value="Drawing">Drawing</option>
        </select>

        {/* Date Range Filter */}
        <div className="date-range-filter">
          <label>Start Date:</label>
          <input
            type="date"
            value={dateFilterStart}
            onChange={handleDateStartChange}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={dateFilterEnd}
            onChange={handleDateEndChange}
          />
        </div>
      </div>

      <h2>Nearby Events</h2>
      <div className="nearby-events">
        {filteredItems.length > 0 ? (
          filteredItems.map((event, index) => (
            <EventCard 
              key={index} 
              event={event} 
              isRegistered={registeredEvents.some(e => e.name === event.name)} // Check if the event is already registered
              onRegister={() => addEvent(event)} // Register event
              onUnregister={() => removeEvent(event)} // Unregister event
            />
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
}

export default SchedulePage;
