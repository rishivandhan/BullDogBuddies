import React from "react";
import "./ViewEvents.css";
import Sidebar from "./sidebar";
import { Card } from "react-bootstrap";
import ItemsSlider from "./ItemsSlider";
import { database } from '../Firebase';
import { push, ref, onValue, set, update, remove } from 'firebase/database';
import { useEventOperations } from "../FirebaseEventOperations";
import { useState, useEffect, useRef } from "react";
import { motion as m } from "framer-motion";

function ViewEvents() {
  const [events, setEvents] = useState([]);
  const { handleRSVP } = useEventOperations();

    // Fetch events from Firebase
    useEffect(() => {
        const eventsRef = ref(database, 'events');
        const unsubscribe = onValue(eventsRef, (snapshot) => {
            const fetchedEvents = snapshot.exists() ? Object.entries(snapshot.val()).map(([key, value]) => ({
                id: key,
                ...value
            })) : [];
            setEvents(fetchedEvents);
        });

        return () => unsubscribe();
    }, []);

    

  return (
    <div className="viewEvents-container">
      <div className="sidebar">
        <React.Fragment>
          <Sidebar />
        </React.Fragment>
      </div>
      <m.div className="view-display"
        initial={{opacity:0, y:"15%"}} 
        animate={{opacity:1, y:"0%"}}
        exit={{opacity:0, y:"15%"}}
        transition={{duration:0.5, ease:"easeInOut"}}
      >
        <div className="createView-title">
          <h3>All Events</h3>
        </div>
        {events.length > 0 ? events.map((event) => (
            <div key={event.id} className="event-card">
                <h2 className="title">{event.title}</h2>
                <p className="description">{event.description}</p>
                <p className="time">Time: {event.time}</p>
                <p className="location">Location: {event.location}</p>
                <p className="participants">
                    Participants: {event.numberOfPeopleRegistered}/{event.numberOfPeopleLimit}
                </p>
                <button onClick={() => handleRSVP(event.id)} className="rsvp-button">
                    RSVP
                </button>
            </div>
        )) : (
          <div className="event-card">
            <p>No events to show</p>
          </div>
        )}
      </m.div>
    </div>
  );
}

export default ViewEvents;
