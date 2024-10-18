/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(listbox|divider).js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    nextui({
      themes: {
        dark: {},
        light: {},
      },
    }),
  ],
};
