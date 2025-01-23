/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          ["primary"]: '#3B82F6',
          ["secondary"]: '#FCD34D',
          ["base"]: '#F3F4F6',
          ["primary-red"]: '#EF4444',
          ["primary-dark"]: '#111827'
        }
    }
  },
  plugins: [],
}

