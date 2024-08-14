// SearchBar.tsx
import React from "react";
import { useColor } from "../ColorMode/ColorMode";
import { IconLibrary } from '../../assets/Icons/IconLibrary';
import { IconProps } from "../../types/types";



interface SearchBarProps {
  value?: string;
  formClassName?: string;
  icon: React.FC<IconProps>; 
  iconProps?: IconProps;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC <SearchBarProps> = ({value,formClassName, icon: Icon, iconProps, onInputChange, onKeyPress}) => {
  const { textColor, otherBgColor, placeholderColor } = useColor();

  return (
    <form className={`${formClassName} h-12 flex items-center shadow-custom rounded lg:w-custom-28rem  md:w-[18rem] sm:w-[50vw] max-xs:w-[28.5rem]`}>
      <Icon {...iconProps} /> 
      <input
        type="text"
        value={value}
        placeholder="Search for a country..."
        onChange={onInputChange}
        onKeyDown={onKeyPress}
        className={`${otherBgColor} ${textColor} ${placeholderColor} w-full h-12 flex-1 px-4 py-2 font-nunito-sans text-sm focus:outline-none`}
      />
    </form>
  );
};

export default SearchBar;
