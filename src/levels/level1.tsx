import { createRoot } from 'react-dom/client'
import { useGLTF, useTexture } from '@react-three/drei'
import '../styles.css'
import { Level1App } from './level1App'
useTexture.preload('/textures/heightmap_1024.png')
useGLTF.preload('/models/track-draco.glb')
useGLTF.preload('/models/chassis-draco.glb')
useGLTF.preload('/models/wheel-draco.glb')

createRoot(document.getElementById('root')!).render(<Level1App />)
