<<<<<<< HEAD
import React from "react";
import "./CreateEvents.css";
import Sidebar from "./sidebar";
import { useEventOperations } from "../FirebaseEventOperations";
import { useNavigate } from "react-router-dom";

function CreateEvents() {
  const navigate = useNavigate();
  const { createEvent } = useEventOperations();

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

      createEvent(
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
          <div>
            <button type="logout" id="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
=======
import React from 'react';
import "./CreateEvents.css";
import Sidebar from "./sidebar";

function CreateEvents() {
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
    
        // You can pass formData as a fetch body directly:
        fetch('/some-api', { method: form.method, body: formData });
    
        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
      }
      return(
        <div className="createEvents-container">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="create-display">
            <div className="create-title">
              <h3>Create an Event</h3>
            </div>
            <div className="form-container">
              <form method="post" onSubmit={handleSubmit}>
                <label>
                  Title: <input className="form-input" name="myInput" defaultValue="" required/>
                </label>
                <label>
                  Type: <input className="form-input"  name="myInput" defaultValue="" required/>
                </label>
                <label>
                  Location: <input className="form-input" name="myInput" defaultValue="" required/>
                </label>
                <label>
                  Description: <textarea className="form-description" name="myInput" defaultValue="" required/>
                </label>
              </form>
              <hr />
              <div className="buttons-container">
                <button className="submitButton" type="reset">Reset form</button>
                <button className="submitButton" type="submit">Submit form</button>
              </div>
            </div>
          </div>
        </div>
    );
>>>>>>> origin/luke-changes-2
}

export default CreateEvents;
