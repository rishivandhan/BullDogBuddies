import React from "react";
import Home from "./components/Home";
import MyEvents from "./components/MyEvents";
import CreateEvents from "./components/CreateEvents";
import ViewEvents from "./components/ViewEvents";
import SignOut from "./components/SignOut";
import About from "./components/About";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Viewrsvp from "./components/Viewrsvp";

function App() {
  const { pathname } = useLocation();

  return (
    <div>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/ViewEvents" element={<ViewEvents />} />
        <Route path="/MyEvents" element={<MyEvents />} />
        <Route path="/Viewrsvp" element={<Viewrsvp />} />
        <Route path="/CreateEvents" element={<CreateEvents />} />
        <Route path="/SignOut" element={<SignOut />} />
      </Routes>
    </div>
  );
}

export default App;
