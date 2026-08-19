/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
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
        darkbg: '#0B1215',
        surface: 'var(--surface)',
        hero: 'var(--hero)',
        'surface-alt': 'var(--surface-alt)',
        panel: 'var(--panel)',
        'panel-hover': 'var(--panel-hover)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        line: 'var(--line)',
        'media-bg': 'var(--media-bg)',
        card: 'var(--card)',
        'card-inset': 'var(--card-inset)',
      },

      boxShadow: {
        brutal: '4px 4px 0 0 var(--line)',
        'brutal-sm': '2px 2px 0 0 var(--line)',
        'brutal-press': '0 0 0 0 var(--line)',
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
