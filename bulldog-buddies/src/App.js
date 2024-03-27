import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Navbar />

      <Home />
      <Footer />
    </React.Fragment>
  );
}

export default App;
