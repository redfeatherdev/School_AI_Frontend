/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5c5ddf',
        secondary: '#F86F03',
        dark: '#231F40',
        body: '#6F6B80',
        heading: '#231F40'
      }
    }
  },
  plugins: []
}
