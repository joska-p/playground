type Props = {
  width: number
  height: number
  color1: string
  color2: string
  color3: string
  color4: string
}

export default function Square({ width, height, color1, color2, color3, color4 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="square"
      viewBox="0 0 100 100"
      width={width}
      height={height}
    >
      <rect fill={color1} x="0" y="0" width="50" height="50" />
      <rect fill={color2} x="50" y="0" width="50" height="50" />
      <rect fill={color3} x="0" y="50" width="50" height="50" />
      <rect fill={color4} x="50" y="50" width="50" height="50" />
    </svg>
  )
}
