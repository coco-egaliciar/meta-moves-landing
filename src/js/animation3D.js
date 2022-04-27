// Option 1: Import the entire three.js core library.
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import File3D from '../resource/scene.glb'
import HDRTexture from '../resource/venice_dawn_1_1k.hdr'

import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

export class Animate3D {
  constructor () {
    const params = {
      exposure: 12
    }

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.5, 2000)
    camera.position.set(0, 1.3, 0.85)

    // scene.background = new THREE.Color(0x000000)
    // scene.add(new THREE.AxesHelper(50))

    // const lightA = new THREE.AmbientLight(0xffffff)
    // lightA.intensity = 120000
    // scene.add(lightA)

    // const light2 = new THREE.PointLight(0xffffff, 1, 1000)
    // light2.position.set(0, 0.5, 0.4)
    // scene.add(light2)

    // const light = new THREE.DirectionalLight(0xffffff, 80000)
    // light.position.set(0, 0.5, 0.2)
    // scene.add(light)

    // const bulbLight1 = new THREE.PointLight(0xffffff, 1, 100, 2)
    // bulbLight1.power = 110000
    // bulbLight1.position.set(0, 0.8, 4)
    // bulbLight1.castShadow = true
    // scene.add(bulbLight1)
    //
    // const bulbLight1A = bulbLight1.clone()
    // bulbLight1A.position.set(0, 0.2, 3)
    // scene.add(bulbLight1A)
    //
    // const bulbLight1B = bulbLight1.clone()
    // bulbLight1B.position.set(0, 0.4, 3)
    // scene.add(bulbLight1B)
    //
    // const bulbLight1C = bulbLight1.clone()
    // bulbLight1C.position.set(0, 2, 0)
    // scene.add(bulbLight1C)
    //
    // const bulbLight2 = new THREE.PointLight(0xffffff, 1, 100, 2)
    // bulbLight2.power = 110000
    // bulbLight2.position.set(4, 0.8, 0)
    // bulbLight2.castShadow = true
    // scene.add(bulbLight2)
    //
    // const bulbLight3 = new THREE.PointLight(0xffffff, 1, 100, 2)
    // bulbLight3.power = 110000
    // bulbLight3.position.set(-4, 0.8, 0)
    // bulbLight3.castShadow = true
    // scene.add(bulbLight3)

    new RGBELoader()
      .load(HDRTexture, function (texture, textureData) {
        // console.log( textureData );
        // console.log( texture );

        texture.mapping = THREE.EquirectangularReflectionMapping
        const envMap = texture // pmremGenerator.fromEquirectangular(texture).texture;

        // scene.background = envMap
        scene.environment = envMap
        scene.environment.
        // const material = new THREE.MeshBasicMaterial({ map: texture })

        // const quad = new THREE.PlaneGeometry(5.5 * textureData.width / textureData.height, 5.5)

        // const mesh = new THREE.Mesh(quad, material)

        // scene.add(mesh)

        render()
      })

    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.toneMappingExposure = params.exposure
    renderer.physicallyCorrectLights = true
    // renderer.shadowMap.enabled = true
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    const model = document.querySelector('#model')
    model.appendChild(renderer.domElement)

    const gui = new GUI()
    gui.add(params, 'exposure', 0, 20, 0.01).onChange(render)
    gui.open()

    const controls = new OrbitControls(camera, model)
    // controls.enableDamping = true
    controls.target.set(0, 1, 0)
    controls.enabled = true

    const File3DLoader = new GLTFLoader()
    File3DLoader.load(
      File3D,
      (object) => {
        // object.scene.scale.set(2, 2, 2)
        object.scene.position.y = -0.35
        // object.scene.posi
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

    function render () {
      renderer.toneMappingExposure = params.exposure
      renderer.render(scene, camera)
    }

    this.scene = scene
    animate()
  }

  OnScroll (position) {
    // this.scene.rotateY(Math.PI / 30)
  }
}
