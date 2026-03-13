/**
 * PostCSS config. Next.js runs this on CSS. tailwindcss processes @tailwind
 * directives in globals.css; autoprefixer adds vendor prefixes for browser support.
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
