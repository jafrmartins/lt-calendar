import React, { createContext, useCallback, useContext, useState } from "react";
import moment from 'moment'
import { uuidv4 } from "../libraries/String";
import { HttpService } from "../libraries/Fetcher";

const CalendarContext = createContext({
    createEvent: null,
    updateEvent: null,
    deleteEvent: null,
    listEvents: null,
    events: null,
});

export const useCalendar = () => {
    const context = useContext(CalendarContext);
    if (!context) {
      throw new Error('useCalendar must be used within a CalendarProvider');
    }
    return context;
};
  
window._events = [];

import services from '../services'

export const CalendarProvider = ({ children }) => {

    const http = new HttpService(services)

    const [events, _setEvents] = useState(window._events);

    const setEvents = (list) => {
      _setEvents(list)
      window._events = list;
    }
  
    const createEvent = useCallback((event) => {
      
      setEvents([...events, {...event}])

    }, [events]);

    const updateEvent = useCallback((eventId, updateData) => {

      setEvents([...events.filter((event) => event.id == eventId), {...events.find((event) => event.id == eventId), ...updateData}])
        
    }, [events]);

    const deleteEvent = useCallback((eventId) => {
      setEvents([...window._events.filter((event) => event.id != eventId)])
    }, [events]);

    const listEvents = useCallback((year, month) => {

      setEvents(events.length ? [...events] : [

        { id: uuidv4(), datetime: moment().add(1, 'day') },
        { id: uuidv4(), datetime: moment().add(1, 'day').add(30, 'minutes') },
        { id: uuidv4(), datetime: moment().add(1, 'day').add(60, 'minutes') },
        { id: uuidv4(), datetime: moment().add(1, 'day').add(90, 'minutes') },
        { id: uuidv4(), datetime: moment().add(1, 'day').add(120, 'minutes') },
        { id: uuidv4(), datetime: moment().add(3, 'day') },
        { id: uuidv4(), datetime: moment().add(3, 'day').add(30, 'minutes') },
        { id: uuidv4(), datetime: moment().add(5, 'day') },
        { id: uuidv4(), datetime: moment().add(5, 'day').add(30, 'minutes') },


        { id: uuidv4(), datetime: moment().add(7, 'day') },
        { id: uuidv4(), datetime: moment().add(7, 'day').add(30, 'minutes') },
        { id: uuidv4(), datetime: moment().add(7, 'day').add(60, 'minutes') },
        { id: uuidv4(), datetime: moment().add(9, 'day') },
        { id: uuidv4(), datetime: moment().add(9, 'day').add(30, 'minutes') },
        { id: uuidv4(), datetime: moment().add(10, 'day') },
        { id: uuidv4(), datetime: moment().add(12, 'day').add(30, 'minutes') },
        
      
      ])
    }, []);

    
  
    return (
      <CalendarContext.Provider value={{ createEvent, updateEvent, deleteEvent, listEvents, events, http }}>
        {children}
      </CalendarContext.Provider>
    );
  };
  