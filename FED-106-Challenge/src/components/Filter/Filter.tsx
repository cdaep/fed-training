// Filter.tsx
import React, { useState, useEffect } from "react";
import { useColor } from "../ColorMode/ColorMode";
import { useLocation, useNavigate } from "react-router-dom";
import { IconLibrary } from '../../assets/Icons/IconLibrary';

interface FilterProps {
  onFilterChange?: (region: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const { textColor, otherBgColor } = useColor();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // To retain the selection filter option when navigating back from detail page 
    const queryParams = new URLSearchParams(location.search);
    const region = queryParams.get('region') || '';
    setSelectedOption(region);
  }, [location.search]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    // Update URL with the selected region
    navigate(`?region=${encodeURIComponent(option)}`, { replace: true });

    if (onFilterChange) {
      onFilterChange(option);
    }
  };

  const filterOptions = [
    { label: "All", value: "" },
    { label: "Africa", value: "Africa" },
    { label: "Americas", value: "Americas" },
    { label: "Asia", value: "Asia" },
    { label: "Europe", value: "Europe" },
    { label: "Oceania", value: "Oceania" },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-48 h-12 px-3 py-2  ${otherBgColor} ${textColor} rounded shadow-custom font-nunito-sans text-sm flex items-center justify-between`}
      >
        {selectedOption || "Filter by Region"}
        <IconLibrary.FilterArrow width={16} height={16} className="ml-3" />
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 mt-1 w-full ${otherBgColor} ${textColor} font-nunito-sans text-sm rounded shadow-custom`}
        >
          <ul className="py-1">
            {filterOptions.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 hover:bg-custom-grey cursor-pointer"
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filter;
