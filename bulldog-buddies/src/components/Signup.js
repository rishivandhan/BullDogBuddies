import React from 'react'
import { FaTimes, FaBars } from 'react';
import './Signup.css'

function Signup(props) {
    return (props.trigger) ? (
        <div className="signup">
            <div className="signup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>
                <FaTimes />
                </button>
                <button className="nav-btn nav-close">
                <FaBars />
                </button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Signup;