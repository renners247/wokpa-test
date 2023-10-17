import type { Config } from 'tailwindcss'
const colors = require("tailwindcss/colors");


const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      ...colors,
      dark: "#0D0D0D",
      grayTrue: "#141414",
      primary: "#36FFE8",
      success: "#188B4E",
      secondary: "#042946",
      neutral: "#5A5A5A"

    },

    fontFamily: {
      raleway: ["var(--font-raleway)", "Barlow", "Helvetica", "Arial", "sans-serif"],
      inter: ['var(--font-inter)', "Barlow", "Helvetica", "Arial", "sans-serif"],
      sans: ['var(--font-poppins)', "Helvetica", "Arial", "sans-serif"]
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
export default config
