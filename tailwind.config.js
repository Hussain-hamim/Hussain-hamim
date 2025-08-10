/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // You can extend Chakra theme colors here for consistency

      colors: {
        creme: '#E0D5C0',
        myblue: '#571FF5',
        myyellow: '#BEFF05',
        mypink: '#F72798',
        myorange: '#F15412',
        mygray: '#171717',
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
