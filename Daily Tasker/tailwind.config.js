/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        heading: "#1E283A",
        success: "#05C46B",
        danger: "#FF5E57",
        warning: "#ffdd59",
      },
    },
  },
  plugins: [],
};
