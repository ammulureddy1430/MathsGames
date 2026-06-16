/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Nunito', 'system-ui', 'sans-serif'] },
      boxShadow: { soft: '0 12px 30px rgba(54, 43, 20, .10)' },
    },
  },
  plugins: [],
}
