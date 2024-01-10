import { Html } from '@react-three/drei'

const res = await fetch('/spanish.json')
const data = await res.json()

export function Card({ ...props }) {
  return (
    <Html {...props}>
      <div className='card'>{data.Conversational.Spanish[0]}</div>
    </Html>
  )
}
