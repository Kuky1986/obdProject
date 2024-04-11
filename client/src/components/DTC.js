import React, { useState } from 'react';
import axios from 'axios';

const DTC = () => {
  const [carId, setCarId] = useState('');
  const [dtcData, setDtcData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error message
  const [dtcInfo, setDtcInfo] = useState(null); // State for DTC information

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

  const handleDTCButtonClick = async (dtc) => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.post('/api/external', { dtc: dtc });
      console.log(response.data); // Log the response data from the external API
      // Handle the response data as needed
    } catch (error) {
      console.error('Error fetching data from external API:', error.response.data);
      setError('DTC not found. Please try again with a different code.'); // Set error state with a user-friendly message
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
        <p>Loading...</p>
      ) : error ? ( // Display error message if error state is set
        <p>{error}</p>
      ) : (
        <div>
          <h2>DTC Codes:</h2>
          <ul>
            {dtcData.map((dtc, index) => (
              <li key={index}>
                <button onClick={() => handleDTCButtonClick(dtc)}>{dtc}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


export default DTC;







