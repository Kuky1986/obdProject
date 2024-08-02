import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../styleComponents/Modal.js'; // Import the Modal component
import './EngineCoolantTemperature.css'; // Import the CSS file

const EngineCoolantTemperature = ({ carId }) => {
  const [engineCoolantTemp, setEngineCoolantTemp] = useState([]);
  const [showAbnormalValues, setShowAbnormalValues] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Function to get unique abnormal values
  const getUniqueAbnormalValues = () => {
    const abnormalValues = engineCoolantTemp.filter(temp => temp < 40 || temp > 100);
    return [...new Set(abnormalValues)]; // Remove duplicates
  };

  // Function to show the modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Function to hide the modal
  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="engine-coolant-temperature-container">
      <h2>Engine Coolant Temperature</h2>
      <button className="toggle-button" onClick={() => setShowAbnormalValues(!showAbnormalValues)}>
        {showAbnormalValues ? 'Hide Abnormal Values' : 'Show Abnormal Values'}
      </button>
      <button className="toggle-button" onClick={showModal}>Show Explanation</button>
      <Modal
        isOpen={isModalOpen}
        onClose={hideModal}
        message={"Values might be lower than 40°C if the car is still cold. If dropped below 40°C while the car is warm, check for a thermostat failure or coolant leak. Overheating problem occurs when the temperature is above 100°C."}
      />
      {showAbnormalValues && engineCoolantTemp.length > 0 ? (
        <div>
          <h3>Abnormal Values:</h3>
          <table className="temperature-table">
            <thead>
              <tr>
                <th>Temperature (°C)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {getUniqueAbnormalValues().map((temp, index) => (
                <tr key={index}>
                  <td>{temp}°C</td>
                  <td className={temp < 40 ? 'low-temperature' : 'high-temperature'}>
                    {temp < 40 ? 'Low Temperature' : 'High Temperature'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>{showAbnormalValues ? 'No abnormal values found' : 'Click the button to find abnormal values'}</p>
      )}
    </div>
  );
};

export default EngineCoolantTemperature;









