import { OrbitControls, Sky, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import * as THREE from 'three'
import { Frame } from './components/Frame'
import { DeepArt } from './components/DeepArt'
import { Plane } from './components/Plane'

function Scene() {
  const { performance } = useControls('Monitoring', {
    performance: false,
  })

  const { animate } = useControls('Cube', {
    animate: true,
  })

  const cubeRef = useRef<Mesh<BoxGeometry, MeshBasicMaterial>>(null)

  useFrame((_, delta) => {

  })

  return (
    <>
      <OrbitControls makeDefault />
      {performance && <Perf position='top-left' />}


      <directionalLight
        position={[-2, 2, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
      />
      <ambientLight intensity={0.2} />


      <Frame id="0" name="alchemist" >
        <Sky />
        <Model position={[0, -2, 0]} />
      </Frame >
      <Model clip position={[0, -2, 0]} />
      <Plane />

      {/* <Frame id="02" name="dinasour" >
        <DeepArt imagePath="/image.jpg" depthMapPath="/depth.jpg" />
      </Frame> */}
    </>
  )
}

const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const yPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1)

function Model({ clip = false, ...props }) {
  const { nodes, materials } = useGLTF('/mccree.glb')
  return (
    <mesh geometry={(nodes.base as THREE.Mesh).geometry} {...props} dispose={null}>
      <meshBasicMaterial map={(materials.PaletteMaterial001 as THREE.MeshBasicMaterial).map} side={THREE.DoubleSide} clippingPlanes={clip ? [zPlane, yPlane] : null} />
    </mesh>
  )
}


export { Scene }
