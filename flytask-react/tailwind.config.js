/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glacierWhite : '#F3F5F6', 
        upcoming: '#BFF3FF', 
        toDo: '#FA9E9E', 
        doing: '#FCEA9A', 
        done: '#C0FFA9', 
        primaryDark: '#008F85', 
        primary: '#006C67', 
        yellow: '#F2CF34', 
        mint: '#DCECEB', 
        charcoal: '#3E4856'        
      },
      backgroundImage: {
        'signup-bg': "url('./src/images/signup-bg.jpg')",
      }
    },
  },
  plugins: [],
}
