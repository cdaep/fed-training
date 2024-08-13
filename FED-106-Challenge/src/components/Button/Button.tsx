import React from 'react';
import { ButtonVariant } from '../../enums/ButtonVariant';
import { useColor } from '../ColorMode/ColorMode';

interface ButtonProps {
  title: string;
  variant: ButtonVariant;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, variant, onClick}) => {
  const {textColor, otherBgColor } = useColor();
    const getButtonStyle = (): string => {
      switch (variant) {
      case ButtonVariant.Primary:
          return `${otherBgColor} ${textColor} w-[7rem] h-[2rem] shadow-custom flex justify-center items-center font-nunito-sans font-light text-sm rounded`;
      case ButtonVariant.Mode:
          return 'font-nunito-sans font-normal text-sm';
      }
  }
    return (
      <div className="flex items-center justify-center"> 
      <button
            type = "button"
            className={`${getButtonStyle()}`}
            onClick={onClick}
            aria-label = "Custom button">
              {title}
        </button>
      </div>
    );
  };

export default Button;