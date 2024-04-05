import React from "react";
import "./Home.css";
import { ReactTyped } from 'react-typed';
import HighFive from "../Assets/High five-amico 1.jpg";
import partyPicture from "../Assets/party-pana 1.jpg";
import Navbar from './Navbar';
import Footer from './Footer';

function Home() {
  return (
    <div class="home-container">
      <Navbar />
      <div class="left-side">
        <div class="page-heading">
          <h1>Whats your next event?</h1>
          <h3 class="Page-subheading">
            The easiest way for finding your next
          </h3>
          <h3 className="body-highlight">
          <ReactTyped
            strings={[
              "tennis partner",
              "basketball game",
              "game tournament",
              "party",
            ]}
            typeSpeed={100}
            backSpeed={100}
            loop
          />
          </h3>
        </ div>
        <div class="welcome-Picture">
          <img src={partyPicture} alt="welcome-picture" />
        </div>
      </div>
      <div class="highFive-Picture">
        <img src={HighFive} alt="highfive-picture" />
        <h3 class="Page-subheading">
          Connect with students and people in your city
        </h3>
      </div>
      <Footer />
    </div>
  );
}

export default Home;