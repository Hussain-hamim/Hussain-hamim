/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        creme: '#E0D5C0',
        myblue: '#571FF5',
        myyellow: '#D7FF00',
        mypink: '#F72798',
        myorange: '#F15412',
        mygray: '#171717',
        accent: '#D7FF00',
        'accent-hover': '#c4ec00',
      },

      boxShadow: {
        brutal: '4px 4px 0 0 #000',
        'brutal-sm': '2px 2px 0 0 #000',
        'brutal-press': '0 0 0 0 #000',
      },

      fontFamily: {
        sans1: ['Daisyogre'],
        sans2: ['Space Mono'],
        sans3: ['Space Grotesk'],
      },
    },
  },
  plugins: [],
};
