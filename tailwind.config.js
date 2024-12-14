import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,pug}'],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: ['light', 'dark'],
  },

  plugins: [daisyui],
};
