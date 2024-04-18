import React from "react";
import { FaTimes } from "react-icons/fa";
import "./Signup.css";
import "./Navbar.css";

function Signup(props) {
  return props.trigger ? (
    <div className="signup">
      <div className="signup-inner">
        <button className="nav-close" onClick={() => props.setTrigger(false)}>
          <FaTimes />
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Signup;
