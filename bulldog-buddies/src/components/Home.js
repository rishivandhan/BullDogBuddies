import React from "react";
import "./Navbar.css";
import "./Home.css";

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

      <br></br>
      <div className="welcome-picture">
        <img src={partyPicture} alt="" />
      </div>
      <br></br>
      <div className="highFive-Picture">
        <img src={HighFive} alt="" />
      </div>
    </div>
  );
}

export default Home;
