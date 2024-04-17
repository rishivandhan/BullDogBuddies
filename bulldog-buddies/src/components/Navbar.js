import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useRef } from "react";
import "./Navbar.css";
import Signup from "./Signup";
import Login from "./Login";

import { database } from "../Firebase";
import { push, ref, onValue, set, remove, update } from "firebase/database";
import { useUserOperations } from "../FirebaseUserOperations";
import { useNavigate } from "react-router-dom";

var userInstance = -1;
var currentUserId = -1;

function Navbar() {
  const navRef = useRef();

  const navigate = useNavigate();

  currentUserId = -1;
  userInstance = -1;

  const {
    createUser,
    checkUserEmailExists,
    checkCredentials,
    fetchAllUserEmails,
    fetchAllUserPasswords,
    fetchUserIdByInstance,
  } = useUserOperations();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const [signupPopup, SignUpPopup] = useState(false);
  const [loginPopup, LoginPopup] = useState(false);

  // make sure password and confirm password matches
  function handleSignupFormSubmit(event) {
    event.preventDefault(); // Prevents the default form submit action

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!username || !email || !password || !confirmPassword) {
      // Check if any field is empty
      alert("Please fill in all fields.");
      return;
    } else if (password !== confirmPassword) {
      // Check if passwords match
      alert("Passwords do not match.");
      return;
    } else {
      // create the user DB in the Firebase
      console.log("Before user is created");
      try {
        console.log("Checking if user already exists");

        console.log(email === "test3@gmail.com");

        const functionResult = fetchAllUserEmails(email).then((userEmails) => {
          console.log("User emails that are in the database: ", userEmails);
          console.log("userEmails array length: ", userEmails.length);

          var checkFlag = false;

          for (let i = 0; i < userEmails.length; i++) {
            console.log(
              "string iteration in userEmails array: ",
              userEmails[i]
            );
            //  console.log(emailToCheck === userEmails[i]);
            if (userEmails[i] === email) {
              console.log("email is in the list");
              checkFlag = true; // Email found
              userInstance = i;
              console.log("checkFlag", checkFlag);
            } else {
              console.log(" email is not in the list");
              console.log("checkFlag: ", checkFlag);
            }
          }

          console.log("return checkFlag", checkFlag);
          if (!checkFlag) userInstance = userEmails.length;
          return checkFlag;
        });

        functionResult.then((result) => {
          console.log("Is email in the list? ", result); // This will log true if email is in the list, otherwise false

          if (result) {
            alert("A user with this email already exists.");
          } else {
            createUser(username, email, password);

            console.log("userInstance before function", userInstance);
            const userInstanceBeforeFunction = userInstance;
            fetchUserIdByInstance(userInstance).then((userId) => {
              currentUserId = userId;
              userInstance = userInstanceBeforeFunction;

              console.log("Current Signed-in User ID: ", currentUserId);
              console.log("Current Signed-in User instance: ", userInstance);

              localStorage.setItem("currentUserId", currentUserId);
              // sign-in functionality
              console.log("Creating new user");

              alert("User Successfully created");
              SignUpPopup(false);
              navigate("/CreateEvents");
            });
          }
        });
      } catch (error) {
        console.error("Error during signup:", error);
        alert("An error occurred during signup.");
      }

      return;
    }

    // check for if userName or Email already exists in the Users DB
  }

  // login submit button
  function handleLoginFormSubmit(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("stored user login details");
    //checkCredentials(username, password);
    try {
      console.log("Checking if user exists");

      // this is to check for the email
      const functionEmailsResult = fetchAllUserEmails(email).then(
        (userEmails) => {
          console.log("User emails that are in the database: ", userEmails);
          console.log("userEmails array length: ", userEmails.length);

          var checkFlag = false;
          userInstance = -1;

          for (let i = 0; i < userEmails.length; i++) {
            console.log(
              "string iteration in userEmails array: ",
              userEmails[i]
            );
            //  console.log(emailToCheck === userEmails[i]);
            if (userEmails[i] === email) {
              console.log("email is in the list");
              checkFlag = true; // Email found
              userInstance = i;
              console.log("userInstance", userInstance);
            } else {
              console.log(" email is not in the list");
              console.log("userInstance", userInstance);
            }
          }

          console.log("returning userInstance:", userInstance);
          return userInstance;

          // password check
          console.log();
        }
      );

      // This is to check for the password
      functionEmailsResult.then((result) => {
        console.log("The instance of the email in the list is:  ", result); // This will log true if email is in the list, otherwise false

        if (result > -1) {
          console.log("this email exists.");

          // checking to see if the password is correct in that user with existing
          const funtionPasswordResult = fetchAllUserPasswords().then(
            (userPasswords) => {
              console.log("The usesr's password is: " + userPasswords[result]);

              if (userPasswords[result] === password) {
                fetchUserIdByInstance(userInstance).then((userId) => {
                  currentUserId = userId;
                  console.log("Current User ID: ", currentUserId);

                  localStorage.setItem("currentUserId", currentUserId);
                  // login functionality
                  console.log("You entered the correct password");
                  alert("login Success!");
                  navigate("/About");

                  LoginPopup(false);
                  console.log("Event Created Current User ID: ", currentUserId);
                  return currentUserId;
                });

                // implement more login button code here

                return true;
              } else {
                console.log("wrong password");
                alert("Wrong password");
                return false;
              }
            }
          );
        } else {
          console.log("A user with that email does not exist, Please sign up!");
          alert("A user with that email does not exist, Please sign up!");
        }
      });
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during logging in.");
    }

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
            <label>
              <input type="text"  id = "email" name = "email" placeholder="EMAIL" class="placeholder"/>
            </label>
            <br />
            <label>
              <input type="text" id = "password" name = "password" placeholder="PASSWORD" class="placeholder"/>
            </label>
            <br />
            <div className="horizontal-line"></div>

            <button
              type="submit"
              id="submit-login-button"
              className="submit-login-button"
            >
              Login
            </button>
          </form>
        </Login>

        {/*Signup Popup*/}
        <Signup trigger={signupPopup} setTrigger={SignUpPopup}>
          <h3>Sign Up</h3>
          <form onSubmit={handleSignupFormSubmit}>
            <div className="form-group">
              <label htmlFor="username"></label>
              <input type="text" id="username" name="username" placeholder="USERNAME" class="placeholder"/>
            </div>
            <div className="form-group">
              <label htmlFor="email"></label>
              <input type="email" id="email" name="email" placeholder="EMAIL" class="placeholder"/>
            </div>
            <div className="form-group">
              <label htmlFor="password"></label>
              <input type="password" id="password" name="password" placeholder="PASSWORD" class="placeholder"/>
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password" ></label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="CONFIRM Password" 
                class="placeholder"
              />
            </div>
            <div className="horizontal-line"></div>
            <button
              type="submit"
              id="submit-signup-button"
              className="submit-signup-button"
            >
              Sign Up
            </button>

            <br></br>
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

export { userInstance, currentUserId };
export default Navbar;
