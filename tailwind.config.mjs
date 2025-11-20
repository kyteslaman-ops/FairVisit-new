/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          600: "#0D9488",
          700: "#0F766E"
        },
        coral: {
          500: "#FB7185"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 118, 110, 0.16)"
      }
    }
  },
  plugins: []
};
