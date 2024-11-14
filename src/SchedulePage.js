import React, { useState, useEffect } from 'react';
import { FaPaintBrush, FaPencilAlt, FaCamera } from 'react-icons/fa'; // Import category icons
import { GiPaintedPottery } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
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

  // Filter items based on search, category, and date filters
  useEffect(() => {
    const filtered = items.filter((event) => {
      const matchesCategory = categoryFilter ? event.category === categoryFilter : true;
      const eventDate = new Date(event.start_datetime);
      const matchesDateRange = (
        (dateFilterStart ? new Date(dateFilterStart) <= eventDate : true) &&
        (dateFilterEnd ? new Date(dateFilterEnd) >= eventDate : true)
      );
      const matchesSearch = searchTerm === "" || 
                            event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch && matchesCategory && matchesDateRange;
    });

    setFilteredItems(filtered);
  }, [searchTerm, categoryFilter, dateFilterStart, dateFilterEnd]);

  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
  };

  
    // Handle search term change
    const handleSearch = (event) => {
      const query = event.target.value;
      setSearchTerm(query);
    };

    const [isPopupVisible, setPopupVisible] = useState(false); // State to toggle popup visibility
  const [startTime, setStartTime] = useState(0); // Start time in minutes
  const [endTime, setEndTime] = useState(1440); // End time in minutes

  // Convert time in minutes to HH:MM format
  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  };

  // Function to toggle popup visibility
  const togglePopup = () => {
    setPopupVisible((prev) => !prev);
  };

  // Close the popup when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.popup') && !e.target.closest('button')) {
      setPopupVisible(false);
    }
  };

  // Add event listener to handle click outside
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className="schedule-page">
      <h2>Search Events</h2>
      <Search searchTerm={searchTerm} onSearchChange={handleSearch} />
      
      {/* Date Range Filter */}
      <div className="date-range-filter">
        <div className="date-labels">
          <label htmlFor="start-date">Start Date</label>
          <label htmlFor="end-date">End Date</label>
        </div>
        <div className="date-inputs">
          <input
            type="date"
            value={dateFilterStart}
            onChange={(e) => setDateFilterStart(e.target.value)}
          />
          <input
            type="date"
            value={dateFilterEnd}
            onChange={(e) => setDateFilterEnd(e.target.value)}
          />
        </div>
      </div>

      {/* Search by Class Type with Icons */}
      <h2>Search by Class Type</h2>

      <div className="category-icons">
        <div id="painting-icon">
        <button onClick={() => handleCategoryClick("Painting")}>
          <FaPaintBrush size={18} />
        </button>
        <p>Painting</p>
        </div>
        <div id="sculpture-icon">
        <button onClick={() => handleCategoryClick("Sculpture")}>
          <GiPaintedPottery size={20} />
        </button>
        <p>Sculpture</p>
        </div>
        <div>
        <button onClick={() => handleCategoryClick("Drawing")}>
          <FaPencilAlt size={18} />
        </button>
        <p>Drawing</p>
        </div>
        <div>
        <button onClick={() => handleCategoryClick("Photography")}>
          <FaCamera size={18} />
        </button>
        <p>Photography</p>
        </div>
      </div>

      <div className="filters">
        <button>
          <span>Sort by</span>
          <RiArrowDropDownLine size={20}/>
        </button>

        <button onClick={togglePopup}>
        <span>Time</span>
          <RiArrowDropDownLine size={20}/>
        </button>

        {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div>
              <label>Start Time: {convertMinutesToTime(startTime)}</label>
              <input
                type="range"
                min="0"
                max="1440"
                value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))}
              />
            </div>

            <div>
              <label>End Time: {convertMinutesToTime(endTime)}</label>
              <input
                type="range"
                min="0"
                max="1440"
                value={endTime}
                onChange={(e) => setEndTime(Number(e.target.value))}
              />
            </div>

            <button onClick={() => setPopupVisible(false)}>Apply</button>
          </div>
        </div>
      )}

        <button>
        <span>Distance</span>
          <RiArrowDropDownLine size={20}/>
        </button>
      </div>

      {/* Nearby Events */}
      <h2>Nearby Events</h2>
      <div className="nearby-events">
        {filteredItems.length > 0 ? (
          filteredItems.map((event, index) => (
            <EventCard 
              key={index} 
              event={event} 
              isRegistered={registeredEvents.some(e => e.name === event.name)}
              onRegister={() => addEvent(event)}
              onUnregister={() => removeEvent(event)}
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
