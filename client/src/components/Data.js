import React, { useState } from 'react';
import axios from 'axios';

const Data = () => {
  const [carData, setCarData] = useState([]);
  const [carId, setCarId] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/data?carId=${carId}`);
      setCarData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFetchData = () => {
    fetchData();
  };

  const handleCarIdChange = (event) => {
    setCarId(event.target.value);
  };

  return (
    <div>
      <h1>Data from MongoDB</h1>
      <div>
        <label>Enter Car ID:</label>
        <input type="text" value={carId} onChange={handleCarIdChange} />
        <button onClick={handleFetchData}>Fetch Data</button>
      </div>
      {carData.length > 0 && (
        <div>
          <p>Vehicle ID: {carData[0].VEHICLE_ID}</p>
          <p>Make: {carData[0].MARK}</p>
          <p>Model: {carData[0].MODEL}</p>
          <p>Year: {carData[0].CAR_YEAR}</p>
          <p>Engine Power: {carData[0].ENGINE_POWER}</p>
          <p>Fuel Type: {carData[0].FUEL_TYPE}</p>
          <p>Automatic: {carData[0].AUTOMATIC ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default Data;




