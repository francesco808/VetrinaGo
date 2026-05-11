import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101319",
        mist: "#F6F7F9",
        line: "#E2E6EA",
        accent: "#1F7A6B",
        coral: "#E9654B",
        gold: "#C8942F"
      },
      boxShadow: {
        soft: "0 24px 70px rgba(17, 24, 39, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
