import { colorNames } from "#lib/colors.ts"

type Props = {
  colors?: string[]
}
const MiddleCircles = ({ colors }: Props) => {
  const colorsToUse = colors || colorNames.toSorted(() => Math.random() - 0.5)

  const styleObject = {
    backgroundColor: `var(${colorsToUse[0]})`,
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transform: `rotate(${[0, 90, 180, 270].sort(() => Math.random() - 0.5)[0]}deg)`,
  }

  const linearGradient = {
    backgroundImage: `linear-gradient(to right, var(${colorsToUse[1]}), 50% , var(${colorsToUse[1]}), 50%, var(${colorsToUse[2]}) , var(${colorsToUse[2]}))`,
  }

  return (
    <div className="flex items-center justify-center" style={styleObject}>
      <div style={linearGradient} className="h-1/2 w-1/2 rounded-full" />
    </div>
  )
}

export default MiddleCircles
