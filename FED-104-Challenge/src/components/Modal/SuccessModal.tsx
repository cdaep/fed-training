import React from 'react';
import './successmodalstyles.scss';

interface SuccessModalProps {
    showModal: boolean;
    closeModal: () => void;
  }
  
  const SuccessModal: React.FC<SuccessModalProps> = ({ showModal, closeModal }) => {
  
    const handleOverlayClick = () => {
      closeModal(); // Close modal when clicking on overlay
    };
  
    return (
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <div className="modal-overlay" onClick={handleOverlayClick}></div>
        <div className="modal-content">
          <div className="horizontal-content">
            <img className="" src="/icon-success-check.svg" alt="Success Icon" />
            <p>Message Sent!</p>
          </div>
          <p className="contentP">Thanks for completing the form. We'll be in touch soon!</p>
        </div>
      </div>
    );
  };

export default SuccessModal;