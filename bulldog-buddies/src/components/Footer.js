import React from "react";
import "./Footer.css";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb__footer-links">
        <div className="sb__footer-links-div">
          <a href="https://github.com/rishivandhan/BullDogBuddies/tree/main/bulldog-buddies">
            <FaGithub />
          </a>
          <p>Rishi</p>
          <p>Toni</p>
          <p>Arjun</p>
          <p>Sanjay</p>
          <p>Luke</p>
        </div>
      </div>
      <div className="sb__footer-below">
        <div className="sb__footer-copyright">
          <p>
            @{new Date().getFullYear()} Bulldog Buddies. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
