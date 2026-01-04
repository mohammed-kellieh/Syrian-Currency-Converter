/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        gold: {
          50: '#fbf8eb',
          100: '#f5eccd',
          200: '#edd89c',
          300: '#e3bf66',
          400: '#d9a741',
          500: '#d4af37', // Base gold
          600: '#b38b28',
          700: '#8f6821',
          800: '#755221',
          900: '#614321',
          950: '#382310',
        }
      },
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
