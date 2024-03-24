import { FaBars, FaTimes } from 'react-icons/fa'
import { useState, useRef } from 'react'
import './Navbar.css'
import Signup from "./Signup";
import Login from "./Login";

function Navbar() {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const [signupPopup, SignUpPopup] = useState(false);
  const [loginPopup, LoginPopup] = useState(false);
  return (
    <header>
      <h3>
        <a href="/">Bulldog Buddies</a>
      </h3>
      <nav ref={navRef}>
        <button className="login-btn" onClick={() => LoginPopup(true)}>
          Login
        </button>
        <button className="signup-btn" onClick={() => SignUpPopup(true)}>
          Sign up
        </button>

        {/*Login Popup*/}
        <Login trigger={loginPopup} setTrigger={LoginPopup}>
          <h3>Login</h3>
          <form>
            <label>Username:
                <input type="text" />
            </label><br />
            <label>Password:
                <input type="text" />
            </label>
          </form>
        </Login>

        {/*Signup Popup*/}
        <Signup trigger={signupPopup} setTrigger={SignUpPopup}>
          <h3>Sign up</h3>
          <form>
            <label>Username:
              <input type="text" />
            </label><br />
            <label>Email:
              <input type="text" />
            </label><br />
            <label>Password:
              <input type="text" />
            </label><br />
            <label>Confirm Password:
              <input type="text" />
            </label>
          </form>
        </Signup>

        <button className="nav-btn nav-close" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn nav-close" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;