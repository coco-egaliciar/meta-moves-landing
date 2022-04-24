// Option 1: Import the entire three.js core library.
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import fbxFile from '../resource/ParaWeb.fbx'

export class Animate3D {
  constructor () {
    const scene = new THREE.Scene()
    // scene.add(new THREE.AxesHelper(50))

    const light = new THREE.PointLight()
    light.position.set(0.8, 1.4, 1.0)
    scene.add(light)

    const ambientLight = new THREE.AmbientLight()
    scene.add(ambientLight)

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0.8, 1.4, 1.0)

    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    const model = document.querySelector('#model')
    model.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, model)
    // controls.enableDamping = true
    controls.target.set(0, 1, 0)
    controls.enabled = false

    const fbxLoader = new FBXLoader()
    fbxLoader.load(
      fbxFile,
      (object) => {
        object.traverse(function (child) {

        })
        object.scale.set(0.01 * 1.1, 0.01 * 1.1, 0.01 * 1.1)

        scene.add(object)
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
      renderer.render(scene, camera)
    }

    this.scene = scene
    animate()
  }

  OnScroll (position) {
    this.scene.rotateY(Math.PI / 30)
  }
}
