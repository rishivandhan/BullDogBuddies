import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import './Navbar.css';

function Navbar() {
    const navRef = useRef();
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    return (
        <header>
            <h3><a href="/">Bulldog Buddies</a></h3>
            <nav ref={navRef}>
                <a href="/">Log in</a>
                <button className="signup-btn" onClick="/">
                    Sign up
                </button>
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