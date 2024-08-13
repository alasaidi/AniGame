/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-500": "#00B0FF", // Piltover blue
        "primary-600": "#0081CB", // Darker Piltover blue
        "secondary-500": "#FF4081", // Zaun pink
        "off-white": "#E0F7FA",
        red: "#FF1744",
        "dark-1": "#102027", // Very dark blue-gray
        "dark-2": "#37474F", // Dark blue-gray
        "dark-3": "#455A64", // Medium blue-gray
        "dark-4": "#546E7A", // Light blue-gray
        "light-1": "#FFFFFF",
        "light-2": "#ECEFF1",
        "light-3": "#B0BEC5",
        "light-4": "#78909C",
        "hex-1": "#C2185B", // Hextech purple
        "hex-2": "#7B1FA2", // Darker Hextech purple
      },
      screens: {
        xs: "480px",
      },
      width: {
        420: "420px",
        465: "465px",
      },
      fontFamily: {
        sans: ["Beaufort for LOL", "Inter", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "hextech-glow": {
          "0%, 100%": { boxShadow: "0 0 5px #C2185B, 0 0 10px #C2185B, 0 0 15px #C2185B" },
          "50%": { boxShadow: "0 0 10px #7B1FA2, 0 0 20px #7B1FA2, 0 0 30px #7B1FA2" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "hextech-glow": "hextech-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
