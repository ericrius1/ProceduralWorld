import { Html } from '@react-three/drei'
export function Card({ ...props }) {
  return (
    <Html {...props} transform>
      <div className='card'>Fly. Fly</div>
    </Html>
  )
}
