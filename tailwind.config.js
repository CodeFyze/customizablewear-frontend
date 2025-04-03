/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bluebg: '#091638',  // your custom color
        customGreen: '#10B981', // another custom color
      },
    },
  },
  plugins: [],
}

