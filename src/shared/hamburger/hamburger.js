import BrowserDetector from 'browser-dtector'

const browser = new BrowserDetector(window.navigator.userAgent)
const platform = browser.parseUserAgent()

const menuLinks = document.querySelectorAll('.menu-item a')
const checker = document.querySelector('.checkbox')

require('../../shared/menu/js/app.min')
require('../../shared/menu/js/chunk-vendors.min')
require('../../shared/menu/css/app.c26ea9af.css')

function menu () {
  const menu = document.querySelector('#menu')
  if (checker.checked) {
    menu.classList.add('menu__show')
    menu.classList.remove('menu__hidden')
    document.querySelector('html').style.overflow = 'hidden'
    console.log('Checkbox is not checked..')
  } else {
    menu.classList.add('menu__hidden')
    menu.classList.remove('menu__show')
    document.querySelector('html').style.overflow = 'visible'
    console.log('Checkbox is not checked..')
  }
}

menuLinks.forEach((element) => {
  element.addEventListener('click', (e) => {
    checker.checked = false
    menu()
  })
})

menu()
checker.addEventListener('change', function () {
  menu()
})

if (platform.isMobile === true) {
  document.querySelector('#connect').style.display = 'none'
}
