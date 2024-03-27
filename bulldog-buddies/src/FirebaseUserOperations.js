import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useRef } from "react";

import { database } from "./Firebase";
import {
  push,
  ref,
  get,
  orderByChild,
  query,
  equalTo,
  child,
  onValue,
  set,
  remove,
  update,
} from "firebase/database";

export const useUserOperations = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCreatedEvents, setUserCreatedEvents] = useState(0);
  const [userRSVPEvents, setUserRSVPEvents] = useState(0);

  const userEmails = [];

  const createUser = async (username, email, password) => {
    console.log("Adding to DB ...");
    try {
      const usersRef = ref(database, "users");
      const newDataRef = push(usersRef);

      set(newDataRef, {
        userName: username,
        userEmail: email,
        userPassword: password,
        userCreatedEvents: userCreatedEvents,
        userRSVPEvents: userRSVPEvents,
      })
        .then(() => {
          setUserName("");
          setUserEmail("");
          setUserPassword("");
          setUserCreatedEvents(0);
          setUserRSVPEvents(0);
          alert("Data added successfully");
        })
        .catch((error) => {
          console.error("Firebase error: ", error);
        });
    } catch (error) {
      console.error("Firebase error: ", error);
    }
  };

  function encodeEmail(email) {
    // Replace '.' with ',' in email
    return email.replace(/\./g, ",");
  }


    // Function to retrieve all users and their emails
    const fetchAllUserEmails = async (emailToCheck) => {
        const usersRef = ref(database, 'users');
        const usersQuery = query(usersRef, orderByChild('userEmail')); // Assuming the field is called 'userEmail'
    
        try {
        const snapshot = await get(usersQuery);
        if (snapshot.exists()) {
            const users = snapshot.val();
            // Iterate over the object and extract userEmails
            const userEmails = Object.values(users).map(user => user.userEmail);
            return userEmails;
            
            
            

        } else {
            console.log('No users found.');
            return [];
        }
        } catch (error) {
        console.error('Error fetching user emails:', error);
        }
    };
  


    function isEmailInArray(emailToCheck) {
        //console.log("User emails that are in the database from the isEmailInArray: ", userEmails);
        
        for (let i = 0; i < fetchAllUserEmails().length; i++) {
            console.log("string iteration in userEmails array: ");
            if (userEmails[i] === emailToCheck) {
                return true; // Email found
            } else {
              return false;
            }
        }
        return false; // Email not found
    }

  async function checkUserEmailExists(email) {
    const usersRef = ref(database, "users");
    const usersQuery = query(
      usersRef,
      //orderByChild("userEmail"),
      equalTo(email)
    );
    

    const snapshot = await get(usersQuery);
    console.log("this is the snapshtot", snapshot);

    //need to fix this if statement
    if (snapshot.exists()) {
      return true; // The email already exists
    }
    return false; // The email does not exist
  }

  async function checkCredentials(username, password) {
    const usersRef = ref(database, "users");
    const usersQuery = query(
      usersRef,
      orderByChild("userName"),
      equalTo(username)
    );

    try {
      const snapshot = await get(usersQuery);
      if (snapshot.exists()) {
        const users = snapshot.val();
        const userId = Object.keys(users)[0]; // Getting the first user id that matches the username
        const user = users[userId];

        if (user.userPassword === password) {
          console.log("Password matches!");
          // User authenticated, proceed with login
        } else {
          console.log("Password does not match.");
          // Handle wrong password
        }
      } else {
        console.log("Username does not exist.");
        // Handle username not existing
      }
    } catch (error) {
      console.error("Error checking credentials:", error);
      // Handle error checking credentials
    }
  }

  return {
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    userCreatedEvents,
    setUserCreatedEvents,
    userRSVPEvents,
    setUserRSVPEvents,
    createUser,
    checkUserEmailExists,
    checkCredentials,
    fetchAllUserEmails,
    isEmailInArray
  };
};
