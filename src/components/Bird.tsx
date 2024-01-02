import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'

const testMat = new THREE.MeshStandardMaterial()

export function Bird() {
  const { scene, animations } = useGLTF('/models/macaw.glb')
  const { actions, ref } = useAnimations(animations, scene)

  useEffect(() => {
    if (actions['Flying']) {
      actions['Flying'].play()
    }
  }, [])

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if ((child as any).isMesh) {
        console.log(child.material)
        child.frustumCulled = false
        // child.material = testMat
        // child.material.depthWrite = false
        // child.material.transparent = true
        // debugger
        child.material.side = THREE.DoubleSide
        // child.material = new THREE.MeshStandardMaterial({ ...child.material })
      }
    })
  }, [])

  return <primitive object={scene} ref={ref} />
}
