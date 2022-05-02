import BrowserDetector from 'browser-dtector'

// eslint-disable-next-line no-unused-vars
const roadmapScript = () => {
  console.log('Roadmap')
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
  const roadmapContent = document.querySelector('#roadmap__content')
  const roadmapWrapper = document.querySelector('#roadmap__wrapper')
  window.addEventListener('wheel', function (e) {
    console.log('Content wrapper Roadmap scrolling')
    const positionWrapper = roadmapWrapper.getBoundingClientRect()
    console.log(`Roadmap T:${positionWrapper.top}, B:${positionWrapper.bottom}`)
    console.log('scrolling')
    // checking whether fully visible

    if (percentage >= 100) {
      document.body.style.overflow = 'visible'
    }

    if (positionWrapper.top <= window.innerHeight / 4 && percentage < 100) {
      roadmapWrapper.scrollIntoView(true)
      document.body.style.overflow = 'hidden'
      roadmapWrapper.scrollIntoView(true)

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

const browser = new BrowserDetector(window.navigator.userAgent)
const platform = browser.parseUserAgent()

if (platform.isMobile === false) {
  roadmapScript()
}
