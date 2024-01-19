import {
  useAnimations,
  useGLTF,
  useKeyboardControls,
  useTexture,
} from '@react-three/drei'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { damp3, damp } from 'maath/easing'
import { Controls } from '../App'
import { mapLinear } from 'three/src/math/MathUtils'

const camTargetPosition = new THREE.Vector3()
const camTargetQuaternion = new THREE.Quaternion()
const euler = new THREE.Euler(0, 0, 0, 'YXZ')
let pitchAngle = 0
const minPolarAngle = (-Math.PI / 4) * 0.98
const maxPolarAngle = (Math.PI / 4) * 0.98
const rotationVector = new THREE.Vector3()
export function Bird() {
  const { scene, animations } = useGLTF('/models/macaw-transformed.glb')
  const { actions, ref } = useAnimations(animations, scene)
  const { camera, controls } = useThree()
  const camTarget = useRef<THREE.Mesh>(null)
  // Assuming controls is an instance of OrbitControls
  const orbitControls = controls as OrbitControls
  const pitchSpeed = useRef(1)
  const camFollowMaxSpeed = useRef(100)
  const [sub, get] = useKeyboardControls<Controls>()

  const velocity = useRef(15.5)
  //in m/s
  const diffuse = useTexture('/textures/macaw/diffuse.jpg')
  const testMat = useMemo(
    () => new THREE.MeshStandardMaterial({ map: diffuse, envMapIntensity: 1.1 }),
    []
  )

  useControls('bird', {
    envMapIntensity: {
      value: 1,
      min: 0,
      max: 2,
      step: 0.01,
      onChange: (value) => {
        testMat.envMapIntensity = value
      },
    },
    timeDilation: {
      value: 0.5,
      min: 0,
      max: 1.2,
      step: 0.01,
      onChange: (value) => {
        if (actions['Flying']) actions['Flying'].timeScale = value
      },
    },
  })

  useEffect(() => {
    if (actions['Flying']) {
      actions['Flying'].play()
    }
  }, [])

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = testMat
        mesh.frustumCulled = false
        mesh.material.side = THREE.DoubleSide
      }
    })
  }, [])

  useFrame(({ pointer, camera }, delta) => {
    if (!ref.current || !controls) return

    const dZ = velocity.current * delta

    ref.current.translateZ(-dZ)

    // camera.lookAt(ref.current.position)

    camTarget.current?.getWorldPosition(camTargetPosition)
    camTarget.current?.getWorldQuaternion(camTargetQuaternion)

    orbitControls.target.copy(ref.current.position)

    // console.log(ref.current.rotation.x)

    if (!get().toggleCamera) {
      damp3(camera.position, camTargetPosition, 0.1, delta, camFollowMaxSpeed.current)
    }

    pitchAngle = 0
    rotationVector.y = 0
    rotationVector.z = 0
    if (get().right) {
      rotationVector.y = -1
    }
    if (get().left) {
      rotationVector.y = 1
    }

    rotationVector.x = mapLinear(pointer.y, -1, 1, -Math.PI / 3, Math.PI / 3)

    euler.setFromQuaternion(ref.current.quaternion)
    euler.y += rotationVector.y * delta
    euler.x += rotationVector.x * delta

    if (euler.x > maxPolarAngle) {
      euler.x = maxPolarAngle
    } else if (euler.x < minPolarAngle) {
      euler.x = minPolarAngle
    }
    ref.current.quaternion.setFromEuler(euler)
  })

  return (
    <>
      <primitive object={scene} ref={ref}>
        <mesh position-z={50} ref={camTarget} visible={false}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color='hotpink' map={null} />
        </mesh>
      </primitive>
    </>
  )
}
