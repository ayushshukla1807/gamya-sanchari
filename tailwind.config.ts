import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1844ef",
          orange: "#f06619",
          dark: "#212121",
          body: "#656565",
          surface: "#f3f3f3",
          midnight: "#081329",
          ivory: "#fffaf0",
          sand: "#eadbc4",
          mist: "#eaf0f6",
          gold: "#b97918",
        },
      },
      fontFamily: {
        sans: ["var(--font-libre-franklin)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
