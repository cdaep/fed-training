// Nav.tsx
import React, { useState } from "react";

// Import Tailwind CSS base styles
import "tailwindcss/tailwind.css";

//Import components
import Searchbar from "../Searchbar/Searchbar";
import Filter from "../Filter/Filter";
import { useColor } from "../ColorMode/ColorMode";

//Import enum
import { NavigationVariant } from "../../enums/NavigationVariant";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { ButtonVariant } from "../../enums/ButtonVariant";

interface NavigationProps {
  variant: NavigationVariant;
  query?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFilterChange?: (region: string) => void;
}

const Nav: React.FC<NavigationProps> = ({
  query,
  variant,
  onInputChange,
  onKeyPress,
  onFilterChange,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <nav
      className={`flex flex-col md:flex-row items-start sm:items-start justify-between w-full bg-transparent mt-custom-120 sm:px-custom-10.3rem max-xs:px-4 max-xs:space-y-9`}
    >
      {variant === "main" ? (
        <>
          <div className="flex items-center">
            <Searchbar value={query}  onInputChange={onInputChange} onKeyPress={onKeyPress} />
          </div>
          <div className="flex items-center">
            <Filter onFilterChange={onFilterChange} />
          </div>
        </>
      ) : (
        <Button
          title="Back"
          variant={ButtonVariant.Primary}
          onClick={handleBackClick}
        />
      )}
    </nav>
  );
};

export default Nav;
