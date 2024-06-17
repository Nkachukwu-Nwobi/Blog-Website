import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#232536",
        yellow: "#FFD050",
        darkgrey: "#4C4C4C",
        midgrey: "#6D6E76",
        purple: "#592EA9",
        light: "#FFFFFF",
        lightyellow: "#FBF6EA",
        lightgrey: "#F4F4F4",
        lavender: "#F4F0F8",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
