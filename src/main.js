import { Animate3D } from './js/animation3D'

import video from './video/video.mp4';

import BrowserDetector from 'browser-dtector'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { cloneDeep, debounce, maxBy, reject } from 'lodash'

const browser = new BrowserDetector(window.navigator.userAgent)
const platform = browser.parseUserAgent()
console.log(platform)

require('normalize.css/normalize.css')
require('./css/main.css')
require('./page.css')

require('./menu/js/app.min')
require('./menu/js/chunk-vendors.min')
require('./menu/css/app.c26ea9af.css')

require('./js/hamburger')
require('./js/decentraland')
require('./js/gallery')
require('./js/ourchannels')

require('./js/roadmap')
require('./js/socialcause')

AOS.init()

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'index')

  if (platform.isMobile === false) {
    const _APP = new Animate3D()

    const onScroll = (isUp) => {
      _APP.animationCurrentStep(isUp)
      const ThirtytreePercent = 49.5
      for (let i = 0; i < ThirtytreePercent; i++) {
        setTimeout(() => {
          _APP.OnScroll(isUp)
        }, i * 10)
      }
    }

    const onScrollDebouncedUp = debounce(() => onScroll(true), 250, {
      leading: true,
      trailing: false
    })
    const onScrollDebouncedDown = debounce(() => onScroll(false), 250, {
      leading: true,
      trailing: false
    })

    document.body.addEventListener('keydown', (e) => {
      console.log(`keyCode -> ${e.keyCode}`)
      switch (e.keyCode) {
        case 34:
        case 40:
        case 39:
        case 32:
          onScrollDebouncedDown()
          break
        case 33:
        case 38:
        case 37:
          onScrollDebouncedUp()
          break
      }
    })

    window.addEventListener('wheel', function (event) {
      if (event.deltaY <= 0) {
        console.log('scrolling up')
        onScrollDebouncedUp()
      } else if (event.deltaY > 0) {
        console.log('scrolling down')
        onScrollDebouncedDown()
      }
    })
  }
})



/**
 * @author Alex Andrix <alex@alexandrix.com>
 * @since 2018-12-02
 */
