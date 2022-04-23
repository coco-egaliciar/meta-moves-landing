import { Animate3D } from './js/animation3D'
import Typewriter from 'typewriter-effect/dist/core'

require('normalize.css/normalize.css')
require('./css/main.css')
require('./page.css')

// require('./menu/js/app.28787ae0')
// require('./menu/js/chunk-vendors.955db42e')
require('./js/hamburger')
require('./js/decentraland')
require('./js/ourchannels')
require('./js/gallery')

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'index')

  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })

  // if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  //   let _APP = null
  //
  //   window.addEventListener('DOMContentLoaded', () => {
  //     _APP = new Animate3D()
  //   })
  //
  //   window.addEventListener('scroll', (e) => {
  //     _APP.OnScroll(window.scrollY)
  //   })
  // }
})
//
// const metamoveDescription = document.querySelector('#metamove_description')
//
// const typewriter = new Typewriter(metamoveDescription, {
//   loop: false,
//   delay: 75
// })
//
// typewriter
//   .typeString('A NFT collection where all members are')
//   .typeString('.')
//   .pauseFor(1500)
//   .typeString('.')
//   .pauseFor(1500)
//   .typeString('.')
//   .pauseFor(1500)
//   .deleteChars(41)
//   .pauseFor(1000)
//   .typeString('A Novel NFT')
//   .pauseFor(300)
//   .typeString(' collection where all members are able to bring to life there digital avatars through custom\n' +
//     '      <span class="text-metablue">M̷o̸t̸i̶o̴n̶ ̴C̸a̸p̵t̸u̵r̴e̷.̵</span>')
//   .start()
//
const visuals1 = document.querySelector('#visuals__1')
visuals1.addEventListener('mouseover', () => {
  document.querySelector('#visuals__background_1').classList.add('visuals__rotation')
})

visuals1.addEventListener('mouseleave', () => {
  document.querySelector('#visuals__background_1').classList.remove('visuals__rotation')
})

const visuals2 = document.querySelector('#visuals__2')
visuals2.addEventListener('mouseover', () => {
  document.querySelector('#visuals__background_2').classList.add('visuals__rotation')
})

visuals2.addEventListener('mouseleave', () => {
  document.querySelector('#visuals__background_2').classList.remove('visuals__rotation')
})

const visuals3 = document.querySelector('#visuals__3')
visuals3.addEventListener('mouseover', () => {
  document.querySelector('#visuals__background_3').classList.add('visuals__rotation')
})

visuals3.addEventListener('mouseleave', () => {
  document.querySelector('#visuals__background_3').classList.remove('visuals__rotation')
})
