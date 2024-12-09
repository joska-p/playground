type Props = {
  width: number
  height: number
  color1: string
  color2: string
  color3: string
  color4: string
}

export default function Triangle({ width, height, color1, color2, color3, color4 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="triangle"
      viewBox="0 0 100 100"
      width={width}
      height={height}
    >
      <polygon fill={color1} points="0,0 100,0 50,50" />
      <polygon fill={color2} points="0,0 0,100 50,50" />
      <polygon fill={color3} points="0,100 100,100 50,50" />
      <polygon fill={color4} points="100,100 100,0 50,50" />
    </svg>
  )
}
