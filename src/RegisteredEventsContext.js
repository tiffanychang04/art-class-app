import React, { createContext, useContext, useState } from 'react';

// Create the context
const RegisteredEventsContext = createContext();

// Create a custom hook to use the context
export const useRegisteredEvents = () => {
  return useContext(RegisteredEventsContext);
};

// Create the context provider
export const RegisteredEventsProvider = ({ children }) => {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  // Add event to registered events list
  const addEvent = (event) => {
    setRegisteredEvents((prev) => [...prev, event]);
  };

  // Remove event from registered events list
  const removeEvent = (event) => {
    setRegisteredEvents((prev) => prev.filter((e) => e.name !== event.name));
  };

  return (
    <RegisteredEventsContext.Provider value={{ registeredEvents, addEvent, removeEvent }}>
      {children}
    </RegisteredEventsContext.Provider>
  );
};
