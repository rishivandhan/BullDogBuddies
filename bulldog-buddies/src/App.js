import React from 'react';
import { navBar } from './components/navBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <navBar />
          <Routes>
            <Route path='/' exact />
          </Routes>
      </Router>
    </>
  );
}

export default App;
