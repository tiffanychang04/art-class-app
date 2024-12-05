import React, { useState, useEffect } from 'react';
import { FaPaintBrush, FaPencilAlt, FaCamera} from 'react-icons/fa'; // Import category icons
import { GiPaintedPottery } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { items } from './events'; // Import the events array
import EventCard from './EventCard'; // Import the EventCard component
import Search from './Search'; // Import the Search component
import { useRegisteredEvents } from './RegisteredEventsContext'; // Import context hook for managing registered events
import Popup from './Popup'; 
import CreateEventForm from './CreateEventForm'; // Assuming you have a modal or another component to open


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
  const [isCreateEventVisible, setCreateEventVisible] = useState(false); // State to manage visibility of CreateEventForm


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

  const sorted = [...filtered].sort((a, b) => {
    switch (selectedSortOption) {
      case "Class Name":
        return a.name.localeCompare(b.name);
      case "Date":
        return new Date(a.start_datetime) - new Date(b.start_datetime);
      case "Distance":
        return a.distance - b.distance; // Assumes distance is a numeric field in each event
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

  
    const handleSearch = (event) => {
      const query = event.target.value;
      setSearchTerm(query);
    };

  const [isTimePopupVisible, setTimePopupVisible] = useState(false); // State to toggle popup visibility
  

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
  
  const defaultImageUrl = "https://crafty-clayworks.com/cdn/shop/articles/text-to-image_8413ca9e-8c51-4cb8-839e-478b81c055ea.png?v=1710431363"; // Replace this URL with your actual default image URL

  const handleSaveEvent = (eventData) => {
    const completedEventData = {
      ...eventData,
      backgroundImage: eventData.image || defaultImageUrl,
      start_datetime: new Date(eventData.startDate + 'T' + eventData.startTime).toISOString(),
      // Ensure the data structure matches your overall event data expectations
    };
  
    console.log("Saving event with data:", completedEventData);
    setFilteredItems(prevItems => [...prevItems, completedEventData]);
    setCreateEventVisible(false); // Optionally close the form popup after saving
  };

  const toggleCreateEventForm = () => {
    setCreateEventVisible(!isCreateEventVisible);
  };

  const toggleView = () => {
    const container = document.getElementById('eventsContainer');
    const button = document.getElementById('toggleView');

    if (container.classList.contains('list-view')) {
      container.classList.remove('list-view');
      container.classList.add('tile-view');
      button.textContent = 'Switch to List View';
    } else {
      container.classList.remove('tile-view');
      container.classList.add('list-view');
      button.textContent = 'Switch to Tile View';
    }
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
      <h2 style={{ whiteSpace: 'nowrap' }}>Search Events</h2>
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

      <div class="schedule-header">
      <h2 style={{ whiteSpace: 'nowrap' }}>Search By Class Type</h2>
      <button class="rounded" onClick={resetFilters}>
        <p>Reset Filters</p>
        </button>
      </div>


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
      <div id="eventsContainer" class="list-view">
      <button id="toggleView" onClick={toggleView}>Switch to Tile View</button>
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
    </div>
  );

}

export default SchedulePage;