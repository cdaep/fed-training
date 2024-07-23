import React from 'react';
import { ModalVariant } from '../../enums/ModalVariant';

interface ModalProps {
    variant: ModalVariant;
    showModal: boolean;
    closeModal: () => void;
  }
  
  const Modal: React.FC<ModalProps> = ({ variant, showModal, closeModal }) => {

    const getBackgroundClass = (): string => {
        switch (variant) {
        case ModalVariant.Success:
            return 'bg-grey-darker text-white';
        case ModalVariant.Error:
            return 'bg-white border-2 border-red text-red';
        }
    }
  
    const handleOverlayClick = () => {
      closeModal(); // Close modal when clicking on overlay
    };
  
    return (
        <div className={ `fixed mt-2 top-0 left-0 right-0 z-50 flex items-start justify-center${showModal ? 'animate-fadeInTranslate' : ''} modal`}>
        <div className="fixed inset-0 opacity-50" onClick={handleOverlayClick}></div>
        <div className={ `${getBackgroundClass()} p-4 rounded-[10px] text-center flex items-center w-[23.5rem] h-[7.5rem] mx-auto flex-col`}>
            <div className="flex gap-[0.6rem] self-start my-[0.5rem]">
            <div className="mr-2.5">
            <img className="w-6 h-6" src={variant === ModalVariant.Success ? "/icon-success-check.svg" : "/icon-error.svg"} alt={variant === ModalVariant.Success ? "Success Icon" : "Error Icon"} />
            </div>
            <p className="font-karla-bold m-0">{variant === ModalVariant.Success ? "Message Sent!" : "An Error Occurred!"}</p>
            </div>
            <p className="text-custom15 m-0 font-karla-regular text-left">{variant === ModalVariant.Success ? "Thanks for completing the form. We'll be in touch soon!" : "Oops, you are missing a required field. Please try again."}</p>
        </div>
        </div>
    );
  };

export default Modal;