import React from 'react';
import './buttonstyles.scss';

interface ButtonProps {
  value: string;
  variant?: 'primary';
  className: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ value, variant, className, onClick }) => {
    const getVariantClassName = (): string => {
        switch (variant) {
        case 'primary':
            return 'button-primary';
        default:
            return '';
        }
    }
    const buttonClassName = `${className} ${getVariantClassName()}`.trim();
    return (
      <button type="button" className={buttonClassName} onClick={onClick}>
        {value}
      </button>
    );
  };

export default Button;