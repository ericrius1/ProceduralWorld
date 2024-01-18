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
import { damp3, dampQ } from 'maath/easing'
import { Controls } from '../App'
import { mapLinear } from 'three/src/math/MathUtils'

const camTargetPosition = new THREE.Vector3()
const camTargetQuaternion = new THREE.Quaternion()
const upVector = new THREE.Vector3(0, 1, 0)
const rightVector = new THREE.Vector3(1, 0, 0)
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

    ref.current.rotateX(pointer.y * delta * pitchSpeed.current)

    if (Math.abs(ref.current.rotation.x) > 0.7) camFollowMaxSpeed.current = 10
    else camFollowMaxSpeed.current = 100
    if (!get().toggleCamera && Math.abs(ref.current.rotation.x) < 0.7) {
      damp3(camera.position, camTargetPosition, 0.1, delta, camFollowMaxSpeed.current)
    }

    if (get().right) {
      ref.current.rotateOnWorldAxis(upVector, -delta)
    }
    if (get().left) {
      ref.current.rotateOnWorldAxis(upVector, delta)
    }
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
