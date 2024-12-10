import { colorNames } from "#lib/colors.ts"
import { getRandom } from "#lib/utils.ts"

type Props = {
  colors?: string[]
  random?: boolean
}

const OppositeCircles = ({ colors, random = true }: Props) => {
  const colorsToUse = random ? colorNames.toSorted(() => Math.random() - 0.5) : (colors as string[])

  const styleObject = {
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transition: "transform 0.5s ease-in-out",
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
        style={{ transition: "fill 0.5s ease-in-out" }}
        cx="1"
        cy="2"
        r="50%"
        fill={`var(${getRandom(colorsToUse)})`}
      />
      <circle
        style={{ transition: "fill 0.5s ease-in-out" }}
        cx="1"
        cy="0"
        r="50%"
        fill={`var(${getRandom(colorsToUse)})`}
      />
    </svg>
  )
}

export default OppositeCircles
