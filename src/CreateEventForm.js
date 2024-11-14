import React, { useState } from 'react';
import './CreateEventForm.css'; // Make sure to import your CSS file

function CreateEventForm({ onSave }) {
    const [eventData, setEventData] = useState({
        name: '',
        instructor: '',
        startDate: '',
        startTime: '',
        duration: '',
        category: '',
        location: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setEventData(prev => ({
          ...prev,
          [name]: files && files.length > 0 ? URL.createObjectURL(files[0]) : value
        }));
      };

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        onSave(eventData);  // Call the onSave prop passed from the parent component
        console.log("Form submitted", eventData);
    };

  return (
    <form onSubmit={handleSubmit} className="create-event-form">
        <label>
            Event Name
            <input type="text" name="name" onChange={handleChange} required />
        </label>
        <label>
            Instructor
            <input type="text" name="instructor" onChange={handleChange} required />
        </label>
        <label>
            Date
            <input type="date" name="startDate" onChange={handleChange} required />
        </label>
        <label>
            Time
            <input type="time" name="startTime" onChange={handleChange} required />
        </label>
        <label>
            Duration (hours)
            <input type="number" name="duration" onChange={handleChange} min="0.5" step="0.5" required />
        </label>
        <label>
            Category
            <input type="text" name="category" onChange={handleChange} required />
        </label>
        <label>
            Location
            <input type="text" name="location" onChange={handleChange} required />
        </label>
        <label>
            Choose File
            <input type="file" name="image" onChange={handleChange} accept="image/*" />
        </label>
        <button type="submit">Create Event</button>
        </form>
  );
}

export default CreateEventForm;