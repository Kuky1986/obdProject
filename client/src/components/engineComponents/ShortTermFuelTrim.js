import React from 'react';
import './ShortTermFuelTrim.css'; // Import the CSS file

const ShortTermFuelTrim = () => {
  return (
    <div className="short-term-fuel-trim-container">
      <h2 className="heading">Short Term Fuel Trim</h2>
      
      <p className="placeholder-message">
        This section is under development. Please check back later for detailed information on short-term fuel trims.
      </p>

      <p style={{ fontSize: '1rem', color: '#1a1919', marginBottom: '15px' }}>
        Short Term Fuel Trim (STFT) is a measure of how much the engine control unit (ECU) is adjusting the fuel mixture in real-time. These adjustments are made based on various sensor inputs to ensure optimal engine performance and efficiency.
      </p>
      <ul className="info-list">
        <li><strong>What is STFT?</strong> STFT is a dynamic adjustment made by the ECU to correct the air-fuel mixture based on real-time engine conditions.</li>
        <li><strong>Why is STFT important?</strong> It helps maintain the ideal air-fuel ratio, improving fuel efficiency, reducing emissions, and ensuring smooth engine operation.</li>
        <li><strong>How is STFT measured?</strong> STFT is typically expressed as a percentage. Positive values indicate the ECU is adding fuel, while negative values mean it's reducing fuel.</li>
        <li><strong>Common issues with STFT:</strong> Significant deviations from the normal range can indicate problems such as a faulty oxygen sensor, fuel injector issues, or vacuum leaks.</li>
      </ul>

      <p className="contact-info">
        For more details or support, contact us at <a href="mailto:support@example.com">support@example.com</a>.
      </p>
    </div>
  );
};

export default ShortTermFuelTrim;

