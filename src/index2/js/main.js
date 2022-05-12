import BrowserDetector from 'browser-dtector'
import Parallax from 'parallax-js'

require('normalize.css/normalize.css')

const browser = new BrowserDetector(window.navigator.userAgent)
const platform = browser.parseUserAgent()

require('../css/main.css')

const scene = document.getElementById('scene')

const video = document.querySelector('.video')

video.addEventListener('click', (event) => {
  video.play()
})

video.addEventListener('play', (event) => {
  video.controls = true
})

video.addEventListener('ended', function () {
  video.controls = false
  video.load()
})

let parallax = {
  limitX: 55,
  limitY: 100,
  hoverOnly: false
}

if (platform.isMobile === true) {
  parallax = {
    limitX: 0,
    limitY: 0,
    hoverOnly: false
  }
}
const parallaxInstance = new Parallax(scene, parallax)

