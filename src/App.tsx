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

import { HideMouse, Keyboard } from './controls'
import { levelLayer, useStore } from './store'
import { Intro } from './ui'
import { useToggle } from './hooks/useToggle'
import { LightField } from './components/LightField'
import { Bird } from './components/Bird'
import { Bubbles } from './components/Bubbles'
import { Perf } from 'r3f-perf'

const layers = new Layers()
layers.enable(levelLayer)

export function App(): JSX.Element {
  const [light, setLight] = useState<DirectionalLight | null>(null)
  const [actions, dpr, shadows] = useStore((s) => [s.actions, s.dpr, s.shadows])

  const ToggledOrbitControls = useToggle(OrbitControls, 'ready')

  return (
    <>
      <Intro>
        <Canvas
          key={`${dpr}${shadows}`}
          dpr={[1, dpr]}
          shadows={shadows}
          camera={{ position: [0, 5, 50], fov: 50, far: 70000 }}
        >
          <fog attach='fog' color='#800080' near={5000} far={120000} />
          <ambientLight layers={layers} intensity={0.1} />
          <directionalLight
            ref={setLight}
            layers={layers}
            position={[0, 50, 150]}
            intensity={1}
            shadow-bias={-0.001}
            shadow-mapSize={[4096, 4096]}
            shadow-camera-left={-150}
            shadow-camera-right={150}
            shadow-camera-top={150}
            shadow-camera-bottom={-150}
            castShadow
          />

          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color='red' />
          </mesh>

          <LightField />
          <ToggledOrbitControls makeDefault />
          <Bird />
          <Bubbles />
        </Canvas>

        <HideMouse />
        <Keyboard />
      </Intro>
    </>
  )
}
