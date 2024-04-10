import React from "react";
import Home from "./components/Home";
import MyEvents from "./components/MyEvents";
import CreateEvents from "./components/CreateEvents";
import ViewEvents from "./components/ViewEvents";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (

    <div>
    <Routes>
      <Route path="*" element={<Home/>} />
      <Route path="/MyEvents" element ={<MyEvents />} /> 
      <Route path="/CreateEvents" element ={<CreateEvents />} />
      <Route path="/ViewEvents" element ={<ViewEvents />} />
    </Routes>
    </div>
  );
}

export default App;
