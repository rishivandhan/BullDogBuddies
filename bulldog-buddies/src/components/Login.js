import React from 'react'
import { FaTimes } from 'react-icons/fa'
import './Login.css'


function Login(props) {
  return (props.trigger) ? (
    <div className="login">
      <div className="login-inner">
        <button className="login-btn nav-close" onClick={() => props.setTrigger(false)}>
          <FaTimes />
        </button>
        { props.children }
      </div>
    </div>
  ) : "";
}

export default Login;
