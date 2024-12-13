import { getColorsToUse } from "#lib/colors.ts"

const MiddleCircles = ({
  colors = getColorsToUse(),
  rotation = [0, 90, 180, 270].sort(() => Math.random() - 0.5)[0],
}) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transform: `rotate(${rotation}deg)`,
  }

  const linearGradient = {
    backgroundImage: `linear-gradient(to right, var(${colors[1]}), 50% , var(${colors[1]}), 50%, var(${colors[2]}) , var(${colors[2]}))`,
  }

  return (
    <div className="flex items-center justify-center" style={styleObject}>
      <div style={linearGradient} className="h-1/2 w-1/2 rounded-full" />
    </div>
  )
}

export default MiddleCircles
