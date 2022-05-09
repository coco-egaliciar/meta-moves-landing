require('normalize.css/normalize.css')

// year in footer
document.querySelector('#year').innerHTML = new Date().getFullYear().toString()

// splash screen
setTimeout(() => {
  window.scrollTo(0, 0)
  document.querySelector('.se-pre-con').remove()
}, 1400)
