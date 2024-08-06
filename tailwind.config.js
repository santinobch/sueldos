import COLORS from './projects/website/src/assets/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['projects/website/src/**/*.{html,ts}'],
  // Safelisting is needed for some classes, as they are generated at component initialization,
  // but are not present in the initial html file
  safelist: [
    {
      pattern: /!bg-(violet|magenta|red|orange|yellow|lime|green|blue)/,
    },
    {
      pattern:
        /!bg-(violet|magenta|red|orange|yellow|lime|green|blue)-(100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /!bg-(gray|primary|secondary|accent)-(100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /!text-(violet|magenta|red|orange|yellow|lime|green|blue)/,
    },
    {
      pattern:
        /!text-(violet|magenta|red|orange|yellow|lime|green|blue)-contrast/,
    },
    {
      pattern:
        /!text-(violet|magenta|red|orange|yellow|lime|green|blue)-contrast-(100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /!border-(violet|magenta|red|orange|yellow|lime|green|blue)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    colors: COLORS,
    fontFamily: {
      heading: ['Madimi One', 'sans-serif'],
      body: ['Saira Semi Condensed', 'sans-serif'],
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
