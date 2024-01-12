import { Html } from '@react-three/drei'

const res = await fetch('/spanish.json')
const data = await res.json()

export function Card({ ...props }) {
  return (
    <Html {...props} transform>
      {/* <div className='card'>{data.Conversational.Spanish[0]}</div> */}
      <div className='card'>Fly. Fly</div>
    </Html>
  )
}
