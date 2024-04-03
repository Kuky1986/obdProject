import React, { useState } from 'react';
import axios from 'axios';

const DTC = () => {
  const [carId, setCarId] = useState('');
  const [dtcData, setDtcData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCarIdChange = (event) => {
    setCarId(event.target.value);
  };

  const fetchDTCs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/dtc?carId=${carId}`);
      console.log(response.data); // Log the response data to see its structure
      setDtcData(response.data);
    } catch (error) {
      console.error('Error fetching DTC data:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Diagnostic Trouble Codes (DTCs)</h1>
      <div>
        <label>Enter Car ID:</label>
        <input type="text" value={carId} onChange={handleCarIdChange} />
        <button onClick={fetchDTCs}>Fetch DTCs</button>
      </div>
      {loading ? (
        <p>Loading DTC data...</p>
      ) : (
        <ul>
          {dtcData.map((dtc, index) => (
          <li key={index}>{dtc}</li>
        ))}
        </ul>
      )}
    </div>
  );
};

export default DTC;







