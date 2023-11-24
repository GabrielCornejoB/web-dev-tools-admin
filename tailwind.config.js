/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "base-100": "#18181b",
        "base-200": "#393941",
        "base-300": "#737584",
        "base-content": "#b8b9c1",
      },
      borderWidth: {
        1: "1px",
      },
      fontFamily: {
        sans: ["Fira Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
