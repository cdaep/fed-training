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
        "nunito-sans": ["Nunito Sans", "sans-serif"],
      },
      fontWeight: {
        'light': 300,
        'normal': 600,
        'bold': 800,
      },
      colors: {
        'dark-blue': 'hsl(209, 23%, 22%)',
        'very-dark-blue-bg': 'hsl(207, 26%, 17%)',
        'very-dark-blue-text': 'hsl(200, 15%, 8%)',
        'dark-grey': 'hsl(0, 0%, 52%)',
        'very-light-grey': 'hsl(0, 0%, 98%)',
        white: 'hsl(0, 0%, 100%)',
        'custom-grey': 'hsl(0, 0%, 60%)',

      },
      fontSize: {
        'custom11':'11px',
        'custom32': '32px',
      },
      screens: {
        'max-xs': { 'max': '500px' },
        'min-xs':  '501px' ,
      },
      borderRadius: {
        'custom-xl': '8rem',
      },
      minHeight: {
        'screen': '100vh',
      },
      zIndex: {
        '1000': '1000', 
      },
      boxShadow: {
        'custom': '0 2px 5px hsla(0, 0%, 0%, 0.1)',
        'custom-darker': '0 2px 5px hsla(0, 0%, 0%, 0.1), 0 4px 8px hsla(0, 0%, 0%, 0.1)',
      },
      spacing: {
        'custom-120': '120px',
      },
      width: {
        'custom-28rem': '28rem',    // Custom width value of 32rem (512px)
        // '144': '36rem',    // Custom width value of 36rem (576px)
        // '160': '40rem',    // Custom width value of 40rem (640px)
        '1/7': '14.285714%', // Custom width value for 1/7 of the parent
        // 'screen-50': '50vw', // Custom width value for 50% of viewport width
      },
      height: {
        'custom-10rem': '10rem', // Add custom height value
      },
      padding: {
        'custom-7rem': '7rem', // Custom left padding
        'custom-10.3rem': '10rem',
        'custom-4rem': '4rem',
      },
      
    },
  },
  plugins: [],
};
