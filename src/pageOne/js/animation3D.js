// Option 1: Import the entire three.js core library.
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import File3D from '../../resource/scene.glb'
import HDRTexture from '../../resource/venice_dawn_1_1k.hdr'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import { range } from 'lodash'

export class Animate3D {
  constructor () {
    this.currentStep = 0

    this.currentPercentage = 0
    this.maxPercentage = 100
    this.heightPercentage = range(-0.4 * 10, 0.7 * 10, (Math.abs(-0.4 * 10 - 0.7 * 10)) / this.maxPercentage)
    this.anglePercentage = range(-35, 50, (Math.abs(-35 - 50)) / this.maxPercentage)

    document.body.style.overflow = 'hidden'

    console.log(this.heightPercentage)
    console.log(this.anglePercentage)

    const params = {
      exposure: 12,
      lightRange: 0,
      robotAngleDeg: 0,
      x: 0,
      y: 1.2,
      z: 0.85,
      zoom: 0.9
    }

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.5, 5)

    camera.position.set(params.x, params.y, params.z)

    // const helper = new THREE.CameraHelper(camera)
    // scene.add(helper)

    // scene.background = new THREE.Color(0x000000)
    // scene.add(new THREE.AxesHelper(50))

    const bulbLight3 = new THREE.PointLight(0x00FFF7, 1, 100, 2)
    bulbLight3.power = 11

    const initialLightDeep = 2
    bulbLight3.position.set(params.lightRange, 0.8, initialLightDeep)

    scene.add(bulbLight3)

    new RGBELoader()
      .load(HDRTexture, function (texture, textureData) {
        // console.log( textureData );
        // console.log( texture );

        texture.mapping = THREE.EquirectangularReflectionMapping
        const envMap = texture

        // scene.background = envMap
        scene.environment = envMap
        render()
      })

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.toneMappingExposure = params.exposure
    renderer.physicallyCorrectLights = true
    renderer.shadowMap.enabled = true
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    const model = document.querySelector('#model')
    model.appendChild(renderer.domElement)

    moveCamera()

    const gui = new GUI()
    gui.add(params, 'exposure', 0, 20, 0.01).onChange(render)
    gui.add(params, 'lightRange', -2, 2, 0.01).onChange(render)
    gui.add(params, 'robotAngleDeg', -5, 5, 5).onChange(rotateRobotGUI)

    gui.add(params, 'x', -2, 2, 0.05).onChange(moveCamera)
    gui.add(params, 'y', -2, 2, 0.05).onChange(moveCamera)
    gui.add(params, 'z', -2, 2, 0.05).onChange(moveCamera)
    gui.add(params, 'zoom', -5, 10, 0.1).onChange(moveCamera)
    gui.hide()
    // gui.open()

    const controls = new OrbitControls(camera, model)
    // controls.enableDamping = true
    controls.target.set(0, 1, 0)
    controls.enabled = false

    const File3DLoader = new GLTFLoader()
    File3DLoader.load(
      File3D,
      (object) => {
        // object.scene.scale.set(0.85)
        object.scene.position.y = -0.4
        object.scene.rotateY(THREE.Math.degToRad(-35))
        window.o = object.scene
        scene.add(object.scene)
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.log(error)
      }
    )

    window.addEventListener('resize', onWindowResize, false)

    function onWindowResize () {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      render()
    }

    function animate () {
      requestAnimationFrame(animate)
      controls.update()
      render()
    }

    function moveCamera () {
      camera.position.set(params.x, params.y, params.z)
      camera.lookAt(0, 1.2, 0)
      camera.zoom = params.zoom
      camera.updateProjectionMatrix()
      render()
    }

    function rotateRobotGUI () {
      scene.rotateY(params.robotAngleDeg * Math.PI / 180)
    }

    function render () {
      renderer.toneMappingExposure = params.exposure

      const cincunferenceRadaio = 2
      const positionDeep = Math.sqrt(Math.pow(cincunferenceRadaio, 2) - Math.pow(params.lightRange, 2))
      bulbLight3.position.set(params.lightRange, 0.8, positionDeep)

      renderer.render(scene, camera)
    }

    this.scene = scene
    animate()
  }

  rotateRobot (degresPosition) {
    if (window.o) {
      window.o.rotation.y = THREE.Math.degToRad(degresPosition)
    }
  }

  animationCurrentStep (isUp) {
    if (isUp === false && this.currentStep <= 4) {
      this.currentStep += 1
    }

    console.log(`this.currentStep->${this.currentStep}`)
    if (this.currentStep === 1) {
      document.querySelector('#scroll').style.display = 'none'
      document.querySelector('#a1').classList.add('fade-in-left')
    }

    if (this.currentStep === 4) {
      document.body.style.overflow = 'visible'
      // document.querySelector('#decentraland').scrollIntoView()
    }
  }

  moveRobotPosition (yPosition) {
    if (window.o) {
      window.o.position.set(0, yPosition, 0)
    }
  }

  nextStep () {
    if (this.currentPercentage >= 0 && this.currentPercentage < 99) {
      this.currentPercentage += 1
    }
    console.log(`Next ->this.currentPercentage:${this.currentPercentage}`)
  }

  backStep () {
    if (this.currentPercentage > 0 && this.currentPercentage <= 99) {
      this.currentPercentage -= 1
    }
    console.log(`Back ->this.currentPercentage:${this.currentPercentage}`)
  }

  getHeigh () {
    return this.heightPercentage[this.currentPercentage] / 10
  }

  getAngle () {
    return this.anglePercentage[this.currentPercentage]
  }

  OnScroll (isUp) {
    if (this.currentStep >= 4) {
      return false
    }
    if (isUp === true) {
      this.backStep()
      this.moveRobotPosition(this.getHeigh())
      this.rotateRobot(this.getAngle())
    }
    if (isUp === false) {
      this.nextStep()
      this.moveRobotPosition(this.getHeigh())
      this.rotateRobot(this.getAngle())
    }
  }
}
