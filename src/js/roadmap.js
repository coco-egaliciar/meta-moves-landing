const roadmapScript = () => {
  const percentageToAdd = 1.5
  const q1Percentage = 33.33
  const q2Percentage = 66.66
  const q3Percentage = 99.99

  let percentage = 1

  const q1 = document.querySelector('#q1')
  const q2 = document.querySelector('#q2')
  const q3 = document.querySelector('#q3')

  const progressBarProgress = document.querySelector('.progress_bar__progress')
  const moonwalk = document.querySelector('#moonwalk')
  const progressBarWidthPX = document.querySelector('.progress_bar').offsetWidth * 0.95

  window.addEventListener('wheel', function (e) {
    const element = document.querySelector('#roadmap')
    const position = element.getBoundingClientRect()
    console.log('scrolling')
    // checking whether fully visible
    if (position.top <= 180 && percentage <= 100) {
      e.preventDefault()
      element.scrollIntoView(true)

      percentage += percentageToAdd
      progressBarProgress.style.width = `${percentage}%`

      const pixelsToMove = ((percentage * progressBarWidthPX) / 100) - 60
      moonwalk.style.transform = `translateX(${pixelsToMove}px)`

      const q1Opacity = parseInt(percentage) / parseInt(q1Percentage)
      q1.style.opacity = q1Opacity
      if (q1Opacity > 1) {
        q1.classList.add('gradient-border')
      }

      const q2Opacity = parseInt(percentage) / parseInt(q2Percentage)
      q2.style.opacity = q2Opacity
      if (q2Opacity > 1) {
        q2.classList.add('gradient-border')
      }

      const q3Opacity = parseInt(percentage) / parseInt(q3Percentage)
      q3.style.opacity = q3Opacity
      if (q3Opacity > 1) {
        q3.classList.add('gradient-border')
      }
    }
  })
}
if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  // roadmapScript()
}
