import {
  Instances,
  Instance,
  MeshTransmissionMaterial,
  useTexture,
} from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { CanvasTexture, MathUtils, RepeatWrapping, UVMapping, Vector3 } from 'three'
import { FlakesTexture } from 'three-stdlib'

const particles = Array.from({ length: 1000 }, () => ({
  scale: MathUtils.randFloat(1, 200),
  rotation: [
    MathUtils.randFloat(0, 2 * Math.PI),
    MathUtils.randFloat(0, 2 * Math.PI),
    0,
  ] as [number, number, number],
  position: [
    MathUtils.randFloatSpread(15000),
    MathUtils.randFloatSpread(10000),
    MathUtils.randFloatSpread(20000),
  ] as [number, number, number],
}))

const flakesTexture = new FlakesTexture() as HTMLCanvasElement

export function Bubbles() {
  const ref = useRef()
  const [birdTexture, dragonTexture, dolphinTexture] = useTexture([
    '/textures/bubbles/bird.jpg',
    '/textures/bubbles/dolphin.jpg',
    '/textures/bubbles/dragon.jpg',
  ])

  return (
    <>
      <Instances
        limit={particles.length}
        castShadow
        receiveShadow
        position={[0, 2.5, 0]}
        frustumCulled={false}
      >
        <sphereGeometry args={[0.35, 15, 15]} />

        <meshBasicMaterial map={birdTexture} />
        {particles.map((data, i) => {
          return (
            <Bubble
              key={i}
              position={data.position}
              scale={data.scale}
              rotation={data.rotation}
            />
          )
        })}
      </Instances>
    </>
  )
}

function Bubble({
  position,
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale: number
}) {
  return <Instance position={position} scale={scale} rotation={rotation} />
}
