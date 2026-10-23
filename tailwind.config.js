/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "'Space Grotesk'", "system-ui", "-apple-system", "sans-serif"],
        heading: ["var(--font-display)", "'Space Grotesk'", "sans-serif"],
        pirate: ["var(--font-display)", "'Space Grotesk'", "sans-serif"],
      },
      colors: {
        coke: {
          black: "#05070B",
          dark: "#0A0D14",
          surface: "#101522",
          "surface-hover": "#161E30",
          red: "#E60026",
          "red-hover": "#CC0022",
          silver: "#E2E8F0",
          "silver-light": "#F8FAFC",
          "silver-dark": "#94A3B8",
          ocean: "#09111D",
          "ocean-blue": "#0E1A2C",
        },
        ink: {
          DEFAULT: "#05070B",
          2: "#0A0D14",
        },
        gold: {
          DEFAULT: "#E2E8F0",
          soft: "#CBD5E1",
        },
        crimson: "#E60026",
        cream: "#F8FAFC",
        seafoam: "#38BDF8",
      },
      keyframes: {
        "slide-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "slide-left": "slide-left 3s linear infinite",
        "spin-slow": "spin 6s linear infinite",
        "float-y": "float-y 4s ease-in-out infinite",
      },
    },
  },
};
