// DTC.js

import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './styleComponents/Navbar';
import Modal from './styleComponents/Modal'; // Import the Modal component
import './DTC.css'; // Import the CSS file

const DTC = () => {
  const [carId, setCarId] = useState('');
  const [dtcData, setDtcData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dtcInfo, setDtcInfo] = useState({});
  const [selectedDTC, setSelectedDTC] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

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
      setError('Failed to fetch DTC data');
    }
    setLoading(false);
  };

  const handleDTCButtonClick = async (dtc) => {
    setSelectedDTC(dtc);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/external', { dtc: dtc });
      const responseData = response.data;
      setDtcInfo((prevState) => ({ ...prevState, [dtc]: responseData }));
    } catch (error) {
      console.error('Error fetching data from external API:', error.response?.data);
      setDtcInfo((prevState) => ({ ...prevState, [dtc]: { error: `No DTC info for ${dtc}` } }));
    }
    setLoading(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dtc-container">
      <Navbar />
      <h1>Diagnostic Trouble Codes (DTCs)</h1>
      <button className="explanation-button" onClick={showModal}>
        Show Explanation
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={hideModal}
        message={
          'Diagnostic Trouble Codes (DTCs) are codes stored by the vehicle\'s onboard computer system that indicate potential issues or malfunctions. Each DTC corresponds to a specific fault, helping diagnose problems with various components and systems.'
        }
      />
      <div className="form-container">
        <label htmlFor="car-id">Enter Car ID:</label>
        <input id="car-id" type="text" value={carId} onChange={handleCarIdChange} />
        <button onClick={fetchDTCs}>Fetch DTCs</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="dtc-table-container">
          <table className="dtc-table">
            <thead>
              <tr>
                <th>DTC Code</th>
              </tr>
            </thead>
            <tbody>
              {dtcData.map((dtc, index) => (
                <tr key={index} onClick={() => handleDTCButtonClick(dtc)} className={dtc === selectedDTC ? 'selected' : ''}>
                  <td>{dtc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="dtc-details-container">
            {selectedDTC && dtcInfo[selectedDTC] && !dtcInfo[selectedDTC].error ? (
              <div className="dtc-details">
                <h2>DTC Information:</h2>
                <p>
                  <strong>Code:</strong> {selectedDTC}
                </p>
                <p>
                  <strong>Definition:</strong> {dtcInfo[selectedDTC].definition}
                </p>
                <p>
                  <strong>Possible Causes:</strong>
                </p>
                <ul>
                  {dtcInfo[selectedDTC].cause.map((cause, idx) => (
                    <li key={idx}>{cause}</li>
                  ))}
                </ul>
              </div>
            ) : (
              selectedDTC && dtcInfo[selectedDTC]?.error && <p>{dtcInfo[selectedDTC].error}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DTC;




















