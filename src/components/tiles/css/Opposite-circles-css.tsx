import { getColorsToUse } from "#lib/colors.ts"

type Props = {
  colors?: string[]
}
const OppositeCircles = ({ colors = getColorsToUse() }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transform: `rotate(${[0, 90, 180, 270].sort(() => Math.random() - 0.5)[0]}deg)`,
  }

  return (
    <div className="relative overflow-hidden" style={styleObject}>
      <div
        style={{ backgroundColor: `var(${colors[1]})` }}
        className="absolute right-1/2 h-full w-full rounded-full"
      />
      <div
        style={{ backgroundColor: `var(${colors[2]})` }}
        className="absolute left-1/2 h-full w-full rounded-full"
      />
    </div>
  )
}

export default OppositeCircles
