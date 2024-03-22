import React from 'react';
import { FaBars } from "react-icons/fa";
import './Signup.css'

function Signup(props) {
    return (props.trigger) ? (
        <div className="signup">
            <div className="signup-inner">
                <button className="nav-btn nav-close">
                    <FaBars />
                </button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Signup