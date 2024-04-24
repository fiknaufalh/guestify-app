/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        "purple-dark": "#31013F",
        "purple-light": "#BA7DB0",
        purple: "#690895",
        yellow: "#F9D264",
        orange: "#E9A400",
        brown: "#601C0E",
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
