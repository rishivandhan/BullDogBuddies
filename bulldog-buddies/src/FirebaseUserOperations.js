import { FaBars, FaTimes } from 'react-icons/fa'
import { useState, useRef } from 'react'

import { database } from './Firebase';
import { push, ref, onValue, set, remove, update } from 'firebase/database';

export const useUserOperations = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userCreatedEvents, setUserCreatedEvents] = useState(0);
    const [userRSVPEvents, setUserRSVPEvents] = useState(0);

    const createNewUser = () => {
        console.log('Adding to DB ...');
        try {
            const usersRef = ref(database, 'users');
            const newDataRef = push(usersRef);

            set(newDataRef, {
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword,
                userCreatedEvents: userCreatedEvents,
                userRSVPEvents: userRSVPEvents
            }).then(() => {
                setUserName("");
                setUserEmail("");
                setUserPassword("");
                setUserCreatedEvents(0);
                setUserRSVPEvents(0);
                alert("Data added successfully");
            }).catch(error => {
                console.error("Firebase error: ", error);
            });
        } catch (error) {
            console.error("Firebase error: ", error);
        }
    };

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
        createNewUser
    };
};
