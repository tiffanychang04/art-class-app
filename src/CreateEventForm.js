import React, { useState } from 'react';
import './CreateEventForm.css'; 
import EventCard from './EventCard';
import { useRegisteredEvents } from './RegisteredEventsContext';

function CreateEventForm({ onSave }) {
    const defaultImageUrl = "https://crafty-clayworks.com/cdn/shop/articles/text-to-image_8413ca9e-8c51-4cb8-839e-478b81c055ea.png?v=1710431363"; // Replace this URL with your actual default image URL

    const [eventData, setEventData] = useState({
        name: '',
        instructor: '',
        startDate: '',
        startTime: '',
        duration: '',
        category: '',
        location: '',
        backgroundImage: defaultImageUrl,
    });

    
    const { registeredEvents, addEvent, removeEvent } = useRegisteredEvents();

    const [events, setEvents] = useState([]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setEventData(prev => ({
            ...prev,
            [name]: files && files.length > 0 ? URL.createObjectURL(files[0]) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const start_datetime = new Date(eventData.startDate + 'T' + eventData.startTime).toISOString();

        const newEvent = {
            ...eventData,
            start_datetime: start_datetime,
        };

        setEvents([...events, newEvent]);
        setEventData({
            name: '',
            instructor: '',
            startDate: '',
            startTime: '',
            duration: '',
            category: '',
            location: '',
            backgroundImage: defaultImageUrl,
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="create-event-form">
                <h2>Create an Event</h2>
                <label>
                    Event Name
                    <input type="text" name="name" onChange={handleChange} value={eventData.name} required />
                </label>
                <label>
                    Instructor
                    <input type="text" name="instructor" onChange={handleChange} value={eventData.instructor} required />
                </label>
                <label>
                    Date
                    <input type="date" name="startDate" onChange={handleChange} value={eventData.date} required />
                </label>
                <label>
                    Time
                    <input type="time" name="startTime" onChange={handleChange} value={eventData.startTime} required />
                </label>
                <label>
                    Duration (hours)
                    <input type="number" name="duration" onChange={handleChange} value={eventData.duration} min="0.5" step="0.5" required />
                </label>
                <label>
                    Category
                    <input type="text" name="category" onChange={handleChange} value={eventData.category} required />
                </label>
                <label>
                    Location
                    <input type="text" name="location" onChange={handleChange} value={eventData.location} required />
                </label>
                <label>
                    Insert Image URL
                    <input type="text" name="backgroundImage" onChange={handleChange} />
                </label>
                <button type="submit">Create Event</button>
            </form>
            
            <h2>Your Events</h2>
            {events.length === 0 ? (
                <p>No events yet!</p>
            ) : (
                events.map((event, index) => (
                    <EventCard 
                        key={index} 
                        event={event} 
                        isRegistered={registeredEvents.some(e => e.name === event.name)}
                        onRegister={() => addEvent(event)}
                        onUnregister={() => removeEvent(event)}
                    />
                ))
            )}
        </div>    
    );
}

export default CreateEventForm;

    