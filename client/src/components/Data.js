import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './styleComponents/Navbar';
import './Data.css'; // Import the CSS file

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
    <div className="data-container">
      <Navbar />
      <h1>Find general vehicle data on scanned cars.</h1>
      <form>
        <label htmlFor="car-id">Enter scanned Car ID:</label>
        <input
          id="car-id"
          type="text"
          value={carId}
          onChange={handleCarIdChange}
        />
        <button type="button" onClick={handleFetchData}>
          Fetch Data
        </button>
      </form>
      {carData.length > 0 && (
        <div className="data-output">
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vehicle ID</td>
                <td>{carData[0].VEHICLE_ID}</td>
              </tr>
              <tr>
                <td>Make</td>
                <td>{carData[0].MARK}</td>
              </tr>
              <tr>
                <td>Model</td>
                <td>{carData[0].MODEL}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>{carData[0].CAR_YEAR}</td>
              </tr>
              <tr>
                <td>Engine Power</td>
                <td>{carData[0].ENGINE_POWER}</td>
              </tr>
              <tr>
                <td>Fuel Type</td>
                <td>{carData[0].FUEL_TYPE}</td>
              </tr>
              <tr>
                <td>Automatic</td>
                <td>{carData[0].AUTOMATIC ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Data;







