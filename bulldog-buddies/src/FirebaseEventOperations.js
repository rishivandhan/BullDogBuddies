import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useRef } from "react";
import { database } from "./Firebase";
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
  off,
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
  const createRSVPEvent = async (
    title,
    expirationTime,
    description,
    location,
    eventPeopleRegistered,
    time,
    currentUserId
  ) => {
    try {
      // Reference to events in the database
      console.log(
        "the current user id imported in EventOperations:",
        currentUserId
      );
      const eventsRef = ref(database, `events`);
      const newEventRef = push(eventsRef);

      // Store the event ID (key) in state
      setEventId(newEventRef.key);

      // Set the new event data using the state values --> pushed the events being created into event database.
      await set(newEventRef, {
        CreatorUserId: currentUserId,
        EventID: newEventRef.key,
        title: title,
        description: description || "No description",
        location: location,
        time: time,
        expirationTime: expirationTime,
        numberOfPeopleLimit: eventPeopleRegistered,
        numberOfPeopleRegistered: 0, // Initialize with zero registered users
      });

      console.log("Created Event ID: ", newEventRef.key);

      //store the event ID (key) py passing in currentUserID
      try {
        const userRef = ref(
          database,
          `users/${currentUserId}/UserCreatedEvents`
        );
        //refering to the RSVPEvents subtable in users
        const userEventRef = ref(
          database,
          `users/${currentUserId}/UserRSVPEvents`
        );
        //const newUserRef = push(userRef);

        //push to the createvents subtable in users
        await set(child(userRef, newEventRef.key), {
          CreatedEventID: newEventRef.key,
          title: title,
          location: location,
          time: time,
        });

        //push to the RSVPEvents substable in users
        await set(child(userEventRef, newEventRef.key), {
          RSVPEventID: newEventRef.key,
          title: title,
          location: location,
          time: time,
        });

        console.log("Event successfully aded in user");
        console.log(
          "Event Successfully added in RSVP Events from user Creating Event"
        );
      } catch {
        console.log("Failed to add events to subtable");
        alert("Failed to add events to subtable");
      }

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

  const handleRSVP = async (eventId) => {
    var currentUserId = localStorage.getItem("currentUserId");
    currentUserId = localStorage.getItem("currentUserId");

    if (!currentUserId) {
      alert("Please login before RSVPing");
      return;
    }

    //refers to the events table
    const eventRef = ref(database, `events/${eventId}`);

    //refers to the user's RSVP subtable.
    const userEventRef = ref(
      database,
      `users/${currentUserId}/UserRSVPEvents/${eventId}`
    );

    try {
      const userRSVPSnapsot = await get(userEventRef);
      if (userRSVPSnapsot.exists()) {
        alert("You are already RSVPed for this event");
        return;
      }

      const eventSnapshot = await get(eventRef);

      if (eventSnapshot.exists()) {
        const eventData = eventSnapshot.val();

        if (eventData.CreatorUserId != currentUserId) {
          if (
            eventData.numberOfPeopleRegistered < eventData.numberOfPeopleLimit
          ) {
            const updatedEventData = {
              ...eventData,
              numberOfPeopleRegistered: eventData.numberOfPeopleRegistered + 1,
            };
            await set(eventRef, updatedEventData);

            //content to store everything on the userRSVP sub-table
            const userRSVPData = {
              RSVPEventID: eventData.EventID,
              title: eventData.title,
              location: eventData.location,
              time: eventData.time,
            };
            await set(userEventRef, userRSVPData);
            alert("You have successfully RSVP'd to the event!");
          } else {
            alert("This event is already full.");
          }
        }
      } else {
        alert("The Event does not exist");
      }
    } catch (error) {
      console.log("error occured during rsvp: ", error);
      alert("an error occured during RSVP check console");
    }

    // Transaction to increment the number of people registered
    // await update(eventRef, {
    //   numberOfPeopleRegistered: (prevValue) => prevValue + 1,
    // })
    //   .then(() => {
    //     console.log("RSVP successful!");
    //     alert("You have successfully RSVP'd to the event!");
    //   })
    //   .catch((error) => {
    //     console.error("RSVP error: ", error);
    //     alert("There was a problem with your RSVP.");
    //   });
  };
  // Function to set up a listener for event updates
  const listenForEventUpdates = (updateFn) => {
    const eventsRef = ref(database, "events");

    onValue(eventsRef, (snapshot) => {
      const events = snapshot.val();
      updateFn(events);
    });

    // Return a function to unsubscribe from the events
    return () => off(eventsRef);
  };

  // Component for rendering an individual event card
  const EventCard = ({ event }) => (
    <div className="event-card">
      <h2 className="title">{event.title}</h2>
      <p className="description">{event.description}</p>
      <p className="time">Time: {event.time}</p>
      <p className="location">Location: {event.location}</p>
      <p className="participants">
        Participants: {event.numberOfPeopleRegistered}/
        {event.numberOfPeopleLimit}
      </p>
      <button onClick={() => handleRSVP(event.EventID)} className="rsvp-button">
        RSVP
      </button>
    </div>
  );

  //function to handle the RSVP button
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
    createRSVPEvent,
    handleRSVP,
    listenForEventUpdates,
    EventCard,
  };
};
