// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Homepage';
import LocationForm from './LocationForm';
import Directions from './Directions';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Route for the LocationForm page */}
        <Route path="/add-location" element={<LocationForm />} />

        {/* Route for the Directions page */}
        <Route path="/directions" element={<Directions />} />
      </Routes>
    </Router>
  );
}

export default App;
