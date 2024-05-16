/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        "primary-1": "#31013F",
        "primary-2": "#690895",
        "primary-3": "#BA7DB0",
        "secondary-1": "#F9D264",
        "secondary-2": "#E9A400",
        "secondary-3": "#601C0E",
        white: "#FFFFFF",
        black: "#000000",
        gray: {
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