// TODO probar https://codepen.io/iamtheWraith/pen/QjawpE
const App = {}
App.setup = function () {
  const canvas = document.createElement('canvas')
  this.filename = 'spipa'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  this.canvas = canvas
  document.querySelector('html').appendChild(canvas)

  canvas.style.zIndex = -400000
  canvas.style.position = 'fixed'
  canvas.style.top = 0
  canvas.style.right = 0

  this.ctx = this.canvas.getContext('2d')
  this.width = this.canvas.width
  this.height = this.canvas.height
  this.dataToImageRatio = 1
  this.ctx.imageSmoothingEnabled = false
  this.ctx.webkitImageSmoothingEnabled = false
  this.ctx.msImageSmoothingEnabled = false
  this.widthHalf = this.width / 2
  this.heightHalf = this.height / 2

  this.stepCount = 0
  this.particles = []
  this.lifespan = 100
  this.popPerBirth = 10
  this.maxPop = 200
  this.birthFreq = 1

  // Build grid
  this.gridSize = 8// Motion coords
  this.gridSteps = Math.floor(1000 / this.gridSize)
  this.grid = []
  let i = 0
  for (let xx = -500; xx < 500; xx += this.gridSize) {
    for (let yy = -500; yy < 500; yy += this.gridSize) {
      // Radial field, triangular function of r with max around r0
      const r = Math.abs(xx) + Math.abs(yy)
      const r0 = 10
      let field

      if (r < r0) field = 255 / r0 * r
      else if (r > r0) field = 255 - Math.min(255, (r - r0) / 2)

      this.grid.push({
        x: xx,
        y: yy,
        busyAge: 0,
        spotIndex: i,
        isEdge: (xx === -500
            ? 'left'
            : (xx === (-500 + this.gridSize * (this.gridSteps - 1))
                ? 'right'
                : (yy === -500
                    ? 'top'
                    : (yy === (-500 + this.gridSize * (this.gridSteps - 1))
                        ? 'bottom'
                        : false
                    )
                )
            )
        ),
        field: field
      })
      i++
    }
  }
  this.gridMaxIndex = i

  // Counters for UI
  this.drawnInLastFrame = 0
  this.deathCount = 0

  this.initDraw()
}
App.evolve = function () {
  const time1 = performance.now()

  this.stepCount++

  // Increment all grid ages
  this.grid.forEach(function (e) {
    if (e.busyAge > 0) e.busyAge++
  })

  if (this.stepCount % this.birthFreq === 0 && (this.particles.length + this.popPerBirth) < this.maxPop) {
    this.birth()
  }
  App.move()
  App.draw()

  const time2 = performance.now()

  // Update UI
}
App.birth = function () {
  var x, y
  const gridSpotIndex = Math.floor(Math.random() * this.gridMaxIndex)
  const gridSpot = this.grid[gridSpotIndex]
  var x = gridSpot.x
  var y = gridSpot.y

  const particle = {
    hue: 180, // + Math.floor(50*Math.random()),
    sat: 82, // 30 + Math.floor(70*Math.random()),
    lum: 2 + Math.floor(54 * Math.random()),
    x: x,
    y: y,
    xLast: x,
    yLast: y,
    xSpeed: 0,
    ySpeed: 0,
    age: 0,
    ageSinceStuck: 0,
    attractor: {
      oldIndex: gridSpotIndex,
      gridSpotIndex: gridSpotIndex// Pop at random position on grid
    },
    name: 'seed-' + Math.ceil(10000000 * Math.random())
  }
  this.particles.push(particle)
}
App.kill = function (particleName) {
  const newArray = reject(this.particles, function (seed) {
    return (seed.name === particleName)
  })
  this.particles = cloneDeep(newArray)
}
App.move = function () {
  for (let i = 0; i < this.particles.length; i++) {
    // Get particle
    const p = this.particles[i]

    // Save last position
    p.xLast = p.x
    p.yLast = p.y

    // Attractor and corresponding grid spot
    const index = p.attractor.gridSpotIndex
    let gridSpot = this.grid[index]

    // Maybe move attractor and with certain constraints
    if (Math.random() < 0.65) {
      // Move attractor
      if (!gridSpot.isEdge) {
        // Change particle's attractor grid spot and local move function's grid spot
        const topIndex = index - 1
        const bottomIndex = index + 1
        const leftIndex = index - this.gridSteps
        const rightIndex = index + this.gridSteps
        const topSpot = this.grid[topIndex]
        const bottomSpot = this.grid[bottomIndex]
        const leftSpot = this.grid[leftIndex]
        const rightSpot = this.grid[rightIndex]

        // Choose neighbour with highest field value (with some desobedience...)
        const chaos = 30
        const maxFieldSpot = maxBy([topSpot, bottomSpot, leftSpot, rightSpot], function (e) {
          return e.field + chaos * Math.random()
        })

        const potentialNewGridSpot = maxFieldSpot
        if (potentialNewGridSpot.busyAge === 0 || potentialNewGridSpot.busyAge > 15) { // Allow wall fading
          // if (potentialNewGridSpot.busyAge  === 0) {// Spots busy forever
          // Ok it's free let's go there
          p.ageSinceStuck = 0// Not stuck anymore yay
          p.attractor.oldIndex = index
          p.attractor.gridSpotIndex = potentialNewGridSpot.spotIndex
          gridSpot = potentialNewGridSpot
          gridSpot.busyAge = 1
        } else p.ageSinceStuck++
      } else p.ageSinceStuck++

      if (p.ageSinceStuck === 10) this.kill(p.name)
    }

    // Spring attractor to center with viscosity
    const k = 8
    const visc = 0.4
    const dx = p.x - gridSpot.x
    const dy = p.y - gridSpot.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    // Spring
    const xAcc = -k * dx
    const yAcc = -k * dy

    p.xSpeed += xAcc
    p.ySpeed += yAcc

    // Calm the f*ck down
    p.xSpeed *= visc
    p.ySpeed *= visc

    // Store stuff in particle brain
    p.speed = Math.sqrt(p.xSpeed * p.xSpeed + p.ySpeed * p.ySpeed)
    p.dist = dist

    // Update position
    p.x += 0.1 * p.xSpeed
    p.y += 0.1 * p.ySpeed

    // Get older
    p.age++

    // Kill if too old
    if (p.age > this.lifespan) {
      this.kill(p.name)
      this.deathCount++
    }
  }
}
App.initDraw = function () {
  this.ctx.beginPath()
  this.ctx.rect(0, 0, this.width, this.height)
  this.ctx.fillStyle = 'black'
  this.ctx.fill()
  this.ctx.closePath()
}
App.draw = function () {
  this.drawnInLastFrame = 0
  if (!this.particles.length) return false

  this.ctx.beginPath()
  this.ctx.rect(0, 0, this.width, this.height)
  this.ctx.fillStyle = 'rgba(0, 0, 0, 0.07)'
  // this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  this.ctx.fill()
  this.ctx.closePath()

  for (let i = 0; i < this.particles.length; i++) {
    // Draw particle
    const p = this.particles[i]

    var h, s, l, a

    h = p.hue + this.stepCount / 30
    if (h > 300) {
      h = 300
    }
    s = p.sat
    l = p.lum
    a = 1

    const last = this.dataXYtoCanvasXY(p.xLast, p.yLast)
    const now = this.dataXYtoCanvasXY(p.x, p.y)
    const attracSpot = this.grid[p.attractor.gridSpotIndex]
    const attracXY = this.dataXYtoCanvasXY(attracSpot.x, attracSpot.y)
    const oldAttracSpot = this.grid[p.attractor.oldIndex]
    const oldAttracXY = this.dataXYtoCanvasXY(oldAttracSpot.x, oldAttracSpot.y)

    this.ctx.beginPath()

    this.ctx.strokeStyle = `hsla( ${h},${s}%,${l}%,${a})`

    this.ctx.fillStyle = `hsla( ${h},${s}%,${l}%,${a})`

    // Particle trail
    this.ctx.moveTo(last.x, last.y)
    this.ctx.lineTo(now.x, now.y)

    this.ctx.lineWidth = 1.5 * this.dataToImageRatio
    this.ctx.stroke()
    this.ctx.closePath()

    // Attractor positions
    this.ctx.beginPath()
    this.ctx.lineWidth = 1.5 * this.dataToImageRatio
    this.ctx.moveTo(oldAttracXY.x, oldAttracXY.y)
    this.ctx.lineTo(attracXY.x, attracXY.y)
    this.ctx.arc(attracXY.x, attracXY.y, 1.5 * this.dataToImageRatio, 0, 2 * Math.PI, false)

    // a /= 20;
    this.ctx.strokeStyle = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')'
    this.ctx.fillStyle = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')'
    // this.ctx.stroke();
    this.ctx.fill()

    this.ctx.closePath()

    // UI counter
    this.drawnInLastFrame++
  }
}
App.dataXYtoCanvasXY = function (x, y) {
  const zoom = 2
  const xx = this.widthHalf + x * zoom * this.dataToImageRatio
  const yy = this.heightHalf + y * zoom * this.dataToImageRatio

  return { x: xx, y: yy }
}

document.addEventListener('DOMContentLoaded', function () {
  App.setup()
  App.draw()

  var frame = function () {
    App.evolve()
    requestAnimationFrame(frame)
  }
  frame()
})

setTimeout(() => {
  window.scrollTo(0, 0)
  document.querySelector('.se-pre-con').remove()
}, 1400)
