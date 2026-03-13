import type { Config } from "tailwindcss";

/**
 * Tailwind CSS config. "content" tells Tailwind which files to scan for class names;
 * only those get included in the final CSS. Hero uses bg-hero (backgroundImage.hero).
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        hero: 'url("/hero.png")', // Used in Hero.tsx as className="bg-hero"
      },
    },
  },
  plugins: [],
};
export default config;
