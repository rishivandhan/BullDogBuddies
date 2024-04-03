import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useRef } from "react";

import { database } from "./Firebase";
import {
  push,
  ref,
  get,
  orderByChild,
  orderByKey,
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

  const updateAllUserEventsWhenSigningIn = async () => {
    const eventsRef = ref(database, 'events');
    const usersRef = ref(database, 'users');
  
    // Get a snapshot of all current events
    const eventsSnapshot = await get(eventsRef);
    if (!eventsSnapshot.exists()) {
      console.log('No events to update.');
      return;
    }
    
    // Construct a list of all event keys
    const eventKeys = Object.keys(eventsSnapshot.val());
  
    // Get a snapshot of all users
    const usersSnapshot = await get(usersRef);
    if (!usersSnapshot.exists()) {
      console.log('No users found for updating events.');
      return;
    }

    const updates = {};
  
    // Iterate over each user
    usersSnapshot.forEach((userSnapshot) => {
      const userId = userSnapshot.key;
      const userEvents = userSnapshot.val().userEvents || {};
  
      // Iterate over each event key to add to the user's userEvents
      eventKeys.forEach((eventKey) => {
        // Updating event such the default value is "false". If event exists with a different value, we keep it.
        if (!userEvents[eventKey] || userEvents[eventKey] === "false") {
          updates[`${userId}/userEvents/${eventKey}`] = "false";
        }
      });
    });
  
    await update(usersRef, updates);
  };
  
  const createUser = async (username, email, password) => {
    console.log("Adding to DB ...");
    try {
      // Reference to users in the database
      const usersRef = ref(database, "users");
      const newUserRef = push(usersRef);
  
      // Set the new user data along with userEvents
      await set(newUserRef, {
        userName: username,
        userEmail: email,
        userPassword: password,
        userEvents: {}, // Initialize with an empty object
        userCreatedEvents: 0,
        userRSVPEvents: 0,
      });
  
      // After creating a new user, update the userEvents for all users
      await updateAllUserEventsWhenSigningIn();
  
      // Reset state and alert user of success
      setUserName("");
      setUserEmail("");
      setUserPassword("");
      setUserCreatedEvents(0);
      setUserRSVPEvents(0);
      alert("Data added successfully and userEvents updated for all users.");
    } catch (error) {
      console.error("Firebase error: ", error);
      alert("There was a problem adding the data.");
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

    // Function to retrieve all users and their passwords
    const fetchAllUserPasswords = async () => {
        const usersRef = ref(database, 'users');
        const usersQuery = query(usersRef, orderByChild('userPassword')); // Adjust if the field name is different

        try {
            const snapshot = await get(usersQuery);
            if (snapshot.exists()) {
                const users = snapshot.val();
                // Iterate over the object and extract userPasswords
                const userPasswords = Object.values(users).map(user => user.userPassword);
                console.log(userPasswords);
                return userPasswords;
            } else {
                console.log('No users found.');
                return [];
            }
        } catch (error) {
            console.error('Error fetching user passwords:', error);
        }
    };

    // Function to retrieve a user's ID based on an index (userInstance)
    const fetchUserIdByInstance = async (userInstance) => {
      const usersRef = ref(database, 'users');
      const usersQuery = query(usersRef, orderByKey());  // We're ordering by key to get the user IDs

      try {
          const snapshot = await get(usersQuery);
          if (snapshot.exists()) {
              const users = snapshot.val();
              // Extract the keys from the snapshot which are the user IDs
              const userIds = Object.keys(users);
              console.log(userIds);
              // Check if the userInstance is a valid index within the userIds array
              if (userInstance >= 0 && userInstance < userIds.length) {
                const userId = userIds[userInstance];
                console.log(`User ID at instance ${userInstance}: ${userId}`);
                return userId;
              } else {
                console.log(`No user found at instance ${userInstance}.`);
                return null;
              }
          } else {
              console.log('No users found.');
              return null;
          }
      } catch (error) {
          console.error('Error fetching user ID by instance:', error);
          return null;
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
    fetchAllUserPasswords,
    fetchUserIdByInstance,
    isEmailInArray,
  };
};
