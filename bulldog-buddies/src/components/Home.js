import React from "react";
import "./Navbar.css";
import "./Home.css";
import Signup from "./Signup";

import HighFive from "../Assets/High five-amico 1.jpg";
import partyPicture from "../Assets/party-pana 1.jpg";

function Home() {
  return (
    <div class="home-container">
      <div class="page-heading">
        <h1>Whats your next event?</h1>
        <h3 class="Page-subheading">
          The easiest way for finding your next (scroll through word list)
        </h3>
      </div>

      <div class="welcome-Picture">
        <img src={partyPicture} alt="" />
      </div>

      <div class="highFive-Picture">
        <img src={HighFive} alt="" />
      </div>
    </div>
  );
}

export default Home;
