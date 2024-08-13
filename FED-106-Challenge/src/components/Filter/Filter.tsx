// Filter.tsx
import React, { useState, useEffect } from "react";
import { useColor } from "../ColorMode/ColorMode";
import { useLocation, useNavigate } from "react-router-dom";

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
        {/*temporary approach for the arrow only. Will fix this*/}
        <svg
          className="ml-3 w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
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
