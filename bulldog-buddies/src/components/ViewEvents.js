import React from "react";
import "./ViewEvents.css";
import Sidebar from "./sidebar";
import { Card } from "react-bootstrap";
import ItemsSlider from "./ItemsSlider";
import { database } from '../Firebase';
import { push, ref, onValue, set, update, remove } from 'firebase/database';
import { useEventOperations } from "../FirebaseEventOperations";
import { useState, useEffect, useRef } from "react";

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
    <div className="viewEvnts-container">
      <div className="sidebar">
        <React.Fragment>
          <Sidebar />
          <h1></h1>
        </React.Fragment>
      </div>
      <div className="view-display">
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
            <p>No events to show</p>
        )}
      </div>
    </div>
  );
}

export default ViewEvents;
