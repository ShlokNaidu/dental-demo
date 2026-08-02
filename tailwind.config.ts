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
        background: "#FAF9F6",
        foreground: "#1C1917",
        accent: {
          DEFAULT: "#0D9488",
          hover: "#0F766E",
          dark: "#042F2E",
          muted: "#E6F4F1",
          light: "#F0FDFA",
        },
        gold: {
          DEFAULT: "#D97706",
          light: "#FEF3C7",
          dark: "#B45309",
        },
        charcoal: {
          DEFAULT: "#262626",
          dark: "#171717",
          muted: "#525252",
          light: "#A3A3A3",
        },
        success: {
          DEFAULT: "#16A34A",
          light: "#DCFCE7",
        },
        error: {
          DEFAULT: "#DC2626",
          light: "#FEE2E2",
        },
      },
      fontFamily: {
        display: ["'Cabinet Grotesk'", "sans-serif"],
        body: ["'Switzer'", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 10px 30px -4px rgba(13, 148, 136, 0.15)",
        "gold-glow": "0 10px 30px -4px rgba(217, 119, 6, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
