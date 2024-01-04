import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import React, { useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { ACESFilmicToneMapping, sRGBEncoding } from 'three'
import { Scene } from './Scene'
import './styles/main.css'
import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei'

enum Controls {
  followPointerModifier = 'followPointerModifier',
}

function Main() {
  const controlsMap = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [{ name: Controls.followPointerModifier, keys: ['Shift'] }],
    []
  )
  return (
    <KeyboardControls map={controlsMap}>
      <div className='main'>
        <Leva
          collapsed={false}
          oneLineLabels={false}
          flat={true}
          theme={{
            sizes: {
              titleBarHeight: '28px',
            },
            fontSizes: {
              root: '10px',
            },
          }}
        />
        <Canvas
          dpr={[1, 2]}
          gl={{
            localClippingEnabled: true,
            antialias: true,
            toneMapping: ACESFilmicToneMapping,
          }}
          shadows
        >
          <Scene />
        </Canvas>
      </div>
    </KeyboardControls>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
