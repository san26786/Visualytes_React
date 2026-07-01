/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         poppins: ["Poppins", "sans-serif"],
//       },
//       colors: {
//         primaryPink: "#ff497c",
//       },
//     },
//   },
//   plugins: [],
// };
import type { Config } from "tailwindcss";

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
        poppinsLight: ['"Poppins Light"', 'Poppins', 'sans-serif'],
        poppinsBlack: ["Poppins", "sans-serif"],

      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],

};

export default config;
// import type { Config } from "tailwindcss";

// export default {
//   content: [
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primaryPink: "#ff497c",
//       },
//     },
//   },
//   plugins: [],
// } satisfies Config;