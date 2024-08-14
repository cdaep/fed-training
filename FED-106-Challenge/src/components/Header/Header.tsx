// Header.tsx
import React from "react";

import "tailwindcss/tailwind.css";
import { useColor } from "../ColorMode/ColorMode";
import { ButtonVariant } from "../../enums/ButtonVariant";
import Button from "../Button/Button";
import { IconLibrary } from '../../assets/Icons/IconLibrary'; 

const Header: React.FC = () => {
  const { textColor, otherBgColor, toggleColorMode } = useColor();
  return (
    <header
      className={`fixed top-0 left-0 w-full h-20 ${otherBgColor} ${textColor} p-10 z-1000 shadow-custom flex items-center justify-between`}
    >
      <div className="flex items-center">
        <p className="font-nunito-sans font-bold text-xl">
          Where in the world?
        </p>
      </div>
      <div className="flex items-center">
        <Button
          title="Dark Mode"
          variant={ButtonVariant.Mode}
          icon= {IconLibrary.Moon}
          iconProps={{ width: 16, height: 16}}
          onClick={toggleColorMode}
        />
      </div>
    </header>
  );
};

export default Header;
