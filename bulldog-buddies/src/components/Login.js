import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Login.css";

function login(props) {
  return props.trigger ? (
    <div className="login">
      <div className="login-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          <FaTimes />
        </button>
        <button className="nav-btn nav-close">
          <FaBars />
        </button>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default login;
