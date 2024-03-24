import React from 'react'
import { FaBars, FaTimes } from "react-icons/fa"
import './Signup.css'

function Signup(props) {
    return (props.trigger) ? (
        <div className="signup">
            <div className="signup-inner">
                <button className="nav-btn nav-close">
                    <FaTimes />
                </button>
                { props.children }
            </div>
            <button className="nav-btn nav-close">
                <FaBars />
            </button>
        </div>
    ) : "";
}

export default Signup;