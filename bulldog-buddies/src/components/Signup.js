import React from 'react'
import './Signup.css'

function Signup(props) {
    return (props.trigger) ? (
        <div className="signup">
            <div className="signup-inner">
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Signup;