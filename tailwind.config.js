/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      display: ["founders-grotesk", "Sora", "Source Sans Pro", "sans-serif"],
      body: ["founders-grotesk", "Sora", "Source Sans Pro", "sans-serif"],
    },
    extend: {
      keyframes: {
        fadeInSlideDown: {
          "0%": { opacity: "0", maxHeight: "0" },
          "100%": { opacity: "1", maxHeight: "500px" },
        },
        fadeOutSlideUp: {
          "0%": { opacity: "1", maxHeight: "500px" },
          "100%": { opacity: "0", maxHeight: "0" },
        },
      },
      animation: {
        fadeInSlideDown: "fadeInSlideDown 0.75s ease-in-out",
        fadeOutSlideUp: "fadeOutSlideUp 0.75s ease-in-out",
      },
    },
  },
  plugins: [],
};
