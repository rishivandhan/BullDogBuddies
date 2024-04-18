import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar-links">
      <h3>Bulldog Buddies</h3>
      <ul>
        <li>
          <NavLink to="/About">About</NavLink>
        </li>
        <li>
          <NavLink to="/ViewEvents">View All Events</NavLink>
        </li>
        <li>
          <NavLink to="/CreateEvents">Create an Event</NavLink>
        </li>

        <li>
          <NavLink to="/MyEvents">My Created Events</NavLink>
        </li>
        <li>
          <NavLink to="/Viewrsvp">My RSVP Events</NavLink>
        </li>

        <li>
          <NavLink to="/SignOut">Sign out</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
