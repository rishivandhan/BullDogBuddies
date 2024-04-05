import React from 'react';
import { NavLink } from 'react-router-dom';
import "./sidebar.css";

function Sidebar(){
  return(
    <div className='sidebar-links'>
      <h3>BullDog Buddies</h3>
      <ul>
      <li><NavLink to="/About">About</NavLink></li>
      <li><NavLink to="/Profile">Profile</NavLink> </li>
      <li><NavLink to="/CreateEvents">Create Events</NavLink></li>
      <li><NavLink to="/ViewEvents">View Events</NavLink></li>
      <li><NavLink to="/SignOut">Sign out</NavLink></li>
      </ul>
    </div>
  );
}

export default Sidebar;