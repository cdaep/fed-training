import React, { ChangeEvent } from 'react';
import './checkboxstyles.scss';

interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, checked, onChange, label }) => {
  return (
    <div className="flex items-center gap-4 text-base mb-2.5 font-karla-variable">
      <input type="checkbox" className="custom-checkbox appearance-none w-5 h-5 border border-grey-medium bg-no-repeat bg-center bg-contain" name={name} id={name} checked={checked} onChange={onChange}/>
      <label htmlFor={name}>{label}<span className="ml-custom-ml-5 text-green-medium">*</span></label>
    </div>
  );
};

export default Checkbox;