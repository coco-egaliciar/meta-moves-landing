import $ from 'jquery'
import BrowserDetector from 'browser-dtector'

const browser = new BrowserDetector(window.navigator.userAgent)

const galleryScript = () => {
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
      const px = Math.abs(Math.floor((100 / w) * l) - 100)
      const py = Math.abs(Math.floor((100 / h) * t) - 100)
      const pa = 50 - px + (50 - py)
      // math for gradient / background positions
      const lp = 50 + (px - 50) / 1.5
      const tp = 50 + (py - 50) / 1.5
      const px_spark = 50 + (px - 50) / 7
      const py_spark = 50 + (py - 50) / 7
      const p_opc = 20 + Math.abs(pa) * 1.5
      const ty = ((tp - 50) / 2) * -1
      const tx = ((lp - 50) / 1.5) * 0.5
      // css to apply for active card
      const grad_pos = `background-position: ${lp}% ${tp}%;`
      const sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
      const opc = `opacity: ${p_opc / 100};`
      const tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
      // need to use a <style> tag for psuedo elements
      const style = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */
    `
      // set / apply css class and style
      // $cards.removeClass('active')
      // $card.removeClass('animated')

      $card.addClass('animated')
      $card.attr('style', tf)
      $style.html(style)
      if (e.type === 'touchmove') {
        return false
      }
      clearTimeout(x)
    })
    .on('mouseout touchend touchcancel', function () {
      // remove css, apply custom animation on end
      const $card = $(this)
      $style.html('')
      // $card.removeAttr('style')
      x = setTimeout(function () {
        // $card.addClass('animated')
        $cards.removeClass('active')
        $card.removeClass('animated')
      }, 2000)
    })

  /* ----------------------------------- */

  const createModalHTML = () => `
<!-- The Modal -->
 <div id="myModal" class="modal ">
    <!-- Modal content -->
    <div class="xl:container xl:p-32 mx-auto p-5 2xl:p-32 w-full lg:w-9/12 flex lg:flex-row  flex-col">

      <div class="w-full lg:w-1/2 px-5">
        <img class="" src="https://meta-moves.com/img/sceenshot/06.jpg" alt=""/>
      </div>
      <div class="w-full lg:w-1/2 flex flex-col items-center p-5">
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, rem</p>

        <button class='mt-5 bg-metapink-100 text-white font-bold px-2 py-2.5 rounded-3xl px-5'>
          Connect
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
      <span id="close" class="cursor-pointer text-center text-[#aaaaaa] text-xl font-bold hover:text-white float-right">&times;</span>
    </div>
  </div>
`

  window.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) && (e.target.nodeName === 'BODY')) {
      e.preventDefault()
      document.querySelector('.modal').remove()
      return false
    }
  }, true)

  const modalContainer = document.querySelector('#modal_container')

  modalContainer.addEventListener('click', function (e) {
    console.log(e)
    // But only alert for elements that have an alert-button class
    if (e.target.id === 'close') {
      document.querySelector('.modal').remove()
    }
  })

  const cardsContainer = document.querySelector('#cards_container')

  // Click handler for entire DIV container
  cardsContainer.addEventListener('click', function (e) {
    // But only alert for elements that have an alert-button class
    if (e.target.classList.contains('card')) {
      modalContainer.innerHTML = createModalHTML()
    }
  })
}

const platform = browser.parseUserAgent()

if (!(platform.platform.toLowerCase() === 'macintosh' && platform.isDesktop === true)) {
  galleryScript()
}
