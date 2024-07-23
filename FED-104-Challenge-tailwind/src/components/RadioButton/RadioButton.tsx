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
      <div className="flex border font-karla-variable border-grey-medium p-3 rounded-lg items-center gap-4 text-base w-full 
                  hover:cursor-pointer focus-within:bg-green-lighter focus-within:border-green-medium">
        <input
          type="radio"
          name={name}
          id={value}
          className="appearance-none w-5 h-5 bg-no-repeat bg-center bg-contain border border-gray-400 rounded-full cursor-pointer checked:bg-none"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <label className="radio-label" htmlFor={value}>{value}</label>
      </div>
  );
};

export default RadioButton;