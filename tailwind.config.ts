/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryPink: "#ff497c",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        serif: ["var(--font-roboto)", "serif"],
        poppinsLight: ['"Poppins Light"', "Poppins", "sans-serif"],
        poppinsBlack: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [lineClamp],
};

export default config;
