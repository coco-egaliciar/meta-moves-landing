const colors = require('tailwindcss/colors')

module.exports = {
  important: true,
  // purge: ['./dist/*.html'],
  content: ['src/*.{html,js}', 'src/partials/*.{html,js}'],

  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      metablue: '#0066FFFF',
      metapink: {
        100: '#d02a6c',
        400: '#f30061'
      }
    },
    fontFamily: {
      marker: ['Permanent Marker'],
      nunito: ['Nunito Sans']
    },

    extend: {}
  },
  plugins: []
}
