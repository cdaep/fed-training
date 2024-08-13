// ColorMode.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ColorModeType {
  textColor: string;
  bgColor: string;
  otherBgColor: string;
  placeholderColor: string;
  toggleColorMode: () => void;
}

const defaultColorMode = {
  textColor: "text-very-dark-blue",
  bgColor: "bg-very-light-grey",
  otherBgColor: "bg-white",
  placeholderColor: "placeholder-custom-grey",
  toggleColorMode: () => {},
};

// Create context with defaultColorMode values
// Components can use this to get current color mode
const ColorMode = createContext<ColorModeType>(defaultColorMode);

interface ColorProviderProps {
  children: ReactNode;
}

export function ColorProvider({ children }: ColorProviderProps) {
  const [textColor, setTextColor] = useState("text-very-dark-blue");
  const [bgColor, setBgColor] = useState("bg-very-light-grey");
  const [otherBgColor, setOtherBgColor] = useState("bg-white");
  const [placeholderColor, setPlaceholderColor] = useState(
    "placeholder-custom-grey"
  );

  useEffect(() => {
    // Load saved colors from localStorage
    const savedBgColor = localStorage.getItem("bgColor");
    const savedTextColor = localStorage.getItem("textColor");
    const savedOtherBgColor = localStorage.getItem("otherBgColor");
    const savedPlaceholderColor = localStorage.getItem("placeholderColor");

    if (savedBgColor) setBgColor(savedBgColor);
    if (savedTextColor) setTextColor(savedTextColor);
    if (savedOtherBgColor) setOtherBgColor(savedOtherBgColor);
    if (savedPlaceholderColor) setPlaceholderColor(savedPlaceholderColor);

    document.body.className = `${bgColor} ${textColor}`;
  }, [bgColor, textColor]);

  const toggleColorMode = () => {
    const newBgColor =
      bgColor === "bg-very-light-grey"
        ? "bg-very-dark-blue-bg"
        : "bg-very-light-grey";
    const newTextColor =
      textColor === "text-very-dark-blue"
        ? "text-white"
        : "text-very-dark-blue";
    const newOtherBgColor =
      otherBgColor === "bg-white" ? "bg-dark-blue" : "bg-white";
    const newPlaceholderColor =
      placeholderColor === "placeholder-custom-grey"
        ? "placeholder-white"
        : "placeholder-custom-grey";

    setBgColor(newBgColor);
    setTextColor(newTextColor);
    setOtherBgColor(newOtherBgColor);
    setPlaceholderColor(newPlaceholderColor);

    // Save to localStorage
    localStorage.setItem("bgColor", newBgColor);
    localStorage.setItem("textColor", newTextColor);
    localStorage.setItem("otherBgColor", newOtherBgColor);
    localStorage.setItem("placeholderColor", newPlaceholderColor);
  };

  return (
    //Provider passes color mode related codes
    <ColorMode.Provider
      value={{
        textColor,
        bgColor,
        otherBgColor,
        placeholderColor,
        toggleColorMode,
      }}
    >
      {children}
    </ColorMode.Provider>
  );
}

// to access ColorMode from any components
export function useColor() {
  return useContext(ColorMode);
}
