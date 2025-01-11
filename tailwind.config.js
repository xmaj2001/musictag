const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */

export default {
  plugins: [nextui()],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/src/assets/imgs/logo-trasp.png')",
        logo: "url('/src/assets/imgs/logo.jpeg')",
      }
    },
  },
};

