/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'font1': ['Alike Angular', 'Arial', 'sans'],
        'font2': ['Work Sans', 'Arial', 'sans'],
      },
      colors: {
        'primary': '#41827B', 
        'secondary': '#416982',
        'footer': '#41825b',
      },
    },
  },
  plugins: [],
}