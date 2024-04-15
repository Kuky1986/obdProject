import React, { useState } from 'react';
import EngineCoolantTemperature from './engineComponents/EngineCoolantTemperature';
import IntakeManifoldPressure from './engineComponents/IntakeManifoldPressure';
import MassAirflowRate from './engineComponents/MassAirflowRate';
import FuelLevel from './engineComponents/FuelLevel';
import ShortTermFuelTrim from './engineComponents/ShortTermFuelTrim';
import LongTermFuelTrim from './engineComponents/LongTermFuelTrim';

const EngineHealth = () => {
  const [carId, setCarId] = useState('');

  const handleCarIdChange = (event) => {
    setCarId(event.target.value);
  };

  return (
    <div>
      <h1>Engine Health</h1>
      <div>
        <label>Enter Car ID:</label>
        <input type="text" value={carId} onChange={handleCarIdChange} />
      </div>
      {carId && (
        <div>
          <EngineCoolantTemperature carId={carId} />
          <IntakeManifoldPressure carId={carId} />
          <MassAirflowRate carId={carId} />
          <FuelLevel carId={carId} />
          <ShortTermFuelTrim carId={carId} />
          <LongTermFuelTrim carId={carId} />
        </div>
      )}
    </div>
  );
};

export default EngineHealth;


