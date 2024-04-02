import React from 'react';
import Link from 'react-router-dom';
import "./Navbar.css";
import "./MyEvents.css";

import Sidebar from "./sidebar";


function MyEvents(){
    return(
         <div className="my-events-container">
            <div className="sidebar">
            <React.Fragment>
                <Sidebar />
            </React.Fragment>
            </div>
            <div className="main">
                <h1> Hello </h1>
            </div>
        </div>
    );
}

export default MyEvents;