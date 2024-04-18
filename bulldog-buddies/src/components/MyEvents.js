import React from "react";
import Link from "react-router-dom";
import "./sidebar.css";
import "./MyEvents.css";

import Sidebar from "./sidebar";

function MyEvents() {
  return (
    <div className="my-events-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="view-display">
        <div className="CEvent-card">
          <h2 className="title"> </h2>
          <p className="description"></p>
          <p className="time"></p>
          <p className="location"></p>
          <p className="participants">Participants:</p>
          <button className="rsvp-button">Delete Created Event</button>
        </div>
      </div>
    </div>
  );
}

export default MyEvents;
