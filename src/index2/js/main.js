import Parallax from 'parallax-js'

require('../css/main.css')

const scene = document.getElementById('scene')
const parallaxInstance = new Parallax(scene, {
  limitX: 200,
  limitY: 100
})
