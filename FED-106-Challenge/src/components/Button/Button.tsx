import React from 'react';
import { ButtonVariant } from '../../enums/ButtonVariant';
import { useColor } from '../ColorMode/ColorMode';
import { IconProps } from "../../types/types";

interface ButtonProps {
  title: string;
  variant: ButtonVariant;
  icon: React.FC<IconProps>; 
  iconProps?: IconProps;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, variant, icon: Icon, iconProps, onClick}) => {
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
            className={`flex items-center gap-1 ${getButtonStyle()}`}
            onClick={onClick}
            aria-label = "Custom button">
              <Icon {...iconProps} /> 
            <span>{title}</span>
        </button>
      </div>
    );
  };

export default Button;