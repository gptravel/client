import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import TravelForm from './TravelForm';
import Recommendations from './Recommendations';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<TravelForm />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </div>
  );
};

export default App;
