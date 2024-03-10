/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['projects/website/src/**/*.{html,ts}'],
  // Safelisting is needed for some classes, as they are generated at component initialization,
  // but are not present in the initial html file
  safelist: [],
  theme: {
    // colors: colors,
    fontFamily: {
      heading: ['Josefin Sans', 'sans-serif'],
      body: ['DM Sans', 'sans-serif'],
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
      8: '8px',
      10: '10px',
    },
    extend: {},
  },
  plugins: [],
};
