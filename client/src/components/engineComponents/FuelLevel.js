import React, { useState } from 'react';
import axios from 'axios';
import './FuelLevel.css'; // Import the CSS file

const FuelLevel = ({ carId }) => {
  const [scanDuration, setScanDuration] = useState(null);
  const [error, setError] = useState(null);

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(`/api/max_engine_runtime?carId=${carId}`);
      const { maxEngineRuntime } = response.data;
      if (maxEngineRuntime === null) {
        setError(`No data available for car ID ${carId}`);
      } else {
        setScanDuration(maxEngineRuntime);
        setError(null); // Reset error state if data is available
      }
    } catch (error) {
      console.error('Error fetching scan duration:', error);
      setError('Error fetching scan duration');
    }
  };

  return (
    <div className="fuel-level-container">
      <button className="fuel-level-button" onClick={handleButtonClick}>
        Show Duration of The Scan for {carId}
      </button>
      {error && <div className="error-message">Error: {error}</div>}
      {scanDuration !== null && !error && (
        <div className="scan-duration-container">
          <h3>Duration of The Scan for {carId}:</h3>
          <p>{scanDuration}</p>
        </div>
      )}
    </div>
  );
};

export default FuelLevel;




