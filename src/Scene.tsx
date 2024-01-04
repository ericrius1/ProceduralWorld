import {
  OrbitControls,
  PerspectiveCamera,
  PointerLockControls,
  Sky,
  useGLTF,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import * as THREE from 'three'
import { Bird } from './components/Bird'
import { LightField } from './components/LightField'
import { SkyStructures } from './components/SkyStructures'
import { Bubbles } from './components/Bubbles'

function Scene() {
  const { performance } = useControls('Monitoring', {
    performance: false,
  })

  return (
    <>
      <color attach='background' args={['#800080']} />
      {/* <PointerLockControls makeDefault /> */}
      <fog attach='fog' color='#800080' near={100} far={10000} />
      <PerspectiveCamera makeDefault position={[0, 0, 50]} near={0.01} far={10000} />
      <OrbitControls makeDefault enableDamping={false} />
      {performance && <Perf position='top-left' />}
      <Bird />
      {/* <SkyStructures /> */}
      <Bubbles />
      <LightField />
      <mesh scale={1} visible={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color='red' />
      </mesh>
    </>
  )
}

export { Scene }
