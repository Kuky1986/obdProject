import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EngineCoolantTemperature = ({ carId }) => {
  const [engineCoolantTemp, setEngineCoolantTemp] = useState([]);
  const [showAbnormalValues, setShowAbnormalValues] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (carId && showAbnormalValues) {
          const response = await axios.get(`/api/enginecoolanttemperature?carId=${carId}`);
          setEngineCoolantTemp(response.data);
        }
      } catch (error) {
        console.error('Error fetching engine coolant temperature data:', error);
      }
    };
  
    fetchData();
  }, [carId, showAbnormalValues]);
  

  return (
    <div>
      <h2>Engine Coolant Temperature</h2>
      <button onClick={() => setShowAbnormalValues(!showAbnormalValues)}>
        {showAbnormalValues ? 'Hide Abnormal Values' : 'Found Abnormal Values'}
      </button>
      {showAbnormalValues && engineCoolantTemp.length > 0 ? (
        <div>
            <h3>Explanation:</h3>
          <p>
            Values might be lower than 40°C if the car is still cold. If dropped below 40°C while the car is warm, check for a thermostat failure or coolant leak.
            <br />
            Overheating problem occurs when the temperature is above 100°C.
          </p>
          <h3>Abnormal Values:</h3>
          <ul>
            {engineCoolantTemp.map((temp, index) => {
              if (temp < 40) {
                return (
                  <li key={index} style={{ color: 'blue' }}>
                    Temperature: {temp}°C
                  </li>
                );
              } else if (temp > 100) {
                return (
                  <li key={index} style={{ color: 'red' }}>
                    Temperature: {temp}°C
                  </li>
                );
              } else {
                return null; // Skip normal values
              }
            })}
          </ul>
        </div>
      ) : (
        <p>{showAbnormalValues ? 'No abnormal values found' : 'Click the button to find abnormal values'}</p>
      )}
    </div>
  );
};

export default EngineCoolantTemperature;




