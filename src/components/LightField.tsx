import { Environment, GradientTexture, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// set up light panels for environment map
export function LightField() {
  const backgroundMesh =
    useRef<THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>>(null)
  const envMap = useTexture('/day.jpg')

  return (
    <>
      <Environment near={0.1} far={100} resolution={1024} frames={Infinity} background>
        <mesh ref={backgroundMesh}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial side={THREE.BackSide}>
            <GradientTexture
              stops={[0.2, 0.49, 0.61, 0.9]} // As many stops as you want
              colors={['#270628', '#500036', '#03574F', '#024729']} // Colors need to match the number of stops
              size={1024} // Size is optional, default = 1024
            />
          </meshBasicMaterial>
        </mesh>
      </Environment>
    </>
  )
}
