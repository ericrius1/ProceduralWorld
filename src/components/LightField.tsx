import { Environment, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// set up light panels for environment map
export function LightField() {
  const gradientTexture = createCanvasTexture()
  const backgroundMesh =
    useRef<THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>>(null)
  const envMap = useTexture('/day.jpg')

  return (
    <>
      <Environment near={0.1} far={100} resolution={1024} frames={Infinity} background>
        <mesh ref={backgroundMesh}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial map={gradientTexture} side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  )
}

function createCanvasTexture() {
  // Create a canvas element
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const context = canvas.getContext('2d')

  // Draw a radial gradient
  const gradient = context?.createLinearGradient(
    canvas.width / 2,
    0,
    canvas.width / 2,
    canvas.height
  )
  gradient.addColorStop(0.1, '#B8F8FE')
  gradient.addColorStop(0.5, '#1B454E')
  gradient.addColorStop(1, '#011A1F')

  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  // Create a Three.js texture from the canvas
  return new THREE.CanvasTexture(canvas)
}
