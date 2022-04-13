// Option 1: Import the entire three.js core library.
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Animate3D {
  constructor () {
    this.canvas = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.canvas.shadowMap.enabled = true
    this.canvas.shadowMap.type = THREE.PCFSoftShadowMap
    this.canvas.physicallyCorrectLights = true
    this.canvas.toneMapping = THREE.ACESFilmicToneMapping
    this.canvas.outputEncoding = THREE.sRGBEncoding

    const modelDiv = document.getElementById('model')
    modelDiv.appendChild(this.canvas.domElement)

    this.canvas.setSize(modelDiv.offsetWidth, modelDiv.offsetHeight)

    window.addEventListener('resize', () => { this.OnWindowResize() }, false)

    const fov = 60
    const aspect = window.innerHeight / window.innerWidth
    const near = 5
    const far = 5000.0
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this._camera.position.set(150 / 5, 150 / 5, 200 / 5)

    this.scene = new THREE.Scene()

    let light = new THREE.DirectionalLight(0xFFFFFF)
    light.position.set(20, 100, 10)
    light.target.position.set(0, 0, 0)
    light.castShadow = true
    light.shadow.bias = -0.001
    light.shadow.mapSize.width = 2048
    light.shadow.mapSize.height = 2048
    light.shadow.camera.near = 0.1
    light.shadow.camera.far = 500.0
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 500.0
    light.shadow.camera.left = 100
    light.shadow.camera.right = -100
    light.shadow.camera.top = 100
    light.shadow.camera.bottom = -100
    this.scene.add(light)

    light = new THREE.AmbientLight(0xFFFFFF)
    this.scene.add(light)

    this._controls = new OrbitControls(this._camera, this.canvas.domElement)
    this._controls.enabled = false
    this._controls.target.set(0, 10, 0)
    this._controls.update()

    this.LoadAnimatedModelAndPlay(
      'https://threejs.org/examples/models/fbx/Samba%20Dancing.fbx', new THREE.Vector3(0, 0, 0))

    this._mixers = []
    this._previousRAF = null

    this._scrollAmount = 0.0
    this.RAF()
  }

  LoadAnimatedModelAndPlay (modelFile, offset) {
    const loader = new FBXLoader()
    // loader.setPath(path)
    loader.load(modelFile, (fbx) => {
      fbx.scale.setScalar(0.2)
      fbx.traverse(c => {
        c.castShadow = true
      })
      fbx.position.copy(offset)

      const anim = new FBXLoader()
      // anim.setPath(path)
      anim.load(modelFile, (anim) => {
        const m = new THREE.AnimationMixer(fbx)
        this._mixers.push(m)
        const idle = m.clipAction(anim.animations[0])
        idle.play()
      })
      this.scene.add(fbx)
    })
  }

  OnScroll (position) {
    const amount = Math.min(0.174533)
    this.scene.rotateY(amount)
    this._controls.update()
  }

  OnWindowResize () {
    this._camera.aspect = window.innerWidth / window.innerHeight
    this._camera.updateProjectionMatrix()
    this.canvas.setSize(window.innerWidth, window.innerHeight)
  }

  Step (timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001
    if (this._mixers) {
      this._mixers.map(m => m.update(timeElapsedS))
    }
  }

  RAF () {
    requestAnimationFrame((t) => {
      if (this._previousRAF === null) {
        this._previousRAF = t
      }

      this.RAF()

      this.canvas.render(this.scene, this._camera)
      this.Step(t - this._previousRAF)
      this._previousRAF = t
    })
  }
}
