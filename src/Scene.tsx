import { OrbitControls, Sky, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import * as THREE from 'three'

function Scene() {
  const { performance } = useControls('Monitoring', {
    performance: false,
  })

  return (
    <>
      <OrbitControls makeDefault />
      {performance && <Perf position='top-left' />}

      <mesh>
        <meshBasicMaterial color='purple' />
        <boxGeometry />
      </mesh>
    </>
  )
}

export { Scene }
