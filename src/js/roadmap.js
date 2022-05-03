import BrowserDetector from 'browser-dtector'

// eslint-disable-next-line no-unused-vars
const roadmapScript = () => {
  console.log('Roadmap')
  const percentageToAdd = 1.5
  const q1Percentage = 12
  const q2Percentage = 33
  const q3Percentage = 66

  let q1Opacity = 0
  let q2Opacity = 0
  let q3Opacity = 0

  let percentage = 1

  const q1 = document.querySelector('#q1')
  const q2 = document.querySelector('#q2')
  const q3 = document.querySelector('#q3')

  const progressBarProgress = document.querySelector('.progress_bar__progress')

  const progressBarWidthPX = document.querySelector('.progress_bar').offsetWidth * 0.95
  const roadmapContent = document.querySelector('#roadmap__content')
  const roadmapWrapper = document.querySelector('#roadmap__wrapper')

  window.addEventListener('wheel', function (e) {
    console.log('Content wrapper Roadmap scrolling')
    const positionWrapper = roadmapWrapper.getBoundingClientRect()
    console.log(`Roadmap T:${positionWrapper.top}, B:${positionWrapper.bottom}`)
    console.log('scrolling')
    // checking whether fully visible

    if (percentage >= 99) {
      document.body.style.overflow = 'visible'
    }

    if (positionWrapper.top <= window.innerHeight / 4 && percentage < 99) {
      roadmapWrapper.scrollIntoView(true)
      document.body.style.overflow = 'hidden'
      roadmapWrapper.scrollIntoView(true)

      percentage += percentageToAdd
      progressBarProgress.style.width = `${percentage}%`

      // const pixelsToMove = ((percentage * progressBarWidthPX) / 100) - 60

      q1Opacity = parseInt(percentage) / parseInt(33)
      q1.style.opacity = q1Opacity
      console.log(`q1 opacity ${q1Opacity}, p:${percentage},q1p ${q1Percentage}`)

      if (q1Opacity > 1) {
        q1.classList.add('gradient-border')
      }

      q2Opacity = parseInt(percentage - q2Percentage) / parseInt(33)
      q2.style.opacity = q2Opacity
      console.log(`q2 opacity ${q2Opacity}, p:${percentage},q2p ${q2Percentage}`)

      if (q2Opacity > 1) {
        q2.classList.add('gradient-border')
      }

      q3Opacity = parseInt(percentage - q3Percentage) / parseInt(33)
      q3.style.opacity = q3Opacity
      console.log(`q3 opacity ${q3Opacity}, p:${percentage},q2p ${q3Percentage}`)

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
