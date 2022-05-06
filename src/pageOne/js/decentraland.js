// core version + navigation, pagination modules:
import Swiper from 'swiper/bundle'

import BrowserDetector from 'browser-dtector'
import 'swiper/css/bundle'

const browser = new BrowserDetector(window.navigator.userAgent)
const platform = browser.parseUserAgent()

let slidesPerView = 3
if (platform.isMobile === true) {
  slidesPerView = 1
}

const swiper = new Swiper('.mySwiperDecentraland', {
  slidesPerView: slidesPerView,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
})
