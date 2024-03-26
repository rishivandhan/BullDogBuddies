// https://www.youtube.com/watch?v=vDT7EnUpEoo

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/database'
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyADaC9qu77gDM0J555ufR6hLPlkoXuD9Ls",
    authDomain: "bulldogbuddies-d92ce.firebaseapp.com",
    databaseURL: "https://bulldogbuddies-d92ce-default-rtdb.firebaseio.com",
    projectId: "bulldogbuddies-d92ce",
    storageBucket: "bulldogbuddies-d92ce.appspot.com",
    messagingSenderId: "819356082251",
    appId: "1:819356082251:web:fab5da8cf384aff7b82dce",
    measurementId: "G-3TR8N40KY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
const database = getDatabase(app);

export {database}