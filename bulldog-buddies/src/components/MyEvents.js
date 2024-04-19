import React from "react";
import Link from "react-router-dom";
import "./sidebar.css";
import "./MyEvents.css";
import { Card } from "react-bootstrap";
import ItemsSlider from "./ItemsSlider";
import { database } from '../Firebase';
import { push, ref, onValue, set, update, remove } from 'firebase/database';
import { useEventOperations } from "../FirebaseEventOperations";
import { useState, useEffect, useRef } from "react";

import Sidebar from "./sidebar";


function MyEvents(){
    const [createdEvents, setCreatedEvents] = useState([]);
  const currentUserId = localStorage.getItem("currentUserId"); // or however you obtain the current user's ID

  useEffect(() => {
    console.log("Fetching created events for user ID:", currentUserId);
    const userCreatedEventsRef = ref(database,'users/' + currentUserId + '/UserCreatedEvents');
    
    onValue(userCreatedEventsRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log("Found created events for user:", currentUserId, snapshot.val());
        const createdEventIds = Object.keys(snapshot.val());

        const eventPromises = createdEventIds.map((eventId) => {
          return new Promise((resolve) => {
            const eventRef = ref(database, 'events/' + eventId);
            onValue(eventRef, (eventSnapshot) => {
              if (eventSnapshot.exists()) {
                console.log(`Event data fetched for event ID: ${eventId}`, eventSnapshot.val());
                resolve({ id: eventId, ...eventSnapshot.val() });
              } else {
                console.log(`No data found for event ID: ${eventId}`);
                resolve(null);
              }
            }, {
              onlyOnce: true
            });
          });
        });

        Promise.all(eventPromises).then((events) => {
          const validEvents = events.filter(event => event !== null);
          console.log("All created event data fetched:", validEvents);
          setCreatedEvents(validEvents);
        });
      } else {
        console.log("No created events found for user:", currentUserId);
        setCreatedEvents([]);
      }
    }, {
      onlyOnce: true
    });
    
    }, [currentUserId]);

    const handleRSVP = () => {

    };

    return (
        <div className="mycreatedevents-container">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="view-display">
                {createdEvents.length > 0 ? createdEvents.map((event) => (
                <div key={event.id} className="created-event-card">
                    <h2 className="title">{event.title}</h2>
                    <p className="description">{event.description}</p>
                    <p className="time">Time: {event.time}</p>
                    <p className="location">Location: {event.location}</p>
                    <p className="participants">
                    Participants: {event.numberOfPeopleRegistered}/{event.numberOfPeopleLimit}
                    </p>
                    <button onClick={() => handleRSVP(event.id)} className="rsvp-button">
                        Edit
                    </button>
                    <button onClick={() => handleRSVP(event.id)} className="rsvp-button">
                        Delete
                    </button>
                </div>
                )) : (
                <p>No events created by you to show.</p>
                )}
            </div>
        </div>
  );
}

export default MyEvents;
