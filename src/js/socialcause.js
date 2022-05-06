// core version + navigation, pagination modules:
import Swiper from 'swiper/bundle'

import BrowserDetector from 'browser-dtector'
import 'swiper/css/bundle'

const browser = new BrowserDetector(window.navigator.userAgent)
const platform = browser.parseUserAgent()

let slidesPerView = 5
if (platform.isMobile === true) {
  slidesPerView = 1
}

const swiper = new Swiper('.mySwiperSocialCause', {
  slidesPerView: slidesPerView,
  spaceBetween: 40,
  lazy: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})
