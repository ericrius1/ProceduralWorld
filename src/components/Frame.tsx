import { geometry } from 'maath'
import { extend, useFrame } from '@react-three/fiber'
import { MeshPortalMaterial, Text } from '@react-three/drei'
import React, { useRef } from 'react'
import { motion } from 'framer-motion-3d'
import { Group } from 'three'
import { MotionGroup } from '../custom-types'

//
extend(geometry)
const GOLDENRATIO = 1.61803398875
type frameProps = {
  id: string
  name: string
  width?: number
  height?: number
  children: React.ReactNode
}

export function Frame({
  id,
  name,
  width = 3,
  height = GOLDENRATIO,
  children,
  ...props
}: frameProps) {
  const group = useRef<MotionGroup>(null)
  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.5
  })

  return (
    <motion.group animate={{ y: 2 }} {...props} ref={group}>
      <Text
        color='black'
        fontSize={0.25}
        letterSpacing={-0.025}
        anchorY='top'
        anchorX='left'
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
      >
        {name}
      </Text>
      <Text color='black' fontSize={0.1} anchorX='right' position={[0.4, -0.659, 0.01]}>
        /{id}
      </Text>

      <mesh name={id} castShadow>
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial>{children}</MeshPortalMaterial>
      </mesh>
      <mesh name={id} position={[0, 0, -0.001]}>
        <roundedPlaneGeometry />
        <meshBasicMaterial color='black' />
      </mesh>
    </motion.group>
  )
}
