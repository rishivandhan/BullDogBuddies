import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useRef } from "react";
import { database } from "./Firebase";
import { currentUserId } from "./components/Navbar";
import {
  push,
  ref,
  get,
  orderByChild,
  orderByKey,
  query,
  equalTo,
  child,
  onValue,
  set,
  remove,
  update,
} from "firebase/database";

export const useEventOperations = () => {
  // State hooks for event attributes
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventExpirationTime, setEventExpirationTime] = useState(30); // Default expiration time
  const [eventNumberOfPeopleLimit, setEventNumberOfPeopleLimit] = useState(10); // Default people limit
  const [eventId, setEventId] = useState(""); // State hook for storing the event ID

  // Function to create a new event and store the event ID
  const createEvent = async (
    title,
    expirationTime,
    description,
    location,
    eventPeopleRegistered,
    time
  ) => {
    try {
      // Reference to events in the database
      const eventsRef = ref(database, "events");
      const newEventRef = push(eventsRef);

      console.log("Create Event Current User ID: ", currentUserId);
      // Set the new event data using the state values
      await set(newEventRef, {
        title: title,
        description: description || "No description",
        location: location,
        time: time,
        expirationTime: expirationTime,
        numberOfPeopleLimit: eventPeopleRegistered,
        numberOfPeopleRegistered: 0, // Initialize with zero registered users
      });

      // Store the event ID (key) in state
      setEventId(newEventRef.key);
      console.log("Creatd Event ID: ", newEventRef.key);
      // Reset event state and alert user of success
      setEventTitle("");
      setEventDescription("");
      setEventLocation("");
      setEventTime("");
      setEventExpirationTime(30);
      setEventNumberOfPeopleLimit(10);
      alert("Event created successfully.");
    } catch (error) {
      console.error("Firebase error: ", error);
      alert("There was a problem creating the event.");
    }

    //function to add events to the user
  };

  // Returned state hooks
  return {
    eventTitle,
    setEventTitle,
    eventDescription,
    setEventDescription,
    eventLocation,
    setEventLocation,
    eventTime,
    setEventTime,
    eventExpirationTime,
    setEventExpirationTime,
    eventNumberOfPeopleLimit,
    setEventNumberOfPeopleLimit,
    eventId,
    createEvent,
  };
};
