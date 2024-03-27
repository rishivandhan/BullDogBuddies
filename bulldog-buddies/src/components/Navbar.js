    import { FaBars, FaTimes } from 'react-icons/fa'
    import { useState, useRef } from 'react'
    import './Navbar.css'
    import Signup from "./Signup";
    import Login from "./Login";

    import { database } from '../Firebase';
    import { push, ref, onValue, set, remove, update } from 'firebase/database';
    import {useUserOperations} from '../FirebaseUserOperations'

    function Navbar() {
        const navRef = useRef();

        const { createUser, checkUserEmailExists, checkCredentials } = useUserOperations();

        const showNavbar = () => {
            navRef.current.classList.toggle("responsive_nav");
        };
    
        const [signupPopup, SignUpPopup] = useState(false);
        const [loginPopup, LoginPopup] = useState(false);






        // make sure password and confirm password matches
        function handleSignupFormSubmit(event) {
                event.preventDefault(); // Prevents the default form submit action

                const username = document.getElementById('username').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirm-password').value;

                
                if (!username || !email || !password || !confirmPassword) { // Check if any field is empty
                    alert('Please fill in all fields.');
                    return;
                } else if (password !== confirmPassword) { // Check if passwords match
                    alert('Passwords do not match.');
                    return;
                } else { // create the user DB in the Firebase
                    console.log("Before user is created");
                    try {
                        console.log('Checking if user already exists');
                        const emailExists = checkUserEmailExists(email);
                        if (emailExists) {
                            alert('A user with this email already exists.');
                        } else {
                            console.log('Creating new user');
                            createUser(username, email, password);
                            SignUpPopup(false);
                        }
                    } catch (error) {
                        console.error('Error during signup:', error);
                        alert('An error occurred during signup.');
                    }
                    
                    
                    
                    return;
                }

                // check for if userName or Email already exists in the Users DB

                
        }


        // login submit button
        function handleLoginFormSubmit(event) {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            console.log("before checking user credentials ...");
            checkCredentials(username, password);
            return;
        }

        



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
            <form onSubmit={handleLoginFormSubmit}>
                <label>Username:
                    <input type="text" />
                </label><br />
                <label>Password:
                    <input type="text" />
                </label><br />

                <button type="submit" id="submit-login-button" className="submit-login-button">Login</button>
            </form>
            </Login>

            {/*Signup Popup*/}
            <Signup trigger={signupPopup} setTrigger={SignUpPopup}>
                <h3>Sign Up</h3>
                <form onSubmit={handleSignupFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password:</label>
                        <input type="password" id="confirm-password" name="confirmPassword" />
                    </div>

                    <button type="submit" id="submit-signup-button" className="submit-signup-button">Sign Up</button>
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