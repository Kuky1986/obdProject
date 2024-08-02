import React, { useState } from 'react';
import Navbar from './styleComponents/Navbar';
import EngineCoolantTemperature from './engineComponents/EngineCoolantTemperature';
import IntakeManifoldPressure from './engineComponents/IntakeManifoldPressure';
import MassAirflowRate from './engineComponents/MassAirflowRate';
import FuelLevel from './engineComponents/FuelLevel';
import ShortTermFuelTrim from './engineComponents/ShortTermFuelTrim';
import LongTermFuelTrim from './engineComponents/LongTermFuelTrim';
import './EngineHealth.css'; // Import the CSS file

const EngineHealth = () => {
  const [carId, setCarId] = useState('');
  const [displayComponent, setDisplayComponent] = useState(null);

  const handleCarIdChange = (event) => {
    setCarId(event.target.value);
  };

  const handleDisplayComponent = (component) => {
    setDisplayComponent(component);
  };

  return (
    <div className="engine-health-container">
      <Navbar />
      <h1>Engine Health</h1>
      <div className="form-container">
        <label htmlFor="car-id">Enter Car ID:</label>
        <input
          id="car-id"
          type="text"
          value={carId}
          onChange={handleCarIdChange}
        />
      </div>
      <div className="button-container">
        <button onClick={() => handleDisplayComponent('EngineCoolantTemperature')}>Display Engine Coolant Temperature</button>
        <button onClick={() => handleDisplayComponent('IntakeManifoldPressure')}>Display Intake Manifold Pressure</button>
        <button onClick={() => handleDisplayComponent('MassAirflowRate')}>Display Mass Airflow Rate</button>
        <button onClick={() => handleDisplayComponent('FuelLevel')}>Display Fuel Level</button>
        <button onClick={() => handleDisplayComponent('ShortTermFuelTrim')}>Display Short Term Fuel Trim</button>
        <button onClick={() => handleDisplayComponent('LongTermFuelTrim')}>Display Long Term Fuel Trim</button>
      </div>
      <div className="component-display">
        {displayComponent === 'EngineCoolantTemperature' && <EngineCoolantTemperature carId={carId} />}
        {displayComponent === 'IntakeManifoldPressure' && <IntakeManifoldPressure carId={carId} />}
        {displayComponent === 'MassAirflowRate' && <MassAirflowRate carId={carId} />}
        {displayComponent === 'FuelLevel' && <FuelLevel carId={carId} />}
        {displayComponent === 'ShortTermFuelTrim' && <ShortTermFuelTrim carId={carId} />}
        {displayComponent === 'LongTermFuelTrim' && <LongTermFuelTrim carId={carId} />}
      </div>
    </div>
  );
};

export default EngineHealth;




