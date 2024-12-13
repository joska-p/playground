import { getColorsToUse } from "#lib/colors.ts"

const Square = ({
  colors = getColorsToUse(),
  rotation = [0, 90, 180, 270].sort(() => Math.random() - 0.5)[0],
}) => {
  const styleObject = {
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transform: `rotate(${rotation}deg)`,
  }

  return (
    <div className="grid grid-cols-2 grid-rows-2" style={styleObject}>
      <div style={{ backgroundColor: `var(${colors[0]})` }} />
      <div style={{ backgroundColor: `var(${colors[1]})` }} />
      <div style={{ backgroundColor: `var(${colors[2]})` }} />
      <div style={{ backgroundColor: `var(${colors[3]})` }} />
    </div>
  )
}

export default Square
