import Parallax from 'parallax-js'

require('../css/main.css')

const scene = document.getElementById('scene')
const parallaxInstance = new Parallax(scene, {
  limitX: 2000,
  limitY: 100
})
