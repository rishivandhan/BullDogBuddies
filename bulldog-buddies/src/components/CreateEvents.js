import React from "react";
import "./CreateEvents.css";
import Sidebar from "./sidebar";
import { useEventOperations } from "../FirebaseEventOperations";
import { useNavigate } from "react-router-dom";

function CreateEvents() {
  const navigate = useNavigate();
  const { createRSVPEvent } = useEventOperations();

  function handleEventCreate(e) {
    e.preventDefault();

    var currentUserId = localStorage.getItem("currentUserId");
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
      currentUserId = localStorage.getItem("currentUserId"); //stores the current User ID --> must use this to user on database.
      if (!currentUserId) {
        alert("This userID is non-existent --> Please make an account");
        return;
      }

      createRSVPEvent(
        title,
        ExpirationTime,
        description,
        location,
        eventPeopleRegistered,
        time,
        currentUserId
      );

      // document.getElementById("Title").value = "";
      // document.getElementById("ExpirationTime").value = "";
      // document.getElementById("description").value = "";
      // document.getElementById("location").value = "";
      // document.getElementById("peopleRegistered").value = "";
      // document.getElementById("Time").value = "";
      // document.getElementById("Limit").value = "";

      alert("event Created Successfully");
      console.log("this is the current User ID: ", currentUserId);
    }
  }

  function handleLogout() {
    localStorage.removeItem("currentUserID");

    alert("Logout Successfull");
    navigate("/");
  }

  return (
    <div className="createEvents-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="create-display">
        <div className="create-title">
          <h3>Create an Event</h3>
        </div>
        <div className="Current-User-ID"></div>
        <div className="form-container">
          <form onSubmit={handleEventCreate}>
            <label>
              Title:{" "}
              <input
                className="form-input"
                name="eventTitle"
                defaultValue=""
                id="Title"
              />{" "}
              <br />
              Expiration Time:{" "}
              <input
                className="form-input"
                name="eventExpirationTime"
                defaultValue=""
                id="ExpirationTime"
              />{" "}
              <br />
              Description:{" "}
              <input
                className="form-input"
                name="Description"
                defaultValue=""
                id="description"
              />
              <br />
              Location:{" "}
              <input
                className="form-input"
                name="eventLocation"
                defaultValue=""
                id="location"
              />
              <br />
              Number of People to Resgister:{" "}
              <input
                className="form-input"
                name="eventPeopleRegistered"
                defaultValue=""
                id="PeopleRegistered"
              />
              <br />
              Time:{" "}
              <input
                className="form-input"
                name="eventTitle"
                defaultValue=""
                id="Time"
              />{" "}
              <br />{" "}
              {/*come back later. not a text input. need a checkbox for am and pm*/}
              Number of People Limit:{" "}
              <input
                className="form-input"
                name="PeopleLimit"
                defaultValue=""
                id="Limit"
              />
              <br />
            </label>
            <div className="buttons-container">
              <button
                className="submitButton"
                type="submit"
                id="submit-event-button"
              >
                Create Event
              </button>
              <button className="logout-btn" type="logout" id="logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CreateEvents;
