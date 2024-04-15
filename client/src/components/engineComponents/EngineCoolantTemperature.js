import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EngineCoolantTemperature = ({ carId }) => {
  const [engineCoolantTemp, setEngineCoolantTemp] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (carId) {
          const response = await axios.get(`/api/enginecoolanttemperature?carId=${carId}`);
          setEngineCoolantTemp(response.data);
        }
      } catch (error) {
        console.error('Error fetching engine coolant temperature data:', error);
      }
    };
  
    fetchData();
  }, [carId]);
  

  return (
    <div>
      <h2>Engine Coolant Temperature</h2>
      {engineCoolantTemp !== null ? (
        <p>Temperature: {engineCoolantTemp}°C</p>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default EngineCoolantTemperature;
