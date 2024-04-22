import React from "react";
import { FaTimes } from "react-icons/fa";
import { motion as m } from "framer-motion";
import "./Signup.css";
import "./Navbar.css";

function Signup(props) {
  return props.trigger ? (
    <m.div className="signup"
      initial={{opacity:0}} 
      animate={{opacity:1}}
      exit={{ opacity:0}}
      transition={{duration:0.5, ease:"easeInOut"}}
    >
      <div className="signup-inner">
        <button className="popup-close nav-close" onClick={() => props.setTrigger(false)}>
          <FaTimes />
        </button>
        {props.children}
      </div>
    </m.div>
  ) : (
    ""
  );
}

export default Signup;
