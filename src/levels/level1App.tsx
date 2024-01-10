import { useState } from 'react'
import { Layers } from 'three'
import { Canvas } from '@react-three/fiber'
import {
  Sky,
  Environment,
  PerspectiveCamera,
  OrbitControls,
  Stats,
} from '@react-three/drei'

import type { DirectionalLight } from 'three'

import { LightField } from '../components/LightField'
import { Bird } from '../components/Bird'
import { Perf } from 'r3f-perf'

export function Level1App(): JSX.Element {
  const [light, setLight] = useState<DirectionalLight | null>(null)

  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 5, 50], fov: 50, far: 70000 }}>
        <fog attach='fog' color='#800080' near={5000} far={120000} />

        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color='red' />
        </mesh>

        <LightField />
        <OrbitControls makeDefault />
        {/* <Bird /> */}
        <Perf openByDefault trackGPU={true} position={'top-left'} />
      </Canvas>
    </>
  )
}
