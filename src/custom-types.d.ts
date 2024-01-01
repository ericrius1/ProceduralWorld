import { ReactThreeFiber } from '@react-three/fiber'
import * as THREE from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      roundedPlaneGeometry: ReactThreeFiber.Node<
        THREE.BufferGeometry,
        [number?, number?, number?, number?]
      >
    }
  }
}

export type MotionGroup = THREE.Group & GroupProps
