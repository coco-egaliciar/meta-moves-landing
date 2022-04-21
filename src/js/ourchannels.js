// core version + navigation, pagination modules:
import Swiper from 'swiper/bundle'

// import styles bundle
import 'swiper/css/bundle'

const swiper = new Swiper('.news', {
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
