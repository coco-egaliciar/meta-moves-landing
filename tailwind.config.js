const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,js}'],
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
