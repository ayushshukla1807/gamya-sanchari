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
          terracotta: "#a63d24",
          saffron: "#f06619",
          dark: "#3f2a20",
          body: "#6a594b",
          surface: "#f3f3f3",
          midnight: "#27372c",
          ivory: "#fffaf0",
          sand: "#eadbc4",
          mist: "#f2e8d8",
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
