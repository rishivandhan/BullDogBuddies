import React from 'react';
import Link from 'react-router-dom';
import "./sidebar.css";
import "./ViewCreated.css";

import Sidebar from "./sidebar";


function ViewCreated(){
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

export default ViewCreated;