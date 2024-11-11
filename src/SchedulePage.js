import React, { useState } from 'react';

function SchedulePage() {
  // Initial event data with added categories and dates
  const [events, setEvents] = useState([
    { id: 1, name: 'Oil Painting Workshop', date: '2024-11-05', time: '1:00–3:00 pm', location: 'Art Center', category: 'Painting', added: false },
    { id: 2, name: 'Watercolor Class', date: '2024-11-06', time: '10:00–12:00 pm', location: 'Downtown Studio', category: 'Painting', added: false },
    { id: 3, name: 'Pottery Basics', date: '2024-11-07', time: '2:00–4:00 pm', location: 'Community Center', category: 'Sculpture', added: false },
    { id: 4, name: 'Advanced Sketching', date: '2024-11-08', time: '3:00–5:00 pm', location: 'Uptown Art Studio', category: 'Drawing', added: false },
    { id: 5, name: 'Clay Sculpture', date: '2024-11-09', time: '11:00 am–1:00 pm', location: 'Art Hub', category: 'Sculpture', added: false },
    { id: 6, name: 'Portrait Drawing', date: '2024-11-10', time: '4:00–6:00 pm', location: 'Gallery 21', category: 'Drawing', added: false },
    { id: 7, name: 'Still Life with Pastels', date: '2024-11-11', time: '9:00–11:00 am', location: 'Park Art Space', category: 'Painting', added: false },
  ]);

  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Function to toggle event addition/removal from schedule
  const addEvent = (id) => {
    setEvents(events.map(event => event.id === id ? { ...event, added: !event.added } : event));
  };

  // Filter events based on search query, category, and date
  const filteredEvents = events.filter(event => {
    const matchesQuery = event.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryFilter ? event.category === categoryFilter : true;
    const matchesDate = dateFilter ? event.date === dateFilter : true;
    return matchesQuery && matchesCategory && matchesDate;
  });

  return (
    <div className="schedule-page">
      <h2>Search Events</h2>
      <input
        type="text"
        placeholder="Search for art classes"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Filters */}
      <div className="filters">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Painting">Painting</option>
          <option value="Sculpture">Sculpture</option>
          <option value="Drawing">Drawing</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <h2>Nearby Events</h2>
      <div className="nearby-events">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="event-card card">
              <h3>{event.name}</h3>
              <p>{event.date}, {event.time}</p>
              <p>{event.location}</p>
              <button onClick={() => addEvent(event.id)}>
                {event.added ? 'Remove from Schedule' : 'Add to Schedule'}
              </button>
            </div>
          ))
        ) : (
          <p>No events found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default SchedulePage;