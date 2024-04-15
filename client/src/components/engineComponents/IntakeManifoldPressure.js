import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const EngineIntakeComparison = ({ carId }) => {
  const [engineIntakeData, setEngineIntakeData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [selectedChart, setSelectedChart] = useState(null);

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

  const renderChart = (label, data) => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const canvas = document.getElementById('chartCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(item => item.ENGINE_LOAD),
        datasets: [{
          label: label,
          data: data.map(item => item.INTAKE_MANIFOLD_PRESSURE),
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

    setChartInstance(newChartInstance);
    setSelectedChart(label);
  };

  const handleChartButtonClick = (label, data) => {
    renderChart(label, data);
  };

  return (
    <div>
      <h2>Engine Intake Comparison</h2>
      {engineIntakeData.length > 0 && (
        <div>
          <button onClick={() => handleChartButtonClick('Low Idle', engineIntakeData.filter(item => item.ENGINE_LOAD >= 0 && item.ENGINE_LOAD < 33))}>Low Idle</button>
          <button onClick={() => handleChartButtonClick('Mid Load', engineIntakeData.filter(item => item.ENGINE_LOAD >= 33 && item.ENGINE_LOAD < 66))}>Mid Load</button>
          <button onClick={() => handleChartButtonClick('High Load', engineIntakeData.filter(item => item.ENGINE_LOAD >= 66 && item.ENGINE_LOAD <= 100))}>High Load</button>
        </div>
      )}
      <div>
        <canvas id="chartCanvas" width="400" height="200"></canvas>
        {selectedChart && <p>Displaying {selectedChart} chart</p>}
      </div>
    </div>
  );
};

export default EngineIntakeComparison;



