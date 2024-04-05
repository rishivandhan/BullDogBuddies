import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <Navbar />
      <Home />
      <Footer />
=======
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
>>>>>>> parent of 08841be (tonis-updates)
    </div>
  );
}

export default App;
