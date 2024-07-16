import React from 'react';
import './radiobuttonstyles.scss';

interface RadioButtonProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ name, value, checked, onChange }) => {
  return (
      <div className="query-option-item">
        <input
          type="radio"
          name={name}
          id={value}
          className="radio"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <label className="radio-label" htmlFor={value}>{value}</label>
      </div>
  );
};

export default RadioButton;