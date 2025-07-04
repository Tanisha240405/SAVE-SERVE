/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: '#f5f5dc',
        brown: {
          light: '#b08968',
          DEFAULT: '#7f5539',
          dark: '#5e3023'
        },
      },
    },
  },
  plugins: [],
};

