import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gaming: ["GamingHeader", "Impact", "Arial Black", "sans-serif"],
        sans: ["Rajdhani", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        snow: "snowfall linear infinite",
        blizzard: "blizzard-move linear infinite",
        firefly: "firefly-float ease-in-out infinite alternate",
        traffic: "traffic-move linear infinite",
        matrix: "matrix-fall linear infinite",
        jump: "monkey-jump 1.5s ease-in-out infinite",
        sandstorm: "sandstorm-move 3s linear infinite",
        breathe: "breathe 4s ease-in-out infinite",
        "grid-move": "grid-move 20s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
