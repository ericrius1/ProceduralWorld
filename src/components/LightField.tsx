import { Environment, useTexture } from '@react-three/drei'
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
      <Environment near={0.1} far={100} resolution={256} frames={Infinity}>
        <mesh ref={backgroundMesh}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial map={envMap} side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  )
}
