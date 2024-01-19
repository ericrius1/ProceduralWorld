import { useMemo, useState } from 'react'
import { Layers } from 'three'
import { Canvas } from '@react-three/fiber'
import {
  Sky,
  Environment,
  PerspectiveCamera,
  OrbitControls,
  Stats,
  KeyboardControls,
} from '@react-three/drei'

import type { DirectionalLight } from 'three'
import { useKeyboardControls } from '@react-three/drei'

import { HideMouse } from './controls'
import { LightField } from './components/LightField'
import { Bird } from './components/Bird'
import { Bubbles } from './components/Bubbles'
import { Perf } from 'r3f-perf'
import { Card } from './components/Card'

enum Controls {
  boost = 'boost',
  toggleCamera = 'toggleCamera',
  right = 'right',
  left = 'left',
  up = 'up',
  down = 'down',
  rollRight = 'rollRight',
  rollLeft = 'rollLeft',
}

type KeyboardControlsEntry<T extends string = string> = {
  /** Name of the action */
  name: T
  /** The keys that define it, you can use either event.key, or event.code */
  keys: string[]
  /** If the event receives the keyup event, true by default */
  up?: boolean
}

export function App(): JSX.Element {
  const [light, setLight] = useState<DirectionalLight | null>(null)

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.boost, keys: ['KeyW'] },
      { name: Controls.rollLeft, keys: ['KeyQ'] },
      { name: Controls.rollRight, keys: ['KeyE'] },
      { name: Controls.toggleCamera, keys: ['c'] },
    ],
    []
  )

  return (
    <>
      <KeyboardControls map={map}>
        <Canvas dpr={[1, 2]} camera={{ position: [0, 5, 50], fov: 50, far: 70000 }}>
          <fog attach='fog' color='#800080' near={5000} far={120000} />

          <LightField />
          <OrbitControls makeDefault />
          <Bird />
          <Bubbles />
          <Perf openByDefault trackGPU={true} position={'top-left'} />
        </Canvas>

        <HideMouse />
      </KeyboardControls>
    </>
  )
}

export { Controls }
