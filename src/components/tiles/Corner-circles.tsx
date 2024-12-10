import { colorNames } from "#lib/colors.ts"

type Props = {
  colors?: string[]
}

const CornerCircles = ({ colors }: Props) => {
  const colorsToUse = colors || colorNames.toSorted(() => Math.random() - 0.5)

  const styleObject = {
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transition: "transform 0.5s linear",
    transform: `rotate(${[0, 90, 180, 270].sort(() => Math.random() - 0.5)[0]}deg)`,
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="triangle"
      viewBox="0 0 2 2"
      style={styleObject}
    >
      {" "}
      <circle
        style={{ transition: "fill 0.5s linear" }}
        cx="0"
        cy="0"
        r="50%"
        fill={`var(${colorsToUse[0]})`}
      />
      <circle
        style={{ transition: "fill 0.5s linear" }}
        cx="2"
        cy="2"
        r="50%"
        fill={`var(${colorsToUse[1]})`}
      />
    </svg>
  )
}

export default CornerCircles
