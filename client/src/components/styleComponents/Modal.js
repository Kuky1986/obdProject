import React from 'react';
import './Modal.css'; // Import the CSS file for modal styling

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
