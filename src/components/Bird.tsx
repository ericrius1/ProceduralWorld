import { useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useEffect, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { OrbitControls } from '@react-three/drei'

const testMat = new THREE.MeshStandardMaterial()

export function Bird() {
  console.log('render')
  const { scene, nodes, animations } = useGLTF('/models/macaw.glb')
  const { actions, ref } = useAnimations(animations, scene)
  const { camera, controls } = useThree()
  // const orbitControls = controls as  OrbitControls;

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
        child.material = testMat
        child.frustumCulled = false
        child.material.side = THREE.DoubleSide
      }
    })
  }, [])

  useFrame((state, delta) => {
    if (!ref.current || !controls) return
    ref.current.position.z -= velocity.current
    camera.position.z -= velocity.current

    velocity.current += 0.1 * delta
    // camera.lookAt(ref.current.position)
    controls.target.copy(ref.current.position)
  })

  return <primitive object={scene} ref={ref} />
}
