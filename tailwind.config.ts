import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        void: {
          950: "#040508",
          900: "#08090f",
          850: "#0c0e17",
          800: "#111422",
          700: "#181d2f",
          600: "#222a42",
        },
        cursed: {
          purple: "#9d4edd",
          violet: "#7b2cbf",
          magenta: "#c77dff",
          dark: "#3c096c",
        },
        electric: {
          blue: "#00f0ff",
          cyan: "#38bdf8",
          teal: "#14b8a6",
          dark: "#0369a1",
        },
        energy: {
          glow: "#a855f7",
          crimson: "#ff2a5f",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "neon-cyan": "0 0 20px -3px rgba(0, 240, 255, 0.35)",
        "neon-purple": "0 0 20px -3px rgba(168, 85, 247, 0.4)",
        "neon-combo": "0 0 25px -4px rgba(0, 240, 255, 0.25), 0 0 35px -2px rgba(157, 78, 221, 0.3)",
        "glass-panel": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "cursed-glow": "cursedGlow 3s ease-in-out infinite alternate",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        cursedGlow: {
          "0%": { boxShadow: "0 0 15px rgba(0, 240, 255, 0.2), 0 0 30px rgba(157, 78, 221, 0.15)" },
          "100%": { boxShadow: "0 0 25px rgba(0, 240, 255, 0.4), 0 0 45px rgba(157, 78, 221, 0.35)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
