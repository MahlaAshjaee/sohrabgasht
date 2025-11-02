/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        iranYekan: ['IRANYekan', 'sans-serif'],
      },
      colors: {
        'brand-red': '#D50000',
        'brand-red-dark': '#B00000',
      },
    },
  },
  plugins: [],
}
