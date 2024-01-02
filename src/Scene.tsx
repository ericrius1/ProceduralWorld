import { OrbitControls, PerspectiveCamera, Sky, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import * as THREE from 'three'
import { Bird } from './components/Bird'
import { LightField } from './components/LightField'
import { SkyStructures } from './components/SkyStructures'

function Scene() {
  const { performance } = useControls('Monitoring', {
    performance: false,
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 5]} near={0.01} far={10000} />
      {/* <OrbitControls makeDefault /> */}
      {performance && <Perf position='top-left' />}
      <Bird />
      {/* <SkyStructures /> */}
      <LightField />
      <mesh scale={1}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color='red' />
      </mesh>
    </>
  )
}

export { Scene }
