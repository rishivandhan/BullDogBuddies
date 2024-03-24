import React from 'react'
import { FaTimes } from 'react-icons/fa'
import './Login.css'
import './Navbar.css'

function Login(props) {
  return (props.trigger) ? (
    <div className="login">
      <div className="login-inner">
        <button className="nav-close" onClick={() => props.setTrigger(false)}>
          <FaTimes />
        </button>
        { props.children }
      </div>
    </div>
  ) : "";
}

export default Login;
