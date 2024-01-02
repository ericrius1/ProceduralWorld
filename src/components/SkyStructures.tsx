import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export function SkyStructures() {
  const boxes = []
  for (let i = 0; i < 100; i++) {
    const size = Math.random() * 10
    const color = new THREE.Color(Math.random() * 0xffffff)
    const rotation = Math.random() * Math.PI
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * 1000,
      (Math.random() - 0.5) * 1000,
      (Math.random() - 0.5) * 10000
    )
    const scaleY = Math.random() * (100 - 10) + 10 // Random scale on the y component between 10 and 100 meters
    boxes.push({ size, color, rotation, position, scaleY })
  }

  useFrame(() => {
    boxes.forEach((box, i) => {
      box.rotation += 0.03
    })
  })

  return (
    <>
      {boxes.map((box, i) => (
        <mesh
          key={i}
          position={box.position}
          rotation={[0, box.rotation, 0]}
          scale={[1, box.scaleY, 1]}
        >
          <boxGeometry args={[box.size, box.size, box.size]} />
          <meshStandardMaterial color={box.color} />
        </mesh>
      ))}
    </>
  )
}
