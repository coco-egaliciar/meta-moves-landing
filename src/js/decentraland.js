// core version + navigation, pagination modules:
import Swiper from 'swiper/bundle'

// import styles bundle
import 'swiper/css/bundle'

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  var slidesPerView = 2
} else {
  var slidesPerView = 4
}

const swiper = new Swiper('.mySwiperDecentraland', {
  slidesPerView: slidesPerView,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
})
