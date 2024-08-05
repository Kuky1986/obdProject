import React from 'react';
import './LongTermFuelTrim.css'; // Import the CSS file

const LongTermFuelTrim = () => {
  return (
    <div className="long-term-fuel-trim-container">
      <h2 className="heading">Long Term Fuel Trim</h2>

      <p className="placeholder-message">
        This section is under development. Please check back later for detailed information on long-term fuel trims.
      </p>

      <p className="info-message">
        Long Term Fuel Trim (LTFT) represents the cumulative adjustments made by the engine control unit (ECU) to maintain the optimal air-fuel ratio over a longer period. Unlike Short Term Fuel Trim, which reacts to immediate conditions, LTFT adjusts for longer-term changes in the engine’s performance.
      </p>
      <ul className="info-list">
        <li><strong>What is LTFT?</strong> LTFT is the ECU's long-term adjustment to the air-fuel mixture based on historical data and trends.</li>
        <li><strong>Why is LTFT important?</strong> It helps compensate for long-term variations such as fuel quality changes, engine wear, or sensor drift, ensuring consistent engine performance and emissions.</li>
        <li><strong>How is LTFT measured?</strong> LTFT is also expressed as a percentage. Positive values indicate the ECU is adding fuel over the long term, while negative values mean it's reducing fuel.</li>
        <li><strong>Common issues with LTFT:</strong> Significant deviations from the normal range can indicate issues such as persistent fuel delivery problems or long-term sensor malfunctions.</li>
      </ul>

      <p className="contact-info">
        For more details or support, contact us at <a href="mailto:support@example.com">support@example.com</a>.
      </p>
    </div>
  );
};

export default LongTermFuelTrim;

