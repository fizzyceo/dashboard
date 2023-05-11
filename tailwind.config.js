/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        morganite:"morganite"
      },
      colors:{
        'palet-blue':'#00a9d8',
        'palet-dark-blue':'#0d9edf',
        'palet-green':'#259b9a'
      }
    },
  },
  plugins: [],
};
