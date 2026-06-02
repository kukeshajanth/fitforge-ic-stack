import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // FitForge brand
        forge: {
          ink: "#0E1116",     // near-black background
          slate: "#1C2230",   // card surface
          line: "#2A3242",    // borders
          mist: "#8A93A6",    // muted text
          chalk: "#F4F6FB",   // primary text
          ember: "#FF5A3C",   // accent (energy orange)
          pulse: "#3CCF91",   // success green
          amber: "#F5B945",   // waitlist / warning
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
