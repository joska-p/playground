type Props = {
  rotation: number
}

export default function Square({ rotation }: Props) {
  const styleObject = {
    transform: `rotate(${rotation}deg)`,
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="square"
      viewBox="0 0 100 100"
      width="var(--tile-width)"
      height="var(--tile-height)"
      style={styleObject}
    >
      <rect fill="var(--color-1)" x="0" y="0" width="50" height="50" />
      <rect fill="var(--color-2)" x="50" y="0" width="50" height="50" />
      <rect fill="var(--color-3)" x="0" y="50" width="50" height="50" />
      <rect fill="var(--color-4)" x="50" y="50" width="50" height="50" />
    </svg>
  )
}
