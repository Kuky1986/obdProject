import React from 'react';
import Navbar from './styleComponents/Navbar';
import './FindMCC.css'; // Import the CSS file

const FindMCC = () => {
  const handleFindMechanic = () => {
    // Open a new tab with a Google search for "Find Mechanic"
    window.open('https://www.google.com/search?q=local+mechanic', '_blank');
  };

  return (
    <div className="find-mcc-container">
      <Navbar />
      <h1>Find Local Mechanics</h1>
      <p className="info-message">
        Need a mechanic? Click the button below to find local mechanics through Google.
      </p>
      <button className="find-button" onClick={handleFindMechanic}>
        Find Mechanic
      </button>
    </div>
  );
};

export default FindMCC;


