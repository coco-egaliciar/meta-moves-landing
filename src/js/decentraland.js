// core version + navigation, pagination modules:
import Swiper from 'swiper/bundle'

// import styles bundle
import 'swiper/css/bundle'

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  var slidesPerView = 1
} else {
  var slidesPerView = 3
}

const swiper = new Swiper('.mySwiperDecentraland', {
  slidesPerView: slidesPerView,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
})
