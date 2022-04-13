
document.querySelector('.checkbox').addEventListener('change', function () {
  const menu = document.querySelector('#menu')
  if (this.checked) {
    menu.classList.add('menu__show')
    menu.classList.remove('menu__hidden')
  } else {
    menu.classList.add('menu__hidden')
    menu.classList.remove('menu__show')
    console.log('Checkbox is not checked..')
  }
})
