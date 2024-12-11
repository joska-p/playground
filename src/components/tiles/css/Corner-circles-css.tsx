import { getColorsToUse } from "#lib/colors.ts"

type Props = {
  colors?: string[]
}
const CornerCircles = ({ colors = getColorsToUse() }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transform: `rotate(${[0, 90, 180, 270].sort(() => Math.random() - 0.5)[0]}deg)`,
  }

  return (
    <div className="relative" style={styleObject}>
      <div
        style={{ backgroundColor: `var(${colors[1]})` }}
        className="absolute left-0 top-0 h-1/2 w-1/2 rounded-br-full"
      />
      <div
        style={{ backgroundColor: `var(${colors[2]})` }}
        className="absolute bottom-0 right-0 h-1/2 w-1/2 rounded-tl-full"
      />
    </div>
  )
}

export default CornerCircles
