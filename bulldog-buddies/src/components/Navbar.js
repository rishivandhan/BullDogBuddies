import { FaBars, FaTimes } from 'react-icons/fa'
import { useState, useRef } from 'react'
import Signup from './Signup'
import './Navbar.css'

function Navbar() {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const [signupPopup, setButtonPopup] = useState(false);

  return (
    <header>
      <h3>
        <a href="/">Bulldog Buddies</a>
      </h3>
      <nav ref={navRef}>
        <a href="/">Log in</a>
        <button className="signup-btn" onClick={() => setButtonPopup(true)}>
          Sign up
        </button>
        <Signup trigger={signupPopup} setTrigger={setButtonPopup}>
          <h3>Sign up</h3>
          <p>Username</p>
          <p>Email</p>
          <p>password</p>
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
