import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand Colors - Kaspa Nexus Theme
        brand: {
          primary: "#0EA5E9", // Sky Blue - Main brand color
          secondary: "#8B5CF6", // Purple - Secondary accent
          accent: "#06B6D4", // Cyan - Highlights
          dark: "#0C4A6E", // Deep blue
          light: "#E0F2FE", // Light blue
        },
        // Kaspa Specific
        kaspa: {
          50: "#E0F2FE",
          100: "#BAE6FD",
          200: "#7DD3FC",
          300: "#38BDF8",
          400: "#0EA5E9",
          500: "#0284C7",
          600: "#0369A1",
          700: "#075985",
          800: "#0C4A6E",
          900: "#082F49",
        },
        // Status Colors
        success: {
          DEFAULT: "#22C55E",
          light: "#86EFAC",
          dark: "#15803D",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FCD34D",
          dark: "#B45309",
        },
        error: {
          DEFAULT: "#EF4444",
          light: "#FCA5A5",
          dark: "#B91C1C",
        },
        info: {
          DEFAULT: "#3B82F6",
          light: "#93C5FD",
          dark: "#1E40AF",
        },
        // Tier Badges
        tier: {
          free: "#9CA3AF", // Gray
          pro: "#F59E0B", // Gold
          admin: "#EF4444", // Red
        },
        // Neutral Palette
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#030712",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
      },
      boxShadow: {
        glow: "0 0 20px rgba(14, 165, 233, 0.3)",
        "glow-lg": "0 0 40px rgba(14, 165, 233, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-kaspa": "linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
