import { getColorsToUse } from "#lib/colors.ts"

type Props = {
  colors?: string[]
  rotation?: number
}

const Triangle = ({
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
      <polygon fill={`var(${colors[0]})`} points="0,0 2,0 1,1" />
      <polygon fill={`var(${colors[1]})`} points="0,0 0,2 1,1" />
      <polygon fill={`var(${colors[2]})`} points="0,2 2,2 1,1" />
      <polygon fill={`var(${colors[3]})`} points="2,2 2,0 1,1" />
    </svg>
  )
}

export default Triangle
