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
    <div className="grid grid-cols-2 grid-rows-2" style={styleObject}>
      <div style={{ backgroundColor: `var(${colors[0]})` }} />
      <div style={{ backgroundColor: `var(${colors[1]})` }} />
      <div style={{ backgroundColor: `var(${colors[2]})` }} />
      <div style={{ backgroundColor: `var(${colors[3]})` }} />
    </div>
  )
}

export default Square
