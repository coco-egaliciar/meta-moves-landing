const menuLinks = document.querySelectorAll('.menu-item a')
const checker = document.querySelector('.checkbox')

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
