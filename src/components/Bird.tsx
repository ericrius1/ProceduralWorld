import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export function Bird() {
  const { scene, animations } = useGLTF('/models/macaw.glb')
  const { actions, ref } = useAnimations(animations, scene)

  useEffect(() => {
    actions['Flying'].play()
  }, [])

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if ((child as any).isMesh) {
        child.material.depthWrite = false
        child.material.side = THREE.DoubleSide
      }
    })
  }, [])

  return <primitive object={scene} ref={ref} />
}
