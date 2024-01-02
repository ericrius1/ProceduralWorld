import { Instances, Instance } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { MathUtils, Vector3 } from 'three'

const particles = Array.from({ length: 10000 }, () => ({
  position: [
    MathUtils.randFloatSpread(1000),
    MathUtils.randFloatSpread(1000),
    MathUtils.randFloatSpread(10000),
  ] as [number, number, number],
}))

export function Bubbles() {
  const ref = useRef()

  return (
    <Instances limit={particles.length} castShadow receiveShadow position={[0, 2.5, 0]}>
      <sphereGeometry args={[0.45, 15, 15]} />
      <meshStandardMaterial roughness={1} color='#f0f0f0' />
      {particles.map((data, i) => (
        <Bubble key={i} position={data.position} />
      ))}
    </Instances>
  )
}

function Bubble({ position }: { position: [number, number, number] }) {
  return <Instance position={position} />
}
