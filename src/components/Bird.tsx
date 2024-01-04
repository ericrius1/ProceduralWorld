import { useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { OrbitControls } from '@react-three/drei'

export function Bird() {
  console.log('render')
  const { scene, nodes, animations } = useGLTF('/models/macaw-transformed.glb')
  const { actions, ref } = useAnimations(animations, scene)
  const { camera, controls, pointer } = useThree()
  // const orbitControls = controls as  OrbitControls;

  const velocity = useRef(15.5)
  //in m/s
  const diffuse = useTexture('/textures/macaw/diffuse.png')
  const testMat = useMemo(
    () => new THREE.MeshStandardMaterial({ map: diffuse, envMapIntensity: 1.1 }),
    []
  )

  console.log('rerender')

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
      value: 1,
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
      if ((child as any).isMesh) {
        child.material = testMat
        child.frustumCulled = false
        child.material.side = THREE.DoubleSide
      }
    })
  }, [])

  useFrame((state, delta) => {
    console.log(pointer.y)
    if (!ref.current || !controls) return

    const dZ = velocity.current * delta

    ref.current.position.z -= dZ
    camera.position.z -= dZ

    // camera.lookAt(ref.current.position)
    controls.target.copy(ref.current.position)
  })

  return <primitive object={scene} ref={ref} />
}
