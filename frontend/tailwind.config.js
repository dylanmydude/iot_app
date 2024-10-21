// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js}',
    '../iot_app/templates/**/*.{html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
