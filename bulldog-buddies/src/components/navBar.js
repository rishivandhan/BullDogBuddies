import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import './Navbar.css'


function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    return (
        <header>
            <h3>Bulldog Buddies</h3>
            <nav ref={navRef}>
                <a href="/">Log in</a>
                <a href="/">Sign up</a>
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