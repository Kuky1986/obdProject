import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const EngineIntakeComparison = ({ carId }) => {
  const [engineIntakeData, setEngineIntakeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (carId) {
          const response = await axios.get(`/api/intakemanifoldpressure?carId=${carId}`);
          setEngineIntakeData(response.data);
        }
      } catch (error) {
        console.error('Error fetching engine intake comparison data:', error);
      }
    };
  
    fetchData();
  }, [carId]);
  
  useEffect(() => {
    if (engineIntakeData.length > 0) {
      renderChart();
    }
  }, [engineIntakeData]);

  const renderChart = () => {
    const labels = engineIntakeData.map(item => item.ENGINE_LOAD);
    const pressures = engineIntakeData.map(item => item.INTAKE_MANIFOLD_PRESSURE);

    const ctx = document.getElementById('engineIntakeChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Intake Manifold Pressure',
          data: pressures,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Engine Load'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Intake Manifold Pressure (kPa)'
            }
          }
        }
      }
    });
  };

  return (
    <div>
      <h2>Engine Intake Comparison</h2>
      {engineIntakeData.length > 0 ? (
        <canvas id="engineIntakeChart" width="400" height="200"></canvas>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default EngineIntakeComparison;

