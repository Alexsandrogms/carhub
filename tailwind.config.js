/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        overlay: 'rgba(0,0,0,0.7)',
        ice: '#FAFAFA',
        'dark-green': '#00B37E',
      },
    },
  },
  plugins: [],
}
