import { createRoot } from 'react-dom/client'
import { useGLTF, useTexture } from '@react-three/drei'
import '../styles.css'
import { Level1App } from './level1App'

createRoot(document.getElementById('root')!).render(<Level1App />)
