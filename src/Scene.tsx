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
      <PerspectiveCamera makeDefault position={[0, 0, 10]} near={0.01} far={1000} />
      <OrbitControls makeDefault />
      {performance && <Perf position='top-left' />}
      <Bird />
      <SkyStructures />
      <LightField />
    </>
  )
}

export { Scene }
