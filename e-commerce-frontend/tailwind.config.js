/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/flowbite/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')  
  ],
}

