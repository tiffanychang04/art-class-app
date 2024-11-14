import React, { useState, useEffect } from 'react';
import { FaPaintBrush, FaPencilAlt, FaCamera } from 'react-icons/fa'; // Import category icons
import { GiPaintedPottery } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { items } from './events'; // Import the events array
import EventCard from './EventCard'; // Import the EventCard component
import Search from './Search'; // Import the Search component
import { useRegisteredEvents } from './RegisteredEventsContext'; // Import context hook for managing registered events
import Popup from './Popup'; 

function SchedulePage() {
  const { registeredEvents, addEvent, removeEvent } = useRegisteredEvents(); // Access registered events and functions to add/remove events
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [categoryFilter, setCategoryFilter] = useState(''); // State for category filter
  const [dateFilterStart, setDateFilterStart] = useState(''); // State for start date filter
  const [dateFilterEnd, setDateFilterEnd] = useState(''); // State for end date filter
  const [filteredItems, setFilteredItems] = useState(items); // State for filtered events
  const [startTime, setStartTime] = useState(0); // Start time in minutes
  const [endTime, setEndTime] = useState(1440); // End time in minutes
  const [distance, setDistance] = useState(0);
  const [selectedSortOption, setSelectedSortOption] = useState('');

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
      const eventStartMinutes = eventDate.getHours() * 60 + eventDate.getMinutes();
        const matchesTimeRange = (
        (startTime <= eventStartMinutes) &&
        (endTime >= eventStartMinutes + event.duration * 60)
      );
      const matchesDistance = distance ? event.distance <= distance : true;
      return matchesSearch && matchesCategory && matchesDateRange && matchesTimeRange && matchesDistance;
    });

    // Sorting logic based on selectedSortOption
  const sorted = [...filtered].sort((a, b) => {
    switch (selectedSortOption) {
      case "Class Name":
        return a.name.localeCompare(b.name);
      case "Date":
        return new Date(a.start_datetime) - new Date(b.start_datetime);
      case "Distance":
        return a.distance - b.distance; // Assumes `distance` is a numeric field in each event
      default:
        return 0;
    }
  });
  
  setFilteredItems(sorted);
  }, [searchTerm, categoryFilter, dateFilterStart, dateFilterEnd, startTime, endTime, distance, selectedSortOption]);

  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
  };

  const handleSortOption = (event) => {
    setSelectedSortOption(event.target.value);
  };

  
    // Handle search term change
    const handleSearch = (event) => {
      const query = event.target.value;
      setSearchTerm(query);
    };

  const [isTimePopupVisible, setTimePopupVisible] = useState(false); // State to toggle popup visibility
  
  // Convert time in minutes to HH:MM format
  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  };

  // Function to toggle time popup visibility
  const toggleTimePopup = () => {
    setTimePopupVisible((prev) => !prev);
  };

  const [isDistancePopupVisible, setDistancePopupVisible] = useState(false); // State to toggle popup visibility
  

  // Function to toggle distance popup visibility
  const toggleDistancePopup = () => {
    setDistancePopupVisible((prev) => !prev);
  };

  const [isSortPopupVisible, setSortPopupVisible] = useState(false); // State to toggle popup visibility
  
  // Function to toggle time popup visibility
  const toggleSortPopup = () => {
    setSortPopupVisible((prev) => !prev);
  };

  // Close the popup when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.popup-content') && !e.target.closest('button')) {
      setTimePopupVisible(false);
      setDistancePopupVisible(false);
      setSortPopupVisible(false);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setDateFilterStart('');
    setDateFilterEnd('');
    setStartTime(0); 
    setEndTime(1440); 
    setDistance(0);
  }


  // Add event listener to handle click outside
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className="schedule-page">
      <div class="schedule-header">
      <h2>Search Events</h2>
      <button class="rounded" onClick={resetFilters}>
        <p>Reset Filters</p>
      </button>
      </div>
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
        <button onClick={toggleSortPopup}>
      <span>Sort by</span>
          <RiArrowDropDownLine size={20}/>
        </button>
      <Popup isOpen={isSortPopupVisible} onClose={toggleSortPopup} title="Sort by">
          
      <div class="radio-group">
      <label>
        <input
          type="radio"
          value="Class Name"
          checked={selectedSortOption === 'Class Name'}
          onChange={handleSortOption}
        />
        <span>Class Name</span>
      </label>
      <label>
        <input
          type="radio"
          value="Date"
          checked={selectedSortOption === 'Date'}
          onChange={handleSortOption}
        />
        <span>Date</span>
      </label>
      <label>
        <input
          type="radio"
          value="Distance"
          checked={selectedSortOption === 'Distance'}
          onChange={handleSortOption}
        />
        <span>Distance</span>
      </label>
    </div>
    <button onClick={() => setSortPopupVisible(false)}>Sort</button>
        </Popup>

        <button onClick={toggleTimePopup}>
        <span>Time</span>
          <RiArrowDropDownLine size={20}/>
        </button>

        <Popup isOpen={isTimePopupVisible} onClose={toggleTimePopup} title="Select Time Range">
            <div>
              <label>Start Time: {convertMinutesToTime(startTime)}</label>
              <input
                type="range"
                min="0"
                max="1440"
                value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))}
                step="30"
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
                step="30"
              />
              
            </div>
            <button onClick={() => setTimePopupVisible(false)}>Apply</button>
        </Popup>

        <button onClick={toggleDistancePopup}>
        <span>Distance</span>
          <RiArrowDropDownLine size={20}/>
        </button>
      </div>

      <Popup isOpen={isDistancePopupVisible} onClose={toggleDistancePopup} title="Find classes within">
      <label>{distance} miles</label> 
      <input
                type="range"
                min="0"
                max="20"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                step="1"
              />
            <button onClick={() => setDistancePopupVisible(false)}>Apply</button>
        </Popup>

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
