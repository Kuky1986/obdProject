import React, { useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const MassAirflowRate = ({ carId }) => {
  const [mafEngineData, setMafEngineData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [selectedChart, setSelectedChart] = useState(null);

  const fetchData = async () => {
      try {
        if (carId) {
          const response = await axios.get(`/api/mafdata?carId=${carId}`);
        console.log(response.data);
        setMafEngineData(response.data);
      }
    } catch (error) {
      console.error('Error fetching MAF engine comparison data:', error);
    }
  };

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
          data: data.map(item => item.MAF),
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
              text: 'Mass Air Flow (g/s)'
            }
          }
        }
      }
    });

    setChartInstance(newChartInstance);
    setSelectedChart(label);
  };

  const handleChartButtonClick = async (label, loadRange) => {
    // Fetch data when button is clicked
    await fetchData();

    // Filter data based on loadRange
    const filteredData = mafEngineData.filter(item => item.ENGINE_LOAD >= loadRange[0] && item.ENGINE_LOAD < loadRange[1]);

    // Render chart
    renderChart(label, filteredData);
  };

  return (
    <div>
      <h2>MAF Engine Comparison</h2>
      <div>
        <button onClick={() => handleChartButtonClick('Idle', [0, 20])}>Idle</button>
        <button onClick={() => handleChartButtonClick('Low Load', [20, 30])}>Low Load</button>
        <button onClick={() => handleChartButtonClick('Mid Load', [30, 65])}>Mid Load</button>
        <button onClick={() => handleChartButtonClick('High Load', [65, 100])}>High Load</button>
      </div>
      <div>
        <canvas id="chartCanvas" width="400" height="200"></canvas>
        {selectedChart && <p>Displaying {selectedChart} chart</p>}
      </div>
    </div>
  );
};

export default MassAirflowRate;


