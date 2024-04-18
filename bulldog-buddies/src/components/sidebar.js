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
          <NavLink to="/ViewEvents">All Events</NavLink>
        </li>
        <li>
          <NavLink to="/MyEvents">My Events</NavLink>
        </li>
        <li>
          <NavLink to="/Viewrsvp">RSVP Events</NavLink>
        </li>
        <li>
          <NavLink to="/CreateEvents">Create Events</NavLink>
        </li>
        <li>
          <NavLink to="/SignOut">Sign out</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
