import { createRoot } from 'react-dom/client'
import { useGLTF, useTexture } from '@react-three/drei'
import './styles.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(<App />)
