import { OrbitControls, Sky, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import * as THREE from 'three'
import { Bird } from './components/Bird'
import { LightField } from './components/LightField'

function Scene() {
  const { performance } = useControls('Monitoring', {
    performance: false,
  })

  return (
    <>
      <OrbitControls makeDefault />
      {performance && <Perf position='top-left' />}
      <Bird />
      <LightField />
      <mesh>
        <meshBasicMaterial color='purple' />
        <boxGeometry />
      </mesh>
    </>
  )
}

export { Scene }
