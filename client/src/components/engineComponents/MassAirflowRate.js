// MassAirflowRate.js

import React, { useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Modal from '../styleComponents/Modal'; // Import the Modal component
import './MassAirflowRate.css'; // Import the CSS file

const MassAirflowRate = ({ carId }) => {
  const [mafEngineData, setMafEngineData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [selectedChart, setSelectedChart] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

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
          borderColor: '#ffd700', // Gold color for the line
          backgroundColor: 'rgba(133, 132, 132, 0.2)', // Light background with some transparency
          pointBackgroundColor: '#333', // Dark color for points
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mass-airflow-rate-container">
      <h2 className="heading">MAF Engine Comparison</h2>
      <div className="button-group">
        <button className="chart-button" onClick={() => handleChartButtonClick('Idle', [0, 20])}>Idle</button>
        <button className="chart-button" onClick={() => handleChartButtonClick('Low Load', [20, 30])}>Low Load</button>
        <button className="chart-button" onClick={() => handleChartButtonClick('Mid Load', [30, 65])}>Mid Load</button>
        <button className="chart-button" onClick={() => handleChartButtonClick('High Load', [65, 100])}>High Load</button>
      </div>
      <div className="chart-container">
        <canvas id="chartCanvas" width="400" height="200"></canvas>
        {selectedChart && <p className="chart-description">Displaying {selectedChart} chart</p>}
      </div>
      <button className="explanation-button" onClick={showModal}>Show Explanation</button>
      <Modal
        isOpen={isModalOpen}
        onClose={hideModal}
        message={"Mass Air Flow (MAF) sensor measures the amount of air entering the engine. Proper MAF readings ensure accurate fuel delivery and engine performance. Abnormal values can indicate sensor problems or air intake issues."}
      />
    </div>
  );
};

export default MassAirflowRate;



