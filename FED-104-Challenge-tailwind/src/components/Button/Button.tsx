import React from 'react';
import { ButtonVariant } from '../../enums/ButtonVariant';

interface ButtonProps {
  value: string;
  variant: ButtonVariant;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ value, variant, onClick}) => {
    const getBackgroundClass = (): string => {
      switch (variant) {
      case ButtonVariant.Primary:
          return 'bg-green-medium hover:bg-primary-button-hover';
      case ButtonVariant.Undefined:
          return '';
      }
  }

    const buttonClassName = `${getBackgroundClass()} w-full h-12 text-white rounded-lg border-0 cursor-pointer transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-500 disabled:cursor-not-allowed`.trim();
    return (
      <button type="button" className={buttonClassName} onClick={onClick} >
        {value}
      </button>
    );
  };

export default Button;