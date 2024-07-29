/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "poppins-bold": ["Poppins Bold", "sans-serif"],
        "poppins-bold-italic": ["Poppins BoldItalic", "sans-serif"],
        "poppins-extra-bold": ["Poppins ExtraBold", "sans-serif"],
        "poppins-extra-bold-italic": ["Poppins ExtraBoldItalic", "sans-serif"],
        "poppins-italic": ["Poppins Italic", "sans-serif"],
        "poppins-regular": ["Poppins Regular", "sans-serif"],
      },
      colors: {
        'purple': 'hsl(259, 100%, 65%)',
        'light-red': 'hsl(0, 100%, 67%)',
        white: 'hsl(0, 0%, 100%)',
        'off-white': 'hsl(0, 0%, 94%)',
        'light-grey': 'hsl(0, 0%, 86%)',
        'smokey-grey': 'hsl(0, 1%, 44%)',
        'off-black': 'hsl(0, 0%, 8%)',
      },
      fontSize: {
        'custom11':'11px',
        'custom32': '32px',
      },
      screens: {
        'max-xs': { 'max': '500px' },
      },
      borderRadius: {
        'custom-xl': '8rem',
      },
      minHeight: {
        'screen': '100vh',
      },
    },
  },
  plugins: [],
};
