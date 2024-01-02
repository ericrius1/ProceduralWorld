import { useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useEffect, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'

const testMat = new THREE.MeshStandardMaterial()

export function Bird() {
  console.log('render')
  const { scene, nodes, animations } = useGLTF('/models/macaw.glb')
  const { actions, ref } = useAnimations(animations, scene)
  const camera = useThree((state) => state.camera)
  const velocity = useRef(0)
  const diffuse = useTexture('/textures/macaw/diffuse.png')

  useEffect(() => {
    if (actions['Flying']) {
      actions['Flying'].play()
    }
  }, [])

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if ((child as any).isMesh) {
        // console.log(child.material)
        child.frustumCulled = false
        // child.material.side = THREE.DoubleSide
      }
    })
  }, [])

  useFrame(() => {
    ref.current.position.z -= velocity.current
    velocity.current += 0.001
    camera.position.z -= velocity.current
    camera.lookAt(ref.current.position)
  })

  return <primitive object={scene} ref={ref} />
}
