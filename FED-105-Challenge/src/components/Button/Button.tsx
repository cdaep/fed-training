import React from 'react';
import { ButtonVariant } from '../../enums/ButtonVariant';
import './button.scss';

interface ButtonProps {
  variant: ButtonVariant;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick}) => {
    const getBackgroundClass = (): string => {
      switch (variant) {
      case ButtonVariant.Primary:
          return 'bg-purple hover:bg-black';
      case ButtonVariant.Undefined:
          return '';
      }
  }
    return (
      <div className="flex items-center justify-center"> 
      <button
            type = "button"
            className={`${getBackgroundClass()} w-20 h-20 rounded-full overflow-hidden border-2 flex items-center justify-center`}
            onClick={onClick}
            aria-label = "Custom button">
            <div className="custom-image-button w-full h-full bg-no-repeat bg-center object-cover"/>
        </button>
      </div>
    );
  };

export default Button;