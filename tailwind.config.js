/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInSlideDown: {
          "0%": { opacity: "0", transform: "translateY(-100%)" },
          "50%": { opacity: "0", transform: "translateY(0)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOutSlideUp: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "50%": { opacity: "0", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-100%)" },
        },
      },
      animation: {
        fadeInSlideDown: "fadeInSlideDown 0.5s ease-in-out forwards",
        fadeOutSlideUp: "fadeOutSlideUp 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
