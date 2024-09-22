/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        rancho: ['"Rancho"', "cursive"],
        raleway: ['"Raleway"', "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
