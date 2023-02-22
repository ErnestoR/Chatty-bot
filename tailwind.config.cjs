/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    require('daisyui'),
  ],
};
