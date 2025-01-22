/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            ["primary"]: '#d7da2f',
            ["secondary"]: '#d7da2f',
        }
    }
  },
  plugins: [],
}

