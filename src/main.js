import { Animate3D } from './js/animation3D'
import Typewriter from 'typewriter-effect/dist/core'

require('normalize.css/normalize.css')
require('./css/main.css')
require('./page.css')

require('./menu/js/app.28787ae0')
require('./menu/js/chunk-vendors.955db42e')
require('./js/hamburger')

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'index')

  let _APP = null

  window.addEventListener('DOMContentLoaded', () => {
    console.log(Animate3D)
    console.log(typeof Animate3D)
    _APP = new Animate3D()
  })

  window.addEventListener('scroll', (e) => {
    _APP.OnScroll(window.scrollY)
  })
})

const metamove_description = document.querySelector('#metamove_description')

const typewriter = new Typewriter(metamove_description, {
  loop: false,
  delay: 75
})

typewriter
  .typeString('A Nft collection where all members are')
  .typeString('.')
  .pauseFor(1500)
  .typeString('.')
  .pauseFor(1500)
  .typeString('.')
  .pauseFor(1500)
  .deleteChars(41)
  .pauseFor(1000)
  .typeString('A Novel Nft')
  .pauseFor(300)
  .typeString(' collection where all members are able to bring to life there digital avatars through custom\n' +
    '      <span class="text-metapink-400">M̷o̸t̸i̶o̴n̶ ̴C̸a̸p̵t̸u̵r̴e̷.̵</span>')
  .start()


