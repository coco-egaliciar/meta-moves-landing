import { Animate3D } from './js/animation3D'
require('normalize.css/normalize.css')
require('./css/main.css')
require('./page.css')

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
