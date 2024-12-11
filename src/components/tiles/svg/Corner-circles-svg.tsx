import { getColorsToUse } from "#lib/colors.ts"

type Props = {
  colors?: string[]
  rotation?: number
}

const CornerCircles = ({
  colors = getColorsToUse(),
  rotation = [0, 90, 180, 270].sort(() => Math.random() - 0.5)[0],
}: Props) => {
  const styleObject = {
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transform: `rotate(${rotation}deg)`,
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="triangle"
      viewBox="0 0 2 2"
      style={styleObject}
    >
      <circle cx="0" cy="0" r="50%" fill={`var(${colors[0]})`} />
      <circle cx="2" cy="2" r="50%" fill={`var(${colors[1]})`} />
    </svg>
  )
}

export default CornerCircles
