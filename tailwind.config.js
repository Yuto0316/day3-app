/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        expense: {
          DEFAULT: '#dc2626',
          light: '#fef2f2',
          dark: '#b91c1c',
        },
        income: {
          DEFAULT: '#16a34a',
          light: '#f0fdf4',
          dark: '#15803d',
        },
      },
    },
  },
  plugins: [],
}
