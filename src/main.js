import { Animate3D } from './js/animation3D'

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
