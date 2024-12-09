type Props = {
  rotation: number
}

export default function Triangle({ rotation }: Props) {
  const styleObject = {
    transform: `rotate(${rotation}deg)`,
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="triangle"
      viewBox="0 0 100 100"
      width="var(--tile-width)"
      height="var(--tile-height)"
    >
      <polygon fill="var(--color-1)" points="0,0 100,0 50,50" />
      <polygon fill="var(--color-2)" points="0,0 0,100 50,50" />
      <polygon fill="var(--color-3)" points="0,100 100,100 50,50" />
      <polygon fill="var(--color-4)" points="100,100 100,0 50,50" />
    </svg>
  )
}
