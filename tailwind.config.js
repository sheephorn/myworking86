/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.ts",
    "./resources/**/*.jsx",
    "./resources/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#93c5fd', // blue-300
        'brand-yellow': '#fde047', // yellow-300
      },
    },
  },
  plugins: [],
}
