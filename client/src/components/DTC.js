import React, { useState } from 'react';
import axios from 'axios';

const DTC = () => {
  const [carId, setCarId] = useState('');
  const [dtcData, setDtcData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dtcInfo, setDtcInfo] = useState({});

  const handleCarIdChange = (event) => {
    setCarId(event.target.value);
  };

  const fetchDTCs = async () => {
    setLoading(true);
    setError(null);
    setDtcInfo({});
    try {
      const response = await axios.get(`/api/dtc?carId=${carId}`);
      setDtcData(response.data);
    } catch (error) {
      console.error('Error fetching DTC data:', error);
    }
    setLoading(false);
  };

  const handleDTCButtonClick = async (dtc) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/external', { dtc: dtc });
      const responseData = response.data;
      setDtcInfo(prevState => ({ ...prevState, [dtc]: responseData }));
    } catch (error) {
      console.error('Error fetching data from external API:', error.response.data);
      setDtcInfo(prevState => ({ ...prevState, [dtc]: { error: `No DTC info for ${dtc}` } }));
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
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
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
          {Object.keys(dtcInfo).map((dtc, index) => (
            <div key={index}>
              {dtcInfo[dtc] && !dtcInfo[dtc].error && (
                <div>
                  <h2>DTC Information:</h2>
                  <p>Code: {dtc}</p>
                  <p>Definition: {dtcInfo[dtc].definition}</p>
                  <p>Possible Causes:</p>
                  <ul>
                    {dtcInfo[dtc].cause.map((cause, index) => (
                      <li key={index}>{cause}</li>
                    ))}
                  </ul>
                </div>
              )}
              {dtcInfo[dtc] && dtcInfo[dtc].error && (
                <p>{dtcInfo[dtc].error}</p>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DTC;
















