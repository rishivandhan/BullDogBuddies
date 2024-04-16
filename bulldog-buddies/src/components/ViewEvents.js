import React from "react";
import "./ViewEvents.css";
import Sidebar from "./sidebar";
import { Card } from "react-bootstrap";
import ItemsSlider from "./ItemsSlider";
import { useEventOperations } from "../FirebaseEventOperations";
import { useState, useEffect, useRef } from "react";

function ViewEvents() {
  const [events, setEvents] = useState({});
  const { listenForEventUpdates, EventCard, handleRSVP } = useEventOperations();
  const currentUserId = localStorage.getItem("CurrentUserId");

  console.log("the current UserID in the view events page is: ", currentUserId);
  useEffect(() => {
    // Set up a listener for real-time updates
    const unsubscribe = listenForEventUpdates((newEvents) => {
      setEvents(newEvents);
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [listenForEventUpdates]);

  return (
    <div className="viewEvnts-container">
      <div className="sidebar">
        <React.Fragment>
          <Sidebar />
          <h1></h1>
        </React.Fragment>
      </div>
      <div className="view-display">
        {events ? (
          Object.keys(events).map((key) => (
            <EventCard
              key={key}
              event={events[key]}
              onRsvp={() => handleRSVP(key, currentUserId)}
            />
          ))
        ) : (
          <p>No events to show</p>
        )}
      </div>
    </div>
  );
}

export default ViewEvents;
