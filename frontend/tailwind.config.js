/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // In v4, colors are available by default, but you can extend them
      colors: {
        blue: {
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        red: {
          500: "#ef4444",
          600: "#dc2626",
        },
        pink: {
          200: "#fbcfe8",
        },
        purple: {
          500: "#a855f7",
        },
      },
    },
  },
  plugins: [],
};