import React, { useState } from 'react';
import Navbar from './styleComponents/Navbar';
import Modal from './styleComponents/Modal'; // Import the Modal component
import './Home.css'; // Import the CSS file for Home

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to show the modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Function to hide the modal
  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home-container">
      <Navbar />
      <h1>OBD Scanner Application</h1>
      <p>Feel free to explore and navigate to other pages using the navigation menu.</p>
      <button className="btn" onClick={showModal}>About The App</button>
      <Modal 
        isOpen={isModalOpen} 
        onClose={hideModal} 
        message="Welcome to the OBD Scanner application designed specifically for automotive professionals. This tool enables car mechanics to perform detailed diagnostics by scanning a vehicle's onboard systems. The application provides a comprehensive view of various parameters."
      />
    </div>
  );
};

export default Home;
