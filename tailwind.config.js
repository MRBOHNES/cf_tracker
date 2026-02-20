/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        codeforces: {
          red: '#ff0000',
          orange: '#ff8c00',
          blue: '#0000ff',
          purple: '#800080',
          green: '#008000',
        }
      }
    },
  },
  plugins: [],
}
