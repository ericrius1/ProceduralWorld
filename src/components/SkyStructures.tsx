import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import { Instances, Instance } from '@react-three/drei'

export function SkyStructures() {
  const { gl } = useThree()
  const boxes = useMemo(() => {
    const temp = []
    for (let i = 0; i < 30000; i++) {
      const size = Math.random() * 10
      const color = new THREE.Color(Math.random() * 0xffffff)
      const rotation = Math.random() * Math.PI
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 10000,
        (Math.random() - 0.5) * 10000,
        (Math.random() - 0.5) * 100000
      )
      const scaleY = Math.random() * (100 - 10) + 10 // Random scale on the y component between 10 and 100 meters
      temp.push({ size, color, rotation, position, scaleY })
    }
    return temp
  }, [])

  useFrame(() => {
    boxes.forEach((box, i) => {
      box.rotation += 0.03
    })
  })

  return (
    <Instances args={[null, null, boxes.length]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial />
      {particles.map((data, i) => (
        <Instance />
      ))}
    </Instances>
  )
}
