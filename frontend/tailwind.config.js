/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#0B66C3',
        secondary: '#12B886',
        background: '#F7FAFC',
        ink: '#0F172A',
      }
    },
  },
  plugins: [],
}
