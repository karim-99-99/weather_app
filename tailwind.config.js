/** @type {import('tailwindcss').Config} */
export default {
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'xss': '425px',
        'sl': '1024px',
        'ss' : '320px'
      },
    },
  },
  plugins: [],
}

