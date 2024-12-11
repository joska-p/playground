import { getColorsToUse } from "#lib/colors.ts"

type Props = {
  colors?: string[]
}
const Square = ({ colors = getColorsToUse() }: Props) => {
  const styleObject = {
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transform: `rotate(${[0, 90, 180, 270].sort(() => Math.random() - 0.5)[0]}deg)`,
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="square"
      viewBox="0 0 2 2"
      style={styleObject}
    >
      <rect fill={`var(${colors[0]})`} x="0" y="0" width="1" height="1" />
      <rect fill={`var(${colors[1]})`} x="1" y="0" width="1" height="1" />
      <rect fill={`var(${colors[2]})`} x="0" y="1" width="1" height="1" />
      <rect fill={`var(${colors[3]})`} x="1" y="1" width="1" height="1" />
    </svg>
  )
}

export default Square
