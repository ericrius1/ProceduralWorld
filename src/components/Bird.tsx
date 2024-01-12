import { useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function Bird() {
  console.log('render')
  const { scene, animations } = useGLTF('/models/macaw-transformed.glb')
  const { actions, ref } = useAnimations(animations, scene)
  const { camera, controls } = useThree()
  // Assuming controls is an instance of OrbitControls
  const orbitControls = controls as OrbitControls

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

  useFrame(({ pointer }, delta) => {
    if (!ref.current || !controls) return

    const dZ = velocity.current * delta

    const pointer3D = new THREE.Vector3(pointer.x * 1, pointer.y * 1, -1)

    ref.current.translateZ(-dZ)
    camera.position.z -= dZ

    // camera.lookAt(ref.current.position)

    orbitControls.target.copy(ref.current.position)

    // ref.current.rotateX(pointer.y / 100)
  })

  return (
    <>
      <primitive object={scene} ref={ref} />
    </>
  )
}
