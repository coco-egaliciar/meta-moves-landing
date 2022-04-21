import $ from 'jquery'
import MicroModal from 'micromodal'

let x
const $cards = $('.card')
const $style = $('.hover')

$cards
  .on('mousemove touchmove', function (e) {
    // normalise touch/mouse
    let pos = [e.offsetX, e.offsetY]
    e.preventDefault()
    if (e.type === 'touchmove') {
      pos = [e.touches[0].clientX, e.touches[0].clientY]
    }
    const $card = $(this)
    // math for mouse position
    const l = pos[0]
    const t = pos[1]
    const h = $card.height()
    const w = $card.width()
    const px = Math.abs(Math.floor(100 / w * l) - 100)
    const py = Math.abs(Math.floor(100 / h * t) - 100)
    const pa = (50 - px) + (50 - py)
    // math for gradient / background positions
    const lp = (50 + (px - 50) / 1.5)
    const tp = (50 + (py - 50) / 1.5)
    const pxSpark = (50 + (px - 50) / 7)
    const pySpark = (50 + (py - 50) / 7)
    const pOpc = 20 + (Math.abs(pa) * 1.5)
    const ty = ((tp - 50) / 2) * -1
    const tx = ((lp - 50) / 1.5) * 0.5
    // css to apply for active card
    const gradPos = `background-position: ${lp}% ${tp}%;`
    const sprkPos = `background-position: ${pxSpark}% ${pySpark}%;`
    const opc = `opacity: ${pOpc / 100};`
    const tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
    // need to use a <style> tag for psuedo elements
    const style = `
      .card:hover:before { ${gradPos} }  /* gradient */
      .card:hover:after { ${sprkPos} ${opc} }   /* sparkles */
    `
    // set / apply css class and style
    $cards.removeClass('active')
    $card.removeClass('animated')
    $card.attr('style', tf)
    $style.html(style)
    if (e.type === 'touchmove') {
      return false
    }
    clearTimeout(x)
  }).on('mouseout touchend touchcancel', function () {
  // remove css, apply custom animation on end
    const $card = $(this)
    $style.html('')
    $card.removeAttr('style')
    x = setTimeout(function () {
      $card.addClass('animated')
    }, 2500)
  })


MicroModal.init();
