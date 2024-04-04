import React from "react";
import "./CreateEvents.css";
import Sidebar from "./sidebar";
import { useEventOperations } from "../FirebaseEventOperations";

function CreateEvents() {
  const { createEvent } = useEventOperations();

  function handleEventCreate(e) {
    e.preventDefault();

    //constant stores values entered into textbox
    const title = document.getElementById("Title").value;
    const ExpirationTime = document.getElementById("ExpirationTime").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const eventPeopleRegistered =
      document.getElementById("PeopleRegistered").value;
    const time = document.getElementById("Time").value;
    const Limit = document.getElementById("Limit").value;

    //check to see if fields were entered or else create event;
    if (
      !title ||
      !ExpirationTime ||
      !description ||
      !location ||
      !eventPeopleRegistered ||
      !time ||
      !Limit
    ) {
      alert("Please fill in all the required fields");
      return;
    } else {
      createEvent(
        title,
        ExpirationTime,
        description,
        location,
        eventPeopleRegistered,
        time
      );
      alert("event Created Successfully");
    }
  }
  return (
    <div className="CreateEvents">
      <div className="sidebar">
        <React.Fragment>
          <Sidebar />
        </React.Fragment>
      </div>

      <div className="Current-User-ID"></div>

      <div className="form">
        <form onSubmit={handleEventCreate}>
          <label>
            Title: <input name="eventTitle" defaultValue="" id="Title" /> <br />
            Expiration Time:{" "}
            <input
              name="eventExpirationTime"
              defaultValue=""
              id="ExpirationTime"
            />{" "}
            <br />
            Description:{" "}
            <input name="Description" defaultValue="" id="description" />
            <br />
            Location:{" "}
            <input name="eventLocation" defaultValue="" id="location" />
            <br />
            Number of People to Resgister:{" "}
            <input
              name="eventPeopleRegistered"
              defaultValue=""
              id="PeopleRegistered"
            />
            <br />
            Time: <input
              name="eventTitle"
              defaultValue=""
              id="Time"
            /> <br />{" "}
            {/*come back later. not a text input. need a checkbox for am and pm*/}
            Number of People Limit:{" "}
            <input name="PeopleLimit" defaultValue="" id="Limit" />
            <br />
          </label>

          <button type="submit" id="submit-event-button">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvents;
