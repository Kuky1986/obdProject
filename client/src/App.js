import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Data from './components/Data';
import Home from './components/Home'; 
import DTC from './components/DTC';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/data" element={<Data />} />
        <Route path="/dtc" element={<DTC />} />
        {/* Add more routes for other pages/components */}
      </Routes>
    </Router>
  );
};

export default App;

