/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        "karla-bold": ["Karla Bold", "sans-serif"],
        "karla-regular": ["Karla Regular", "sans-serif"],
        "karla-italic-variable": ["Karla Italic Variable", "sans-serif"],
        "karla-variable": ["Karla Variable", "sans-serif"],
      },
      colors: {
        'grey-medium': 'hsl(186, 15%, 59%)',
        'grey-darker': 'hsl(187, 24%, 22%)',
        'green-lighter': 'hsl(148, 38%, 91%)',
        'green-medium': 'hsl(169, 82%, 27%)',
        red: 'hsl(0, 66%, 54%)',
        white: 'hsl(0, 0%, 100%)',
        'red-darker': 'hsl(0, 100%, 27%)',
        'primary-button-hover': 'hsl(170, 86%, 19%)',
      },
      animation: {
        fadeInTranslate: 'fadeInTranslate 0.4s ease-out',
      },
      keyframes: {
        fadeInTranslate: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontSize: {
        'custom15':'15px',
        'custom20': '20px',
      },
      spacing: {
        'custom-ml-5': '5px',
      },
      screens: {
        'max-xs': { 'max': '500px' },
      },
    },
  },
  plugins: [],
};
