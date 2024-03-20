import { Fabars, FaTimes } from "react-icons/fa";

function Navbar() {
    return (
        <header>
            <h3>Logo</h3>
            <nav>
                <a href="/">Home</a>
                {/* <a href="/">About</a> */}
                <a href="/">Sign up</a>
                <a href="/">Log in</a>

                <button>
                    <FaTimes />
                </button>
            </nav>
        </header>
    );
  }

  export default Navbar;