import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Modal from '../styleComponents/Modal.js'; // Import the Modal component
import './IntakeManifoldPressure.css'; // Import the CSS file

const EngineIntakeComparison = ({ carId }) => {
  const [engineIntakeData, setEngineIntakeData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [selectedChart, setSelectedChart] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

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
              text: 'Engine Load',
              color: '#ffd700', // Gold text color
            },
            ticks: {
              color: '#ffd700', // Gold text color for x-axis labels
            },
            grid: {
              color: 'rgba(255, 215, 0, 0.3)', // Light gold grid color
            }
          },
          y: {
            title: {
              display: true,
              text: 'Intake Manifold Pressure (kPa)',
              color: '#ffd700', // Gold text color
            },
            ticks: {
              color: '#ffd700', // Gold text color for y-axis labels
            },
            grid: {
              color: 'rgba(255, 215, 0, 0.3)', // Light gold grid color
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#ffd700' // Gold text color for legend
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="engine-intake-comparison-container">
      <h2 className="heading">Engine Intake Comparison</h2>
      {engineIntakeData.length > 0 && (
        <div className="button-group">
          <button className="chart-button" onClick={() => handleChartButtonClick('Low Idle', engineIntakeData.filter(item => item.ENGINE_LOAD >= 0 && item.ENGINE_LOAD < 33))}>Low Idle</button>
          <button className="chart-button" onClick={() => handleChartButtonClick('Mid Load', engineIntakeData.filter(item => item.ENGINE_LOAD >= 33 && item.ENGINE_LOAD < 66))}>Mid Load</button>
          <button className="chart-button" onClick={() => handleChartButtonClick('High Load', engineIntakeData.filter(item => item.ENGINE_LOAD >= 66 && item.ENGINE_LOAD <= 100))}>High Load</button>
        </div>
      )}
      <div className="chart-container">
        <canvas id="chartCanvas" width="400" height="200"></canvas>
        {selectedChart && <p className="chart-description">Displaying {selectedChart} chart</p>}
      </div>
      <button className="explanation-button" onClick={showModal}>Show Explanation</button>
      <Modal
        isOpen={isModalOpen}
        onClose={hideModal}
        message={"Normal intake manifold pressure ranges between 20 and 100 kPa. Low intake manifold pressure could indicate a vacuum leak, while high pressure could indicate a restriction in the intake system."}
      />
    </div>
  );
};

export default EngineIntakeComparison;

