import React from 'react';
import Link from 'react-router-dom';
import "./sidebar.css";
import "./Viewrsvp.css";

import Sidebar from "./sidebar";


function Viewrsvp(){
    return(
         <div className="myrsvp-container">
            <div className="sidebar">
                    <Sidebar />
            </div>
            <div className="view-display">
            <div className="rsvp-card">
                <h2 className="title"> </h2>
                <p className="description"></p>
                <p className="time"></p>
                <p className="location"></p>
                <p className="participants">
                    Participants:
                </p>
                <button className="rsvp-button">
                    Cancel RSVP
                </button>
            </div>
      </div>
    </div>
    );
}

export default Viewrsvp;