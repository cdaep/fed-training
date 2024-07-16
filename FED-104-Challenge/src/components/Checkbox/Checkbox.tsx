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
    <div className="checkbox-direction">
      <input type="checkbox" name={name} id={name} checked={checked} onChange={onChange}/>
      <label htmlFor={name}>{label}<span className="required">*</span></label>
    </div>
  );
};

export default Checkbox;