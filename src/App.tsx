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

import { HideMouse } from './controls'
import { LightField } from './components/LightField'
import { Bird } from './components/Bird'
import { Bubbles } from './components/Bubbles'
import { Perf } from 'r3f-perf'
import { Card } from './components/Card'
export function App(): JSX.Element {
  const [light, setLight] = useState<DirectionalLight | null>(null)

  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 5, 50], fov: 50, far: 70000 }}>
        <fog attach='fog' color='#800080' near={5000} far={120000} />

        <LightField />
        <OrbitControls makeDefault />
        <Bird />
        <Bubbles />
        <Card position={[0, 5, -50]} occlude />
        <Perf openByDefault trackGPU={true} position={'top-left'} />
      </Canvas>

      <HideMouse />
    </>
  )
}
