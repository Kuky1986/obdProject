import React from 'react';
import Navbar from './styleComponents/Navbar';
import './FindMCC.css'; // Import the CSS file

const FindMCC = () => {
  const handleFindSpecialist = (specialty) => {
    // Open a new tab with a Google search for the specific mechanic specialty
    window.open(`https://www.google.com/search?q=${specialty}+near me`, '_blank');
  };

  return (
    <div className="find-mcc-container">
      <Navbar />
      <main className="find-mcc-content">
        <h1>Find Specialized Mechanics</h1>
        <p className="info-message">
          Need a specialist mechanic? Click the button below to find mechanics for specific needs through Google.
        </p>
        <div className="button-container">
          <button className="find-button" onClick={() => handleFindSpecialist('Turbo+specialist')}>
            Turbo Specialist
          </button>
          <button className="find-button" onClick={() => handleFindSpecialist('Tyre+shop')}>
            Tyre Shop
          </button>
          <button className="find-button" onClick={() => handleFindSpecialist('Engine+specialist')}>
            Engine Specialist
          </button>
          <button className="find-button" onClick={() => handleFindSpecialist('Transmission+specialist')}>
            Transmission Specialist
          </button>
          <button className="find-button" onClick={() => handleFindSpecialist('Brakes+specialist')}>
            Brakes Specialist
          </button>
        </div>
      </main>
    </div>
  );
};

export default FindMCC;

