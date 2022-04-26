import { Animate3D } from './js/animation3D'

import $ from 'jquery'

const _ = require('lodash')

require('normalize.css/normalize.css')
require('./css/main.css')
require('./page.css')

// require('./menu/js/app.28787ae0')
// require('./menu/js/chunk-vendors.955db42e')
require('./js/hamburger')
require('./js/decentraland')
require('./js/ourchannels')
require('./js/gallery')
require('./js/socialcause')
require('./js/roadmap')

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'index')

  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })

  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    let _APP = null

    window.addEventListener('DOMContentLoaded', () => {
      _APP = new Animate3D()
    })

    window.addEventListener('scroll', (e) => {
      _APP.OnScroll(window.scrollY)
    })
  }
})
//
// const metamoveDescription = document.querySelector('#metamove_description')

// const typewriter = new Typewriter(metamoveDescription, {
//   loop: false,
//   delay: 75
// })

// typewriter
//   .typeString('A NFT collection where all members are')
//   .typeString('.')
//   .pauseFor(1500)
//   .typeString('.')
//   .pauseFor(1500)
//   .typeString('.')
//   .pauseFor(1500)
//   .deleteChars(41)
//   .pauseFor(1000)
//   .typeString('')
//   .pauseFor(300)
//   .typeString('')
//   .start()
//
const visuals1 = document.querySelector('#visuals__1')
visuals1.addEventListener('mouseover', () => {
  document.querySelector('#visuals__background_1').classList.add('visuals__rotation')
})

visuals1.addEventListener('mouseleave', () => {
  document.querySelector('#visuals__background_1').classList.remove('visuals__rotation')
})

const visuals2 = document.querySelector('#visuals__2')
visuals2.addEventListener('mouseover', () => {
  document.querySelector('#visuals__background_2').classList.add('visuals__rotation')
})

visuals2.addEventListener('mouseleave', () => {
  document.querySelector('#visuals__background_2').classList.remove('visuals__rotation')
})

const visuals3 = document.querySelector('#visuals__3')
visuals3.addEventListener('mouseover', () => {
  document.querySelector('#visuals__background_3').classList.add('visuals__rotation')
})

visuals3.addEventListener('mouseleave', () => {
  document.querySelector('#visuals__background_3').classList.remove('visuals__rotation')
})

/**
 * @author Alex Andrix <alex@alexandrix.com>
 * @since 2018-12-02
 */

const App = {}
App.setup = function () {
  const canvas = document.createElement('canvas')
  this.filename = 'spipa'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  this.canvas = canvas
  document.querySelector('html').appendChild(canvas)

  canvas.style.zIndex = -5000
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
  this.xC = this.width / 2
  this.yC = this.height / 2

  this.stepCount = 0
  this.particles = []
  this.lifespan = 1000
  this.popPerBirth = 10
  this.maxPop = 200
  this.birthFreq = 5

  // Build grid
  this.gridSize = 8// Motion coords
  this.gridSteps = Math.floor(1000 / this.gridSize)
  this.grid = []
  let i = 0
  for (let xx = -500; xx < 500; xx += this.gridSize) {
    for (let yy = -500; yy < 500; yy += this.gridSize) {
      // Radial field, triangular function of r with max around r0
      const r = Math.abs(xx) + Math.abs(yy)
      const // Math.sqrt(xx*xx+yy*yy),
        r0 = 100
      var field

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
    hue: -10, // + Math.floor(50*Math.random()),
    sat: 95, // 30 + Math.floor(70*Math.random()),
    lum: 20 + Math.floor(40 * Math.random()),
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
  const newArray = _.reject(this.particles, function (seed) {
    return (seed.name === particleName)
  })
  this.particles = _.cloneDeep(newArray)
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
    if (Math.random() < 0.5) {
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
        const maxFieldSpot = _.maxBy([topSpot, bottomSpot, leftSpot, rightSpot], function (e) {
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

    this.ctx.strokeStyle = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')'
    this.ctx.fillStyle = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')'

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
  const zoom = 1.6
  const xx = this.xC + x * zoom * this.dataToImageRatio
  const yy = this.yC + y * zoom * this.dataToImageRatio

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

/**
 * Some old util I use at times
 *
 * @param {Number} Xstart X value of the segment starting point
 * @param {Number} Ystart Y value of the segment starting point
 * @param {Number} Xtarget X value of the segment target point
 * @param {Number} Ytarget Y value of the segment target point
 * @param {Boolean} realOrWeb true if Real (Y towards top), false if Web (Y towards bottom)
 * @returns {Number} Angle between 0 and 2PI
 */
