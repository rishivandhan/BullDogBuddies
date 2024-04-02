import React from "react";
import "./Navbar.css";
import "./Home.css";
import { Link } from 'react-router-dom';

import HighFive from "../Assets/High five-amico 1.jpg";
import partyPicture from "../Assets/party-pana 1.jpg";

function Home() {
  return (
    <div className="home-container">
      <div className="page-heading">
        <h1>Whats your next event?</h1>
        <h3 className="Page-subheading">
          The easiest way for finding your next (scroll through word list)
        </h3>
        
      </div>

      <div className="welcome-picture">
        <img src={partyPicture} alt="" />
      </div>

      <div className="highFive-Picture">
        <img src={HighFive} alt="" />
      </div>

      <div className="Link-to-MyEvents">
        <Link to="/MyEvents"> Events </Link>
      </div>
    </div>
    
  );
  }
export default Home;
