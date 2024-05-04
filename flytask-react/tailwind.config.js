/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'signup-background': "url('./src/images/signup-bg.jpg')",
      }
    },
  },
  plugins: [],
}
