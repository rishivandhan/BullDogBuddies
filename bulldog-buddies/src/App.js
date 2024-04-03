import React from "react";  
import Home from "./components/Home";
import MyEvents from "./components/MyEvents";
import Navbar from "./components/Navbar";
import CreateEvents from "./components/CreateEvents";
import ViewEvents from "./components/ViewEvents";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
    <React.Fragment>
      <Navbar />
    </React.Fragment>
    <Routes>
      <Route path="*" element={<Home/>} />
      <Route path="/MyEvents" element ={<MyEvents />} />
      <Route path="/CreateEvents" element ={<CreateEvents />} />
      <Route path="/ViewEvents" element ={<ViewEvents />} />
    </Routes>
    <React.Fragment>
    <Footer />
    </React.Fragment>
    </div>
    
  );
}

export default App;
