import React from "react";
import Link from "react-router-dom";
import "./sidebar.css";
import "./Viewrsvp.css";
import { Card } from "react-bootstrap";
import ItemsSlider from "./ItemsSlider";
import { database } from "../Firebase";
import { push, ref, onValue, set, update, remove } from "firebase/database";
import { useEventOperations } from "../FirebaseEventOperations";
import { useState, useEffect, useRef } from "react";
import { motion as m } from "framer-motion";

import Sidebar from "./sidebar";

function Viewrsvp() {
  const [userRsvpEvents, setUserRsvpEvents] = useState([]);
  const currentUserId = localStorage.getItem("currentUserId");
  const { handleUndoRSVP } = useEventOperations();

  useEffect(() => {
    console.log("Fetching RSVP events for user ID:", currentUserId);
    const userRSVPList = "users/" + currentUserId + "/UserRSVPEvents";
    const userRsvpRef = ref(database, userRSVPList);

    onValue(
      userRsvpRef,
      (snapshot) => {
        if (snapshot.exists()) {
          console.log("Found RSVPs for user:", currentUserId, snapshot.val());
          const rsvpEventIds = Object.keys(snapshot.val());

          const eventPromises = rsvpEventIds.map((eventId) => {
            return new Promise((resolve) => {
              const eventRefString = "events/" + eventId;
              const eventRef = ref(database, eventRefString);
              onValue(
                eventRef,
                (eventSnapshot) => {
                  if (eventSnapshot.exists()) {
                    console.log(
                      "Event data fetched for event ID: ${eventId}",
                      eventSnapshot.val()
                    );
                    resolve({ id: eventId, ...eventSnapshot.val() });
                  } else {
                    console.log("No data found for event ID: ${eventId}");
                    resolve(null);
                  }
                },
                {
                  onlyOnce: true,
                }
              );
            });
          });

          Promise.all(eventPromises).then((events) => {
            const validEvents = events.filter((event) => event !== null);
            console.log("All RSVP event data fetched:", validEvents);
            setUserRsvpEvents(validEvents);
          });
        } else {
          console.log("No RSVPs found for user:", currentUserId);
          setUserRsvpEvents([]);
        }
      },
      {
        onlyOnce: true,
      }
    );
  }, [currentUserId]);

  const undoRSVPAndUpdateState = async (eventId) => {
    await handleUndoRSVP(eventId, currentUserId);
    // Filter out the event that the user has undone the RSVP for
    setUserRsvpEvents(userRsvpEvents.filter((event) => event.id !== eventId));
  };

  return (
    <div className="myrsvp-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <m.div className="view-display"
        initial={{opacity:0, y:"15%"}} 
        animate={{opacity:1, y:"0%"}}
        exit={{opacity:0, y:"15%"}}
        transition={{duration:0.5, ease:"easeInOut"}}
      >
        <div className="createEvent-title">
          <h3>My RSVP Events</h3>
        </div>
        {userRsvpEvents.length > 0 ? (
          userRsvpEvents.map((event) => (
            <div key={event.id} className="rsvp-card">
              <h2 className="title">{event.title}</h2>
              <p className="description">{event.description}</p>
              <p className="time">Time: {event.time}</p>
              <p className="location">Location: {event.location}</p>
              <p className="participants">
                Participants: {event.numberOfPeopleRegistered}/
                {event.numberOfPeopleLimit}
              </p>
              <button
                onClick={() => undoRSVPAndUpdateState(event.id)} //dont invoke handleRSVP function here
                className="rsvp-button"
              >
                Undo RSVP
              </button>
            </div>
          ))
        ) : (
          <div className="event-card">
            <p>No events to show</p>
          </div>
        )}
      </m.div>
    </div>
  );
}

export default Viewrsvp;
