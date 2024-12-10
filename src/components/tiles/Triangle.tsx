import { colorNames } from "#lib/colors.ts"

type Props = {
  colors?: string[]
}

const Triangle = ({ colors }: Props) => {
  const colorsToUse = colors || colorNames.toSorted(() => Math.random() - 0.5)

  const styleObject = {
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transform: `rotate(${[0, 90, 180, 270].sort(() => Math.random() - 0.5)[0]}deg)`,
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="triangle"
      viewBox="0 0 2 2"
      style={styleObject}
    >
      <polygon fill={`var(${colorsToUse[0]})`} points="0,0 2,0 1,1" />
      <polygon fill={`var(${colorsToUse[1]})`} points="0,0 0,2 1,1" />
      <polygon fill={`var(${colorsToUse[2]})`} points="0,2 2,2 1,1" />
      <polygon fill={`var(${colorsToUse[3]})`} points="2,2 2,0 1,1" />
    </svg>
  )
}

export default Triangle
